import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const SERVER = 'https://server.vedantd.com';
const TOKEN_KEY = 'vishnu_token';

function api(token, method, path, body) {
  return fetch(`${SERVER}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  });
}

// ── Password gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await fetch(`${SERVER}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      }).then((r) => r.json());

      if (!data.token) throw new Error(data.error || 'Failed');
      localStorage.setItem(TOKEN_KEY, data.token);
      onUnlock(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.gate}>
      <h2 style={styles.gateTitle}>Vishnu</h2>
      <p style={styles.gateSubtitle}>Your personal AI companion</p>
      <form onSubmit={handleSubmit} style={styles.gateForm}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoFocus
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Verifying...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}

PasswordGate.propTypes = { onUnlock: PropTypes.func.isRequired };

// ── Chat tab ──────────────────────────────────────────────────────────────────

function ChatTab({ token }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! What's on your mind?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const data = await api(token, 'POST', '/api/chat', {
        message: msg,
        conversationId,
      });
      setConversationId(data.conversationId);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function newConversation() {
    setConversationId(null);
    setMessages([{ role: 'assistant', content: "Fresh start! What's on your mind?" }]);
  }

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <span style={styles.chatHeaderTitle}>Chat</span>
        <button onClick={newConversation} style={styles.newBtn}>New</button>
      </div>
      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} style={m.role === 'user' ? styles.userMsg : styles.botMsg}>
            <span style={m.role === 'user' ? styles.userLabel : styles.botLabel}>
              {m.role === 'user' ? 'You' : 'Vishnu'}
            </span>
            <p style={styles.msgText}>{m.content}</p>
          </div>
        ))}
        {loading && (
          <div style={styles.botMsg}>
            <span style={styles.botLabel}>Vishnu</span>
            <p style={{ ...styles.msgText, opacity: 0.5 }}>thinking...</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={styles.inputRow}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Message Vishnu... (Enter to send)"
          style={styles.textarea}
          rows={2}
        />
        <button onClick={send} disabled={loading} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

ChatTab.propTypes = { token: PropTypes.string.isRequired };

// ── Goals tab ─────────────────────────────────────────────────────────────────

function GoalsTab({ token }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(token, 'GET', '/api/goals?status=active')
      .then((d) => setGoals(d.goals || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const byCategory = goals.reduce((acc, g) => {
    if (!acc[g.category]) acc[g.category] = [];
    acc[g.category].push(g);
    return acc;
  }, {});

  if (loading) return <p style={styles.dimText}>Loading...</p>;
  if (!goals.length)
    return <p style={styles.dimText}>No active goals yet. Tell Vishnu about something you want to achieve.</p>;

  return (
    <div style={styles.listContainer}>
      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} style={styles.categoryBlock}>
          <h4 style={styles.categoryTitle}>{cat.toUpperCase()}</h4>
          {items.map((g) => (
            <div key={g.id} style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <div>
                <span>{g.title}</span>
                {g.target_date && <span style={styles.dimText}> — by {g.target_date}</span>}
                {g.notes && <p style={{ ...styles.dimText, marginTop: 2 }}>{g.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

GoalsTab.propTypes = { token: PropTypes.string.isRequired };

// ── Reminders tab ─────────────────────────────────────────────────────────────

function RemindersTab({ token }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(token, 'GET', '/api/reminders')
      .then((d) => setReminders(d.reminders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p style={styles.dimText}>Loading...</p>;
  if (!reminders.length)
    return <p style={styles.dimText}>No active reminders. Ask Vishnu to set one.</p>;

  return (
    <div style={styles.listContainer}>
      {reminders.map((r) => (
        <div key={r.id} style={styles.listItem}>
          <span style={styles.bullet}>•</span>
          <div>
            <span>{r.title}</span>
            <span style={styles.tag}>
              {r.repeat}{r.time ? ` at ${r.time}` : ''}
            </span>
            {r.note && <p style={{ ...styles.dimText, marginTop: 2 }}>{r.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

RemindersTab.propTypes = { token: PropTypes.string.isRequired };

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Vishnu() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [activeTab, setActiveTab] = useState('chat');

  if (!token) return <PasswordGate onUnlock={setToken} />;

  const tabs = ['chat', 'goals', 'reminders'];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Vishnu</h2>
        <button
          onClick={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); }}
          style={styles.logoutBtn}
        >
          Lock
        </button>
      </div>

      <div style={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={activeTab === t ? styles.tabActive : styles.tabInactive}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'chat' && <ChatTab token={token} />}
        {activeTab === 'goals' && <GoalsTab token={token} />}
        {activeTab === 'reminders' && <RemindersTab token={token} />}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    height: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid #222',
    flexShrink: 0,
  },
  title: { color: '#00ffcc', margin: 0, fontSize: '18px', letterSpacing: '2px' },
  logoutBtn: {
    background: 'none',
    border: '1px solid #333',
    color: '#555',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #222',
    flexShrink: 0,
  },
  tabActive: {
    flex: 1,
    padding: '10px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid #00ffcc',
    color: '#00ffcc',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'monospace',
  },
  tabInactive: {
    flex: 1,
    padding: '10px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#555',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'monospace',
  },
  tabContent: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatContainer: { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    borderBottom: '1px solid #1a1a1a',
  },
  chatHeaderTitle: { color: '#444', fontSize: '12px' },
  newBtn: {
    background: 'none',
    border: '1px solid #222',
    color: '#555',
    padding: '3px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  messages: { flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' },
  userMsg: { alignSelf: 'flex-end', maxWidth: '80%' },
  botMsg: { alignSelf: 'flex-start', maxWidth: '85%' },
  userLabel: { fontSize: '10px', color: '#00ffcc', display: 'block', marginBottom: '4px', textAlign: 'right' },
  botLabel: { fontSize: '10px', color: '#555', display: 'block', marginBottom: '4px' },
  msgText: {
    margin: 0,
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.5',
    backgroundColor: '#1a1a1a',
    color: '#ccc',
    whiteSpace: 'pre-wrap',
  },
  inputRow: { display: 'flex', gap: '8px', padding: '12px 24px', borderTop: '1px solid #1a1a1a', flexShrink: 0 },
  textarea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    border: '1px solid #222',
    borderRadius: '6px',
    color: '#ccc',
    padding: '8px 12px',
    fontSize: '14px',
    fontFamily: 'monospace',
    resize: 'none',
    outline: 'none',
  },
  sendBtn: {
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '0 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  listContainer: { padding: '16px' },
  categoryBlock: { marginBottom: '20px' },
  categoryTitle: { color: '#00ffcc', fontSize: '11px', letterSpacing: '2px', margin: '0 0 8px 0' },
  listItem: { display: 'flex', gap: '8px', padding: '8px 0', borderBottom: '1px solid #1a1a1a', color: '#ccc', fontSize: '14px' },
  bullet: { color: '#00ffcc', flexShrink: 0 },
  dimText: { color: '#555', fontSize: '12px', margin: 0 },
  tag: {
    fontSize: '11px',
    backgroundColor: '#1a1a1a',
    color: '#555',
    padding: '1px 6px',
    borderRadius: '3px',
    marginLeft: '8px',
  },
  gate: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
  },
  gateTitle: { color: '#00ffcc', fontSize: '28px', letterSpacing: '4px', margin: '0 0 8px 0' },
  gateSubtitle: { color: '#444', fontSize: '13px', margin: '0 0 32px 0' },
  gateForm: { display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' },
  input: {
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '6px',
    color: '#ccc',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: 'monospace',
    outline: 'none',
  },
  button: {
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  error: { color: '#ff4444', fontSize: '12px', margin: 0 },
};
