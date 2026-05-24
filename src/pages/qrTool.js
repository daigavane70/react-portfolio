import jsQR from 'jsqr';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';

const STEP_SCAN = 1;
const STEP_EDIT = 2;
const STEP_GENERATE = 3;

export default function QRTool() {
  const [step, setStep] = useState(STEP_SCAN);
  const [text, setText] = useState('');
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setScanning(true);
      tick();
    } catch (e) {
      setCameraError('Camera access denied or unavailable. Please allow camera permissions.');
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
        setText(code.data);
        setStep(STEP_EDIT);
        return;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  // clean up on unmount
  useEffect(() => () => stopCamera(), []);

  function handleReset() {
    stopCamera();
    setText('');
    setCameraError('');
    setStep(STEP_SCAN);
  }

  function downloadQR() {
    const canvas = document.getElementById('generated-qr');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-16" style={{ background: 'rgb(20,20,20)', color: 'white' }}>
      <div className="section-header">QR Tool</div>

      {/* Step indicators */}
      <div className="flex justify-center gap-6 mb-12">
        {['Scan', 'Edit', 'Generate'].map((label, i) => {
          const s = i + 1;
          const active = step === s;
          const done = step > s;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: active ? 'aqua' : done ? 'rgb(22,163,74)' : 'rgb(55,65,81)',
                  color: active || done ? 'black' : 'white',
                }}
              >
                {done ? '✓' : s}
              </div>
              <span style={{ color: active ? 'aqua' : done ? 'rgb(74,222,128)' : 'rgb(156,163,175)' }}>{label}</span>
              {i < 2 && <span style={{ color: 'rgb(75,85,99)' }}>—</span>}
            </div>
          );
        })}
      </div>

      <div className="max-w-lg mx-auto">
        {/* ── STEP 1: SCAN ── */}
        {step === STEP_SCAN && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-sm text-center">
              Point your camera at a QR code — it will be detected automatically.
            </p>

            {/* camera preview */}
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                background: 'rgb(30,30,30)',
                border: '2px solid rgb(55,65,81)',
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                style={{ display: scanning ? 'block' : 'none' }}
              />
              {!scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgb(75,85,99)" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              )}
              {/* scan line animation */}
              {scanning && (
                <div
                  className="absolute left-0 right-0 h-0.5"
                  style={{
                    background: 'aqua',
                    boxShadow: '0 0 8px aqua',
                    animation: 'scanLine 2s linear infinite',
                  }}
                />
              )}
              {/* corner brackets */}
              {scanning && (
                <>
                  <div className="absolute top-4 left-4 w-8 h-8" style={{ borderTop: '3px solid aqua', borderLeft: '3px solid aqua', borderRadius: '4px 0 0 0' }} />
                  <div className="absolute top-4 right-4 w-8 h-8" style={{ borderTop: '3px solid aqua', borderRight: '3px solid aqua', borderRadius: '0 4px 0 0' }} />
                  <div className="absolute bottom-4 left-4 w-8 h-8" style={{ borderBottom: '3px solid aqua', borderLeft: '3px solid aqua', borderRadius: '0 0 0 4px' }} />
                  <div className="absolute bottom-4 right-4 w-8 h-8" style={{ borderBottom: '3px solid aqua', borderRight: '3px solid aqua', borderRadius: '0 0 4px 0' }} />
                </>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {cameraError && <p className="text-red-400 text-sm text-center">{cameraError}</p>}

            {!scanning ? (
              <button
                onClick={startCamera}
                className="px-8 py-3 rounded-xl text-black font-bold text-base transition"
                style={{ background: 'aqua' }}
              >
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="px-8 py-3 rounded-xl font-bold text-base transition"
                style={{ background: 'rgb(55,65,81)', color: 'white' }}
              >
                Stop
              </button>
            )}
          </div>
        )}

        {/* ── STEP 2: EDIT ── */}
        {step === STEP_EDIT && (
          <div className="flex flex-col gap-5">
            <p className="text-gray-400 text-sm">QR decoded successfully. Edit the text below.</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              autoFocus
              className="w-full rounded-xl p-4 text-white text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-cyan-400"
              style={{ background: 'rgb(35,35,35)', border: '1px solid rgb(55,65,81)' }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep(STEP_GENERATE)}
                disabled={!text.trim()}
                className="flex-1 py-3 rounded-xl font-bold transition"
                style={{
                  background: text.trim() ? 'aqua' : 'rgb(55,65,81)',
                  color: text.trim() ? 'black' : 'white',
                  cursor: text.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Generate QR
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl font-semibold"
                style={{ background: 'rgb(55,65,81)', color: 'white' }}
              >
                Scan again
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: GENERATE ── */}
        {step === STEP_GENERATE && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-sm text-center">Here is your new QR code.</p>
            <div className="p-5 rounded-2xl" style={{ background: 'white' }}>
              <QRCodeCanvas
                id="generated-qr"
                value={text}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
            <p className="text-xs text-gray-500 text-center break-all max-w-xs">{text}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadQR}
                className="px-6 py-3 rounded-xl font-bold"
                style={{ background: 'rgb(22,163,74)', color: 'white' }}
              >
                Download PNG
              </button>
              <button
                onClick={() => setStep(STEP_EDIT)}
                className="px-6 py-3 rounded-xl font-semibold"
                style={{ background: 'rgb(55,65,81)', color: 'white' }}
              >
                Edit text
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl font-semibold"
                style={{ background: 'rgb(55,65,81)', color: 'white' }}
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
      `}</style>
    </div>
  );
}
