(function () {
  const chat = document.getElementById('aiChat');
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiQuestionInput');
  const suggestions = document.getElementById('aiSuggestions');
  const statusBadge = document.querySelector('.ai-console__status');
  if (!chat || !form || !input || !suggestions || !statusBadge) return;

  const copy = {
    zh: {
      welcome:
        '你好，我是王聪立的 AI 分身。你可以问我教育背景、项目经验、技能结构、产品思维，或者为什么我适合产品经理 / AI 产品经理岗位。',
      empty: '可以直接问我一个和王聪立相关的问题，比如“你的核心优势是什么？”',
      typing: '正在调用真实 AI 回答...',
      offline: 'AI 服务暂时还没准备好，请稍后刷新页面再试。',
      setupFailed: 'AI 知识库暂时没有准备完成，请检查部署配置或稍后再试。',
      sourcePrefix: '参考资料',
      online: 'AI Online',
      syncing: 'Syncing',
      ready: 'Profile-grounded',
      setupNeeded: 'Setup Needed',
      userLabel: '你',
    },
    en: {
      welcome:
        "Hi, I am Congli Wang's AI persona. Ask me about education, projects, skills, product thinking, or why I fit product manager and AI product manager roles.",
      empty: 'Ask me something profile-related, such as "What are your core strengths?"',
      typing: 'Asking the live AI...',
      offline: 'The AI service is not ready yet. Please refresh the page and try again shortly.',
      setupFailed: 'The AI knowledge base is not ready yet. Please check deployment config or try again shortly.',
      sourcePrefix: 'Sources',
      online: 'AI Online',
      syncing: 'Syncing',
      ready: 'Profile-grounded',
      setupNeeded: 'Setup Needed',
      userLabel: 'You',
    },
  };

  let lastStatus = null;

  function currentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'zh';
  }

  function appendMessage(role, text) {
    const message = document.createElement('article');
    message.className = 'ai-message ai-message--' + role;

    const avatar = document.createElement('div');
    avatar.className = 'ai-message__avatar';
    avatar.textContent = role === 'bot' ? 'AI' : copy[currentLang()].userLabel;

    const bubble = document.createElement('div');
    bubble.className = 'ai-message__bubble';
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
    return message;
  }

  function setWelcomeText(lang) {
    const welcomeBubble = chat.querySelector('.ai-message--bot .ai-message__bubble');
    if (welcomeBubble) {
      welcomeBubble.textContent = copy[lang].welcome;
    }
  }

  function updateStatusBadge(status) {
    lastStatus = status || lastStatus;
    const lang = currentLang();

    if (!status) {
      statusBadge.textContent = copy[lang].ready;
      return;
    }

    if (!status.configured) {
      statusBadge.textContent = copy[lang].setupNeeded;
      return;
    }

    if (status.syncing) {
      statusBadge.textContent = copy[lang].syncing;
      return;
    }

    statusBadge.textContent = status.ready ? copy[lang].online : copy[lang].ready;
  }

  function buildAnswerText(answer, citations) {
    const lang = currentLang();
    if (!Array.isArray(citations) || citations.length === 0) return answer;

    const sourceNames = citations
      .map(function (item) {
        return item && item.filename ? item.filename : null;
      })
      .filter(Boolean)
      .filter(function (value, index, arr) {
        return arr.indexOf(value) === index;
      });

    if (sourceNames.length === 0) return answer;
    return answer + '\n\n' + copy[lang].sourcePrefix + '：' + sourceNames.join('、');
  }

  async function fetchStatus() {
    try {
      const response = await fetch('/api/status', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('status request failed');
      const status = await response.json();
      updateStatusBadge(status);
      return status;
    } catch (error) {
      updateStatusBadge({ configured: false, ready: false, syncing: false });
      return null;
    }
  }

  async function ask(question) {
    const lang = currentLang();
    const value = question.trim();
    if (!value) {
      appendMessage('bot', copy[lang].empty);
      return;
    }

    const status = lastStatus || (await fetchStatus());
    if (!status || !status.configured) {
      appendMessage('bot', copy[lang].offline);
      return;
    }

    appendMessage('user', value);
    const pendingMessage = appendMessage('bot', copy[lang].typing);
    input.disabled = true;
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ question: value, lang: lang }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || copy[lang].setupFailed);
      }

      pendingMessage.querySelector('.ai-message__bubble').textContent = buildAnswerText(
        payload.answer,
        payload.citations
      );
      updateStatusBadge({ configured: true, ready: true, syncing: false });
    } catch (error) {
      pendingMessage.querySelector('.ai-message__bubble').textContent =
        error.message || copy[lang].setupFailed;
    } finally {
      input.disabled = false;
      if (submitButton) submitButton.disabled = false;
      chat.scrollTop = chat.scrollHeight;
    }
  }

  window.applyAiPersonaLanguage = function (lang) {
    setWelcomeText(lang);
    updateStatusBadge(lastStatus);
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    ask(input.value);
    input.value = '';
  });

  suggestions.addEventListener('click', function (event) {
    const button = event.target.closest('.ai-suggestion');
    if (!button) return;
    ask(button.dataset.question || button.textContent || '');
  });

  setWelcomeText(currentLang());
  fetchStatus();
})();
