// ============================================================
// chatbot.js — HuyBot with Google Gemini API
// ============================================================

const SYSTEM_INSTRUCTION = `
You are "huybot", the official AI assistant for Nguyễn Ngọc Huy's portfolio.
Your goal is to answer questions about Huy in a friendly and helpful manner.

### About Huy:
- Full Name: Nguyễn Ngọc Huy
- Alias: NgHuy
- Email: contact@nghuy.vn
- Location: Đà Nẵng, Việt Nam
- Bio: Xin chào, tôi là Nguyễn Ngọc Huy. Đam mê lớn nhất của tôi là đơn giản hóa sự phức tạp. Thay vì cố gắng tạo ra những cỗ máy khổng lồ, tôi tập trung thiết kế các giải pháp phần mềm tinh gọn, ổn định và thực sự giải quyết được bài toán thực tế.
- Tech Stack: HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB, PHP, Python.
- Key Projects: Nghuy.vn (Portfolio cá nhân), Cloudsale.vn (Mô hình vận hành web bán hàng và quản lý server)

### Interaction Guidelines:
- If someone asks how to contact Huy, provide his email: contact@nghuy.vn
- Be polite and helpful. Keep answers short (1-3 sentences max).
- ALWAYS answer in Vietnamese unless asked to speak English.
`;

let chatHistory = [];
let isChatOpen = false;
let isTypingBot = false;
let isOffline = false;

function initChatBot() {
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesDiv = document.getElementById('chatbot-messages');

  closeBtn?.addEventListener('click', closeChatBot);
  form?.addEventListener('submit', handleChatSubmit);

  // Initial greeting already in HTML
}

function openChatBot() {
  const panel = document.getElementById('chatbot-panel');
  const floatingBtn = document.getElementById('floating-chat-btn');
  if (!panel) return;
  isChatOpen = true;
  panel.style.display = 'block';
  panel.style.opacity = '0';
  panel.style.transform = 'translateX(30px) scale(0.97)';
  requestAnimationFrame(() => {
    panel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    panel.style.opacity = '1';
    panel.style.transform = 'translateX(0) scale(1)';
  });
  if (floatingBtn) floatingBtn.style.display = 'none';
  document.body.style.overflow = 'hidden';
}

function closeChatBot() {
  const panel = document.getElementById('chatbot-panel');
  const floatingBtn = document.getElementById('floating-chat-btn');
  if (!panel) return;
  panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  panel.style.opacity = '0';
  panel.style.transform = 'translateX(30px) scale(0.97)';
  setTimeout(() => {
    panel.style.display = 'none';
    isChatOpen = false;
    if (floatingBtn) floatingBtn.style.display = 'flex';
    document.body.style.overflow = '';
  }, 300);
}

async function handleChatSubmit(e) {
  e.preventDefault();
  if (isTypingBot || isOffline) return;

  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  appendMessage('user', text);
  chatHistory.push({ role: 'user', parts: [{ text }] });
  showTypingIndicator(true);

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const apiKey = GEMINI_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
        throw new Error('API key not configured');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            contents: chatHistory,
            generationConfig: { maxOutputTokens: 500 }
          })
        }
      );

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        if (response.status === 503 && attempts < maxAttempts - 1) {
          attempts++;
          await new Promise(r => setTimeout(r, 2000 * attempts));
          continue;
        }
        throw new Error(errJson.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';
      chatHistory.push({ role: 'model', parts: [{ text: aiText }] });
      showTypingIndicator(false);
      appendMessageTypewriter('ai', aiText);
      break;

    } catch (err) {
      console.error('ChatBot error:', err);
      if (attempts >= maxAttempts - 1) {
        showTypingIndicator(false);
        isOffline = true;
        appendMessage('ai', 'Oops! Mình gặp chút sự cố kết nối. Mình sẽ **ngoại tuyến** một chút để Huy kiểm tra lại hệ thống nhé!');
        updateChatStatus(false);
        break;
      }
      attempts++;
      await new Promise(r => setTimeout(r, 2000 * attempts));
    }
  }
}

function appendMessage(role, text) {
  const messagesDiv = document.getElementById('chatbot-messages');
  if (!messagesDiv) return;
  const div = document.createElement('div');
  div.className = `message message-${role === 'ai' ? 'ai' : 'user'}`;
  div.innerHTML = formatText(text);
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function appendMessageTypewriter(role, text) {
  const messagesDiv = document.getElementById('chatbot-messages');
  if (!messagesDiv) return;
  const div = document.createElement('div');
  div.className = `message message-${role === 'ai' ? 'ai' : 'user'}`;
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  div.appendChild(cursor);
  messagesDiv.appendChild(div);

  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      div.innerHTML = formatText(text.slice(0, i + 1));
      div.appendChild(cursor);
      i++;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } else {
      clearInterval(interval);
      cursor.remove();
      div.innerHTML = formatText(text);
    }
  }, 15);
}

function showTypingIndicator(show) {
  isTypingBot = show;
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.style.display = show ? 'flex' : 'none';
  const messagesDiv = document.getElementById('chatbot-messages');
  if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateChatStatus(online) {
  const statusEl = document.querySelector('.chatbot-status');
  const dot = document.querySelector('.chatbot-status-dot');
  if (statusEl) {
    statusEl.textContent = online ? 'Online' : 'Offline';
    statusEl.classList.toggle('status-offline', !online);
  }
  if (dot) {
    dot.style.background = online ? '#10b981' : '#ef4444';
    dot.style.boxShadow = online ? '0 0 10px rgba(16,185,129,0.5)' : 'none';
  }
  const form = document.getElementById('chatbot-form');
  const offlineNotice = document.getElementById('chatbot-offline-notice');
  if (form) form.style.display = online ? 'flex' : 'none';
  if (offlineNotice) offlineNotice.style.display = online ? 'none' : 'flex';
}

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}
