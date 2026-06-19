// 页面辅助模块：提示卡片、关键词徽章与访问说明
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://index-mobile-leyu.com.cn',
    keyword: '乐鱼体育',
    badgeColor: '#e83e8c',
    cardBg: '#f0f9ff',
    borderColor: '#b3d9ff'
  };

  // 工具函数：创建元素并设置属性
  function createElement(tag, attrs, content) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }
    }
    if (content !== undefined && content !== null) {
      el.textContent = content;
    }
    return el;
  }

  // 工具函数：添加样式
  function addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // 生成提示卡片
  function createTipCard() {
    const card = createElement('div', {
      class: 'site-tip-card',
      style: `background:${CONFIG.cardBg};border:1px solid ${CONFIG.borderColor};border-radius:8px;padding:16px;margin:16px 0;box-shadow:0 2px 6px rgba(0,0,0,0.06);`
    });

    const title = createElement('h4', {
      style: 'margin:0 0 8px;color:#1a1a1a;font-size:16px;'
    }, `💡 关于 ${CONFIG.keyword}`);
    card.appendChild(title);

    const desc = createElement('p', {
      style: 'margin:0 0 12px;color:#333;line-height:1.5;font-size:14px;'
    }, `欢迎访问 ${CONFIG.siteUrl}，这是一个专注于 ${CONFIG.keyword} 相关内容的页面。请阅读以下说明。`);
    card.appendChild(desc);

    const link = createElement('a', {
      href: CONFIG.siteUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      style: 'color:#0056b3;text-decoration:underline;font-weight:500;'
    }, '前往主站');
    card.appendChild(link);

    return card;
  }

  // 生成关键词徽章
  function createBadge(text) {
    const badge = createElement('span', {
      class: 'keyword-badge',
      style: `display:inline-block;background:${CONFIG.badgeColor};color:#fff;border-radius:12px;padding:4px 12px;font-size:12px;font-weight:600;margin:4px;white-space:nowrap;`
    }, text || CONFIG.keyword);
    return badge;
  }

  // 生成访问说明区域
  function createAccessInfo() {
    const container = createElement('div', {
      class: 'access-info',
      style: 'background:#fffbe6;border:1px solid #ffe58f;border-radius:6px;padding:12px;margin:12px 0;font-size:13px;'
    });

    const heading = createElement('p', {
      style: 'margin:0 0 6px;font-weight:600;color:#ad6800;'
    }, '📌 访问须知');
    container.appendChild(heading);

    const list = createElement('ul', {
      style: 'margin:0;padding-left:20px;color:#5a4000;'
    });
    const items = [
      '请通过正规渠道访问本站，注意核对网址。',
      `推荐使用最新浏览器访问 ${CONFIG.siteUrl}。`,
      '如遇加载异常，请尝试刷新页面或更换网络环境。',
      '本站内容仅供学习交流，请合理使用。'
    ];
    items.forEach(text => {
      const li = createElement('li', {}, text);
      list.appendChild(li);
    });
    container.appendChild(list);

    return container;
  }

  // 注入自定义样式
  function injectStyles() {
    const css = `
      .site-tip-card a:hover { opacity: 0.8; }
      .keyword-badge:hover { filter: brightness(1.1); cursor: default; }
      .access-info ul { list-style-type: disc; }
      @media (max-width: 600px) {
        .site-tip-card, .access-info { margin-left: 8px; margin-right: 8px; }
      }
    `;
    addStyle(css);
  }

  // 渲染所有组件到页面指定容器
  function renderComponents() {
    const target = document.getElementById('site-helper-root');
    if (!target) {
      console.warn('未找到 #site-helper-root 容器，组件未渲染。');
      return;
    }

    // 清空容器
    target.innerHTML = '';

    // 追加提示卡片
    target.appendChild(createTipCard());

    // 追加徽章组
    const badgeGroup = createElement('div', {
      style: 'margin:12px 0;text-align:center;'
    });
    const badges = [CONFIG.keyword, '体育资讯', '安全提示', '移动端'];
    badges.forEach(word => {
      badgeGroup.appendChild(createBadge(word));
    });
    target.appendChild(badgeGroup);

    // 追加访问说明
    target.appendChild(createAccessInfo());
  }

  // 初始化
  function init() {
    injectStyles();
    // 等待 DOM 就绪
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderComponents);
    } else {
      renderComponents();
    }
  }

  // 启动
  init();

})();