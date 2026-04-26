(function () {
  const zhTextMap = new Map([
    ['鐜嬫窓绔嬬殑涓汉缃戠珯', '王淙立的个人网站'],
    ['鏁欒偛鑳屾櫙', '教育背景'],
    ['鏍稿績浼樺娍', '核心优势'],
    ['椤圭洰缁忛獙', '项目经验'],
    ['浣滃搧闆?', '作品集'],
    ['闇€姹傚垎鏋?', '需求分析'],
    ['鐢ㄦ埛鐮旂┒', '用户研究'],
    ['鍙敤鎬ф祴璇?', '可用性测试'],
    ['杈撳叆浣犵殑闂', '输入你的问题'],
    ['鍙戦€侀棶棰?', '发送问题'],
    ['AI 鍒嗚韩闂瓟鍙?', 'AI 分身问答台'],
    ['鍜屾垜鐨?AI 鍒嗚韩鑱婅亰', '和我的 AI 分身聊聊']
  ]);

  function normalizeText(text) {
    let output = text;
    output = output.replace(/ 路 /g, ' · ');
    output = output.replace(/鈫\?/g, ' → ');
    output = output.replace(/鈥\?/g, '–');

    zhTextMap.forEach(function (value, key) {
      output = output.split(key).join(value);
    });

    return output;
  }

  function walkTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    textNodes.forEach(function (node) {
      const normalized = normalizeText(node.nodeValue || '');
      if (normalized !== node.nodeValue) {
        node.nodeValue = normalized;
      }
    });
  }

  function walkAttributes(root) {
    root.querySelectorAll('*').forEach(function (el) {
      ['aria-label', 'alt', 'placeholder', 'title'].forEach(function (attr) {
        const current = el.getAttribute(attr);
        if (!current) return;
        const normalized = normalizeText(current);
        if (normalized !== current) {
          el.setAttribute(attr, normalized);
        }
      });
    });
  }

  function cleanDomText() {
    walkTextNodes(document.body);
    walkAttributes(document.body);
  }

  const observer = new MutationObserver(function () {
    cleanDomText();
  });

  window.addEventListener('load', function () {
    cleanDomText();
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['aria-label', 'alt', 'placeholder', 'title']
      });
    }
  });
})();
