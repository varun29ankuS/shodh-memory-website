import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client") || "shodh-demo";
  const primaryColor = searchParams.get("color") || "#10b981"; // emerald-500
  const position = searchParams.get("position") || "right"; // right or left

  const widgetJS = `
(function() {
  const CLIENT_ID = "${clientId}";
  const API_URL = "https://www.shodh-memory.com/api/chat";
  const PRIMARY_COLOR = "${primaryColor}";
  const POSITION = "${position}";

  // Styles
  const styles = \`
    #shodh-chat-btn {
      position: fixed;
      bottom: 20px;
      \${POSITION}: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: \${PRIMARY_COLOR};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #shodh-chat-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 25px rgba(0,0,0,0.3);
    }
    #shodh-chat-btn svg {
      width: 26px;
      height: 26px;
      fill: white;
    }

    #shodh-chat-box {
      position: fixed;
      bottom: 90px;
      \${POSITION}: 20px;
      width: 380px;
      height: 520px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 50px rgba(0,0,0,0.2);
      z-index: 99999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    }
    #shodh-chat-box.open {
      display: flex;
      animation: shodh-slide-up 0.25s ease-out;
    }
    @keyframes shodh-slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #shodh-chat-header {
      background: \${PRIMARY_COLOR};
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #shodh-chat-header-title {
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #shodh-chat-header-title::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #4ade80;
      border-radius: 50%;
      animation: shodh-pulse 2s infinite;
    }
    @keyframes shodh-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    #shodh-close-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #shodh-close-btn:hover {
      background: rgba(255,255,255,0.3);
    }

    #shodh-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f9fafb;
    }

    .shodh-msg {
      margin-bottom: 12px;
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .shodh-msg.bot {
      background: white;
      border: 1px solid #e5e7eb;
      margin-right: auto;
      border-bottom-left-radius: 4px;
    }
    .shodh-msg.user {
      background: \${PRIMARY_COLOR};
      color: white;
      margin-left: auto;
      border-bottom-right-radius: 4px;
    }
    .shodh-msg.typing {
      background: white;
      border: 1px solid #e5e7eb;
      color: #9ca3af;
      display: flex;
      gap: 4px;
      padding: 16px 20px;
    }
    .shodh-typing-dot {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: shodh-bounce 1.4s infinite ease-in-out both;
    }
    .shodh-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .shodh-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes shodh-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    #shodh-chat-input-area {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 10px;
      background: white;
    }
    #shodh-chat-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    #shodh-chat-input:focus {
      border-color: \${PRIMARY_COLOR};
      box-shadow: 0 0 0 3px \${PRIMARY_COLOR}20;
    }
    #shodh-chat-input::placeholder {
      color: #9ca3af;
    }
    #shodh-send-btn {
      background: \${PRIMARY_COLOR};
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s, transform 0.2s;
    }
    #shodh-send-btn:hover {
      transform: scale(1.05);
    }
    #shodh-send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    #shodh-send-btn svg {
      width: 20px;
      height: 20px;
      fill: white;
    }

    #shodh-powered-by {
      text-align: center;
      padding: 8px;
      font-size: 11px;
      color: #9ca3af;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    #shodh-powered-by a {
      color: #6b7280;
      text-decoration: none;
    }
    #shodh-powered-by a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      #shodh-chat-box {
        width: calc(100vw - 20px);
        height: calc(100vh - 100px);
        \${POSITION}: 10px;
        bottom: 80px;
        border-radius: 12px;
      }
    }
  \`;

  // Inject styles
  const styleEl = document.createElement('style');
  styleEl.id = 'shodh-widget-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Create widget container
  const container = document.createElement('div');
  container.id = 'shodh-chat-widget';
  container.innerHTML = \`
    <button id="shodh-chat-btn" aria-label="Open chat">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
    </button>
    <div id="shodh-chat-box">
      <div id="shodh-chat-header">
        <div id="shodh-chat-header-title">Chat Support</div>
        <button id="shodh-close-btn">×</button>
      </div>
      <div id="shodh-chat-messages"></div>
      <div id="shodh-chat-input-area">
        <input type="text" id="shodh-chat-input" placeholder="Type a message..." autocomplete="off" />
        <button id="shodh-send-btn" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div id="shodh-powered-by">
        Powered by <a href="https://www.shodh-memory.com" target="_blank">shodh-memory</a>
      </div>
    </div>
  \`;
  document.body.appendChild(container);

  // State
  let conversationHistory = [];
  const chatBox = document.getElementById('shodh-chat-box');
  const messagesDiv = document.getElementById('shodh-chat-messages');
  const input = document.getElementById('shodh-chat-input');
  const sendBtn = document.getElementById('shodh-send-btn');

  // Toggle chat
  document.getElementById('shodh-chat-btn').addEventListener('click', () => {
    chatBox.classList.toggle('open');
    if (chatBox.classList.contains('open')) {
      input.focus();
      if (messagesDiv.children.length === 0) {
        addMessage('bot', 'Hi! How can I help you today?');
      }
    }
  });

  document.getElementById('shodh-close-btn').addEventListener('click', () => {
    chatBox.classList.remove('open');
  });

  function addMessage(type, text) {
    const msg = document.createElement('div');
    msg.className = 'shodh-msg ' + type;
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return msg;
  }

  function addTypingIndicator() {
    const msg = document.createElement('div');
    msg.className = 'shodh-msg typing';
    msg.id = 'shodh-typing';
    msg.innerHTML = '<div class="shodh-typing-dot"></div><div class="shodh-typing-dot"></div><div class="shodh-typing-dot"></div>';
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return msg;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('shodh-typing');
    if (typing) typing.remove();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    sendBtn.disabled = true;

    addMessage('user', text);
    conversationHistory.push({ role: 'user', content: text });

    addTypingIndicator();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          clientId: CLIENT_ID,
          history: conversationHistory.slice(-6)
        })
      });

      removeTypingIndicator();

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      addMessage('bot', data.response);
      conversationHistory.push({ role: 'assistant', content: data.response });

    } catch (err) {
      removeTypingIndicator();
      addMessage('bot', 'Sorry, something went wrong. Please try again.');
    }

    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
`;

  return new NextResponse(widgetJS, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
