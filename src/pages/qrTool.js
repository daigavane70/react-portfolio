import jsQR from 'jsqr';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';

const STEP_SCAN = 1;
const STEP_EDIT = 2;
const STEP_GENERATE = 3;

const UPI_PARAM_LABELS = {
  pa: { label: 'UPI ID', editable: false },
  pn: { label: 'Payee Name', editable: false },
  am: { label: 'Amount', editable: true, type: 'number' },
  tn: { label: 'Note', editable: true },
  cu: { label: 'Currency', editable: false },
  tr: { label: 'Reference', editable: false },
};

function parseUPIParams(text) {
  const qIdx = text.indexOf('?');
  if (qIdx === -1) return null;
  const entries = [];
  text
    .slice(qIdx + 1)
    .split('&')
    .forEach((pair) => {
      const eqIdx = pair.indexOf('=');
      if (eqIdx === -1) return;
      const key = pair.slice(0, eqIdx);
      const val = decodeURIComponent(pair.slice(eqIdx + 1));
      entries.push([key, val]);
    });
  return entries;
}

function buildUPIUrl(entries) {
  return 'upi://pay?' + entries.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
}

function isUPIUrl(text) {
  return /^upi:\/\/pay\?/i.test(text.trim());
}

export default function QRTool() {
  const [step, setStep] = useState(STEP_SCAN);
  const [text, setText] = useState('');
  const [upiEntries, setUpiEntries] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  function stopCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }

  async function startCamera() {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setScanning(true);
      tick();
    } catch {
      setCameraError('Camera access denied. Please allow camera permissions and try again.');
    }
  }

  function tick() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        stopCamera();
        const decoded = code.data;
        setText(decoded);
        setUpiEntries(isUPIUrl(decoded) ? parseUPIParams(decoded) : null);
        setStep(STEP_EDIT);
        return;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => () => stopCamera(), []);

  function handleReset() {
    stopCamera();
    setText('');
    setUpiEntries(null);
    setCameraError('');
    setStep(STEP_SCAN);
  }

  function updateUpiParam(key, value) {
    setUpiEntries((prev) => prev.map(([k, v]) => (k === key ? [k, value] : [k, v])));
  }

  const finalText = upiEntries ? buildUPIUrl(upiEntries) : text;

  function downloadQR() {
    const canvas = document.getElementById('generated-qr');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'rgb(15,15,15)', color: 'white', paddingTop: '80px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 48px' }}>

        <h1 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: 'aqua', marginBottom: 28, letterSpacing: 1 }}>
          QR Tool
        </h1>

        {/* Step indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          {['Scan', 'Edit', 'Generate'].map((label, i) => {
            const s = i + 1;
            const active = step === s;
            const done = step > s;
            return (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700,
                      background: active ? 'aqua' : done ? 'rgb(22,163,74)' : 'rgb(45,45,45)',
                      color: active || done ? 'black' : 'rgb(120,120,120)',
                      border: active ? '2px solid aqua' : done ? '2px solid rgb(22,163,74)' : '2px solid rgb(55,55,55)',
                    }}
                  >
                    {done ? '✓' : s}
                  </div>
                  <span style={{ fontSize: 11, color: active ? 'aqua' : done ? 'rgb(74,222,128)' : 'rgb(100,100,100)' }}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{ height: 1, width: 32, background: done ? 'rgb(22,163,74)' : 'rgb(45,45,45)', marginBottom: 16 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: SCAN ── */}
        {step === STEP_SCAN && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <p style={{ color: 'rgb(120,120,120)', fontSize: 14, textAlign: 'center', lineHeight: 1.5 }}>
              Point your camera at a QR code — it detects automatically.
            </p>

            {/* Camera viewport */}
            <div
              style={{
                position: 'relative', width: '100%', aspectRatio: '1/1',
                borderRadius: 20, overflow: 'hidden',
                background: 'rgb(25,25,25)', border: '2px solid rgb(45,45,45)',
              }}
            >
              <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover', display: scanning ? 'block' : 'none' }} muted playsInline />
              {!scanning && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgb(60,60,60)" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span style={{ color: 'rgb(80,80,80)', fontSize: 13 }}>Camera preview</span>
                </div>
              )}
              {scanning && (
                <>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'aqua', boxShadow: '0 0 10px aqua', animation: 'scanLine 2s linear infinite' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, width: 32, height: 32, borderTop: '3px solid aqua', borderLeft: '3px solid aqua', borderRadius: '6px 0 0 0' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderTop: '3px solid aqua', borderRight: '3px solid aqua', borderRadius: '0 6px 0 0' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, width: 32, height: 32, borderBottom: '3px solid aqua', borderLeft: '3px solid aqua', borderRadius: '0 0 0 6px' }} />
                  <div style={{ position: 'absolute', bottom: 16, right: 16, width: 32, height: 32, borderBottom: '3px solid aqua', borderRight: '3px solid aqua', borderRadius: '0 0 6px 0' }} />
                </>
              )}
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {cameraError && (
              <p style={{ color: 'rgb(248,113,113)', fontSize: 13, textAlign: 'center' }}>{cameraError}</p>
            )}

            {!scanning ? (
              <button
                onClick={startCamera}
                style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'aqua', color: 'black', fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer' }}
              >
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopCamera}
                style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgb(45,45,45)', color: 'white', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}
              >
                Stop
              </button>
            )}
          </div>
        )}

        {/* ── STEP 2: EDIT ── */}
        {step === STEP_EDIT && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {upiEntries ? (
              <>
                {/* UPI badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(0,255,255,0.1)', color: 'aqua', border: '1px solid rgba(0,255,255,0.25)' }}>
                    UPI Payment
                  </span>
                  <span style={{ color: 'rgb(100,100,100)', fontSize: 12 }}>detected</span>
                </div>

                {/* Amount hero input */}
                {upiEntries.find(([k]) => k === 'am') !== undefined && (
                  <div style={{ borderRadius: 18, padding: '20px 20px', background: 'rgb(22,22,22)', border: '1px solid rgba(0,255,255,0.2)' }}>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgb(100,100,100)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
                      Amount
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 36, fontWeight: 800, color: 'aqua', lineHeight: 1 }}>₹</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        autoFocus
                        value={upiEntries.find(([k]) => k === 'am')?.[1] ?? ''}
                        onChange={(e) => updateUpiParam('am', e.target.value)}
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 40, fontWeight: 800, color: 'white', caretColor: 'aqua', width: '100%' }}
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Other params list */}
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgb(35,35,35)' }}>
                  {upiEntries.map(([key, val], idx) => {
                    if (key === 'am') return null;
                    const meta = UPI_PARAM_LABELS[key];
                    const isEditable = meta?.editable ?? false;
                    return (
                      <div
                        key={key}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '13px 16px', background: 'rgb(20,20,20)',
                          borderBottom: idx < upiEntries.length - 1 ? '1px solid rgb(28,28,28)' : 'none',
                        }}
                      >
                        <span style={{ fontSize: 12, color: 'rgb(100,100,100)', width: 90, flexShrink: 0 }}>
                          {meta?.label ?? key}
                        </span>
                        {isEditable ? (
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => updateUpiParam(key, e.target.value)}
                            style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid rgb(50,50,50)', outline: 'none', fontSize: 14, color: 'white', caretColor: 'aqua', padding: '2px 0', minWidth: 0 }}
                          />
                        ) : (
                          <span style={{ flex: 1, fontSize: 14, color: 'rgb(200,200,200)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Raw URL toggle */}
                <details style={{ fontSize: 12 }}>
                  <summary style={{ cursor: 'pointer', color: 'rgb(80,80,80)', userSelect: 'none' }}>Raw URL</summary>
                  <p style={{ marginTop: 8, padding: 12, borderRadius: 10, background: 'rgb(22,22,22)', color: 'rgb(100,100,100)', wordBreak: 'break-all', lineHeight: 1.6 }}>
                    {buildUPIUrl(upiEntries)}
                  </p>
                </details>
              </>
            ) : (
              <>
                <p style={{ color: 'rgb(120,120,120)', fontSize: 14 }}>QR decoded. Edit the text below.</p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  autoFocus
                  style={{ width: '100%', borderRadius: 14, padding: 16, background: 'rgb(22,22,22)', border: '1px solid rgb(45,45,45)', color: 'white', fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
                />
              </>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                onClick={() => setStep(STEP_GENERATE)}
                disabled={!finalText.trim()}
                style={{
                  flex: 1, padding: '16px', borderRadius: 14, border: 'none', fontWeight: 700, fontSize: 16, cursor: finalText.trim() ? 'pointer' : 'not-allowed',
                  background: finalText.trim() ? 'aqua' : 'rgb(40,40,40)',
                  color: finalText.trim() ? 'black' : 'rgb(80,80,80)',
                }}
              >
                Generate QR
              </button>
              <button
                onClick={handleReset}
                style={{ padding: '16px 20px', borderRadius: 14, border: 'none', background: 'rgb(35,35,35)', color: 'rgb(200,200,200)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
              >
                Rescan
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: GENERATE ── */}
        {step === STEP_GENERATE && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* UPI summary card */}
            {upiEntries && (
              <div style={{ width: '100%', borderRadius: 18, padding: '20px', background: 'rgb(20,20,20)', border: '1px solid rgba(0,255,255,0.15)', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: 'rgb(100,100,100)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Amount</p>
                <p style={{ fontSize: 48, fontWeight: 800, color: 'aqua', lineHeight: 1 }}>
                  ₹{upiEntries.find(([k]) => k === 'am')?.[1] ?? '—'}
                </p>
                {upiEntries.find(([k]) => k === 'pn') && (
                  <p style={{ color: 'rgb(180,180,180)', fontSize: 15, marginTop: 8 }}>
                    to {upiEntries.find(([k]) => k === 'pn')[1]}
                  </p>
                )}
                {upiEntries.find(([k]) => k === 'pa') && (
                  <p style={{ color: 'rgba(0,255,255,0.55)', fontSize: 12, marginTop: 4 }}>
                    {upiEntries.find(([k]) => k === 'pa')[1]}
                  </p>
                )}
              </div>
            )}

            {/* QR code */}
            <div style={{ padding: 20, borderRadius: 20, background: 'white' }}>
              <QRCodeCanvas
                id="generated-qr"
                value={finalText}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>

            {/* Action buttons */}
            <button
              onClick={downloadQR}
              style={{ width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: 'rgb(22,163,74)', color: 'white', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
            >
              Download PNG
            </button>
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              <button
                onClick={() => setStep(STEP_EDIT)}
                style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: 'rgb(35,35,35)', color: 'rgb(200,200,200)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
              >
                Edit
              </button>
              <button
                onClick={handleReset}
                style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: 'rgb(35,35,35)', color: 'rgb(200,200,200)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
              >
                Scan again
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { top: 10%; }
          50%  { top: 85%; }
          100% { top: 10%; }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}
