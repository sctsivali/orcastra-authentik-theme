(function () {
  if (window.__orcTheme) return;
  window.__orcTheme = 1;
  var ICONS = {
    user: '<svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    key: '<svg viewBox="0 0 24 24"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    apps: '<svg viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    google: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
  };

  function iconFor(label) {
    var t = (label || "").toLowerCase();
    if (t.indexOf("token") >= 0 || t.indexOf("password") >= 0) return ICONS.key;
    if (t.indexOf("notif") >= 0) return ICONS.bell;
    if (t.indexOf("consent") >= 0 || t.indexOf("mfa") >= 0 || t.indexOf("device") >= 0) return ICONS.shield;
    if (t.indexOf("session") >= 0) return ICONS.monitor;
    if (t.indexOf("connected") >= 0 || t.indexOf("source") >= 0 || t.indexOf("service") >= 0) return ICONS.link;
    if (t.indexOf("detail") >= 0 || t.indexOf("profile") >= 0 || t.indexOf("user") >= 0) return ICONS.user;
    if (t.indexOf("library") >= 0 || t.indexOf("application") >= 0) return ICONS.apps;
    if (t.indexOf("setting") >= 0) return ICONS.settings;
    return ICONS.settings;
  }

  var TAB_CSS = [
    ".pf-c-tabs__link{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:0.625rem!important;border-radius:9999px!important;margin:0.2rem 0.55rem!important;padding:0.5rem 0.9rem!important;border:0!important;box-shadow:none!important;font-weight:500!important;}",
    ".pf-c-tabs__link::before,.pf-c-tabs__link::after,.pf-c-tabs__list::before,.pf-c-tabs::before{display:none!important;border-width:0!important;width:0!important;}",
    ".pf-c-tabs__item.pf-m-current .pf-c-tabs__link,.pf-c-tabs__link[aria-selected=\"true\"]{background:#7c3aed!important;color:#fff!important;}",
    ".pf-c-tabs__link:hover{background:hsl(240 5% 14%)!important;color:#fff!important;}",
    ".pf-c-tabs__item.pf-m-current .pf-c-tabs__link:hover,.pf-c-tabs__link[aria-selected=\"true\"]:hover{background:hsl(263.4 70% 42%)!important;}",
    ".orc-tab-icon,.orc-tab-icon svg{width:1rem;height:1rem;display:block;flex-shrink:0;}",
    ".orc-tab-icon svg{stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;}",
    ".pf-c-button:not(.authenticator-button),button.pf-c-button:not(.authenticator-button){border-radius:9999px!important;}",
    ".pf-c-button:not(.authenticator-button)::before,.pf-c-button:not(.authenticator-button)::after{border-radius:9999px!important;}",
    ".authenticator-button,.pf-c-button.authenticator-button{border-radius:0.75rem!important;overflow:visible!important;height:auto!important;}",
    ".pf-c-login__main{border-radius:1rem!important;overflow:visible!important;}",
    "@media (max-width: 768px) {",
    ":host([vertical]){display:grid!important;grid-template-columns:auto 1fr!important;width:100%!important;}",
    ":host([vertical]):not([data-orc-expanded]) .pf-c-tabs.pf-m-vertical{width:3.5rem!important;max-width:3.5rem!important;min-width:3.5rem!important;box-sizing:border-box!important;padding:0.35rem 0!important;display:flex!important;flex-direction:column!important;align-items:center!important;--pf-c-tabs--inset:0!important;--pf-c-tabs--m-vertical--m-box--inset:0!important;}",
    ":host([vertical]):not([data-orc-expanded]) .pf-c-tabs__list{width:100%!important;padding:0!important;margin:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;}",
    ":host([vertical]):not([data-orc-expanded]) .pf-c-tabs__item{width:100%!important;margin:0!important;padding:0!important;display:flex!important;justify-content:center!important;}",
    ":host([vertical]):not([data-orc-expanded]) .pf-c-tabs__item-text,:host([vertical]):not([data-orc-expanded]) .pf-c-tabs__link > :not(.orc-tab-icon){display:none!important;}",
    ":host([vertical]):not([data-orc-expanded]) .pf-c-tabs__link{display:grid!important;place-items:center!important;place-content:center!important;width:2.5rem!important;height:2.5rem!important;min-width:2.5rem!important;max-width:2.5rem!important;padding:0!important;margin:0.2rem auto!important;box-sizing:border-box!important;overflow:hidden!important;gap:0!important;line-height:0!important;font-size:0!important;--pf-c-tabs__link--PaddingTop:0!important;--pf-c-tabs__link--PaddingRight:0!important;--pf-c-tabs__link--PaddingBottom:0!important;--pf-c-tabs__link--PaddingLeft:0!important;}",
    ":host([vertical]):not([data-orc-expanded]) .orc-tab-icon{position:static!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:0!important;width:1rem!important;height:1rem!important;transform:none!important;grid-area:1/1!important;}",
    ":host([vertical]):not([data-orc-expanded]) .orc-tab-icon svg{display:block!important;width:1rem!important;height:1rem!important;margin:0!important;}",
    ":host([vertical][data-orc-expanded]) .orc-tab-icon{position:static!important;display:flex!important;align-items:center!important;justify-content:center!important;transform:none!important;}",
    ":host([vertical][data-orc-expanded]) .pf-c-tabs.pf-m-vertical{width:14rem!important;max-width:14rem!important;position:relative!important;z-index:6!important;padding:0.35rem 0!important;align-items:stretch!important;}",
    ":host([vertical][data-orc-expanded]) .pf-c-tabs__item-text{display:inline!important;white-space:nowrap!important;width:auto!important;height:auto!important;clip:auto!important;position:static!important;}",
    ":host([vertical][data-orc-expanded]) .pf-c-tabs__item{width:auto!important;justify-content:flex-start!important;}",
    ":host([vertical][data-orc-expanded]) .pf-c-tabs__link{width:auto!important;max-width:none!important;height:auto!important;margin:0.2rem 0.55rem!important;padding:0.5rem 0.9rem!important;justify-content:flex-start!important;overflow:visible!important;}",
    "#orc-tab-toggle{display:grid!important;place-items:center!important;place-content:center!important;align-self:center!important;flex:0 0 2.5rem!important;width:2.5rem!important;height:2.5rem!important;min-width:2.5rem!important;margin:0.15rem 0 0.25rem!important;border:0!important;border-radius:9999px!important;background:hsl(263.4 45% 22%)!important;color:#e9d5ff!important;cursor:pointer!important;padding:0!important;box-sizing:border-box!important;line-height:0!important;overflow:hidden!important;}",
    "#orc-tab-toggle svg{position:static!important;display:block!important;width:1.1rem!important;height:1.1rem!important;margin:0!important;transform:none!important;stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;}",
    ".pf-c-form.pf-m-horizontal .pf-c-form__group,.pf-c-form__group,ak-form-element-horizontal,:host(ak-form-element-horizontal){display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:0.35rem!important;width:100%!important;}",
    ".pf-c-form__group-label,.pf-c-form__label,.pf-c-form label{width:100%!important;max-width:100%!important;text-align:left!important;float:none!important;}",
    ".pf-c-form-control,input:not([type=checkbox]):not([type=radio]),select,textarea{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;}",
    ".pf-c-card,.pf-c-card__body{max-width:100%!important;overflow:visible!important;}",
    "}",
    "@media (min-width: 769px) { #orc-tab-toggle{display:none!important;} }"
  ].join("");

  var NAV_CSS = [
    ":host { display: flex !important; align-items: center !important; gap: 0.25rem !important; }",
    ".pf-c-page__header-tools, .pf-c-page__header-tools-group { display: flex !important; align-items: center !important; gap: 0.15rem !important; margin: 0 !important; padding: 0 !important; background: transparent !important; border: 0 !important; box-shadow: none !important; }",
    ".pf-c-page__header-tools-item { display: flex !important; align-items: center !important; margin: 0 !important; padding: 0 !important; }",
    ".pf-c-button.pf-m-plain { box-sizing: border-box !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 0 0 2.25rem !important; width: 2.25rem !important; height: 2.25rem !important; min-width: 2.25rem !important; min-height: 2.25rem !important; max-width: 2.25rem !important; max-height: 2.25rem !important; padding: 0 !important; margin: 0 !important; border: 0 !important; line-height: 0 !important; font-size: 0 !important; overflow: hidden !important; aspect-ratio: 1 / 1 !important; border-radius: 9999px !important; color: #e9d5ff !important; background: transparent !important; box-shadow: none !important; --pf-c-button--PaddingTop: 0; --pf-c-button--PaddingRight: 0; --pf-c-button--PaddingBottom: 0; --pf-c-button--PaddingLeft: 0; --pf-c-button--LineHeight: 0; }",
    ".pf-c-button.pf-m-plain::before, .pf-c-button.pf-m-plain::after { display: none !important; content: none !important; }",
    ".pf-c-button.pf-m-plain:hover { background: hsl(263.4 45% 28%) !important; color: #fff !important; }",
    ".pf-c-button.pf-m-plain i.fas { display: none !important; }",
    ".pf-c-button.pf-m-plain pf-tooltip { display: flex !important; align-items: center !important; justify-content: center !important; width: 100% !important; height: 100% !important; line-height: 0 !important; }",
    ".orc-nav-icon, .orc-nav-icon svg { width: 1.125rem !important; height: 1.125rem !important; display: block !important; margin: 0 !important; }",
    ".orc-nav-icon svg { stroke: currentColor; fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }",
    ".pf-c-notification-badge { position: relative !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; padding: 0 !important; margin: 0 !important; width: auto !important; height: auto !important; background: transparent !important; }",
    ".pf-c-notification-badge__count { position: absolute !important; top: -5px !important; right: -6px !important; min-width: 1rem !important; height: 1rem !important; padding: 0 0.25rem !important; border-radius: 9999px !important; background: #7c3aed !important; color: #fff !important; font-size: 0.625rem !important; line-height: 1rem !important; font-weight: 600 !important; text-align: center !important; }",
    ".pf-c-notification-badge:not(.pf-m-unread) .pf-c-notification-badge__count { display: none !important; }",
    ".pf-c-button.pf-m-secondary { display: inline-flex !important; align-items: center !important; height: 2rem !important; padding: 0 0.75rem !important; margin: 0 0.15rem !important; border-radius: 9999px !important; background: hsl(263.4 55% 32% / 0.45) !important; color: #fff !important; border: 1px solid hsl(263.4 70% 72% / 0.35) !important; font-size: 0.8125rem !important; font-weight: 500 !important; line-height: 1 !important; box-shadow: none !important; }",
    ".pf-c-button.pf-m-secondary::after { display: none !important; }",
    ".pf-c-avatar { width: 2rem !important; height: 2rem !important; margin-left: 0.35rem !important; padding: 0 !important; border-radius: 9999px !important; overflow: hidden !important; box-shadow: 0 0 0 2px hsl(263.4 70% 50.4% / 0.45); background: hsl(263.4 45% 28%) !important; }",
    ".pf-c-avatar img { width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; }",
    ".pf-c-page__header-tools-item.pf-m-visible-on-2xl { font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-size: 0.875rem !important; font-weight: 500 !important; font-style: normal !important; color: hsl(270 60% 92%) !important; letter-spacing: -0.01em !important; margin: 0 0.35rem 0 0.15rem !important; }",
    "@media (max-width: 768px) { .pf-c-page__header-tools-item.pf-m-visible-on-2xl { display: none !important; } .pf-c-button.pf-m-plain { flex: 0 0 2.25rem !important; } }",
    "::slotted(a.pf-u-display-none-on-md) { display: none !important; }"
  ].join("");

  var LIB_CSS = [
    ":host { display: block !important; width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; box-sizing: border-box !important; font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-style: normal !important; }",
    ".pf-c-page, .pf-c-page__main { width: 100% !important; max-width: none !important; margin: 0 !important; background: transparent !important; border: 0 !important; box-shadow: none !important; }",
    ".pf-c-page__title, h1.pf-c-page__title, h1 { font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-size: 1.5rem !important; font-weight: 600 !important; font-style: normal !important; letter-spacing: -0.03em !important; color: hsl(0 0% 98%) !important; line-height: 2rem !important; margin: 0 !important; }",
    ".pf-c-page__header, .pf-c-page__header.pf-c-content { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 1rem !important; width: 100% !important; max-width: 80rem !important; margin: 0 auto !important; box-sizing: border-box !important; padding: 1.5rem 2rem 1rem !important; background: transparent !important; border: 0 !important; }",
    "search { font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; flex: 0 1 28rem !important; max-width: 28rem !important; min-width: 12rem !important; }",
    "input[type=search], .pf-c-form-control, [part=search-input], input[name=application-search] { background: hsl(240 5% 10%) !important; border: 1px solid hsl(240 4% 18%) !important; border-radius: 9999px !important; color: hsl(0 0% 98%) !important; min-height: 2.5rem !important; width: 100% !important; padding: 0.5rem 1rem !important; font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-size: 0.875rem !important; font-weight: 400 !important; font-style: normal !important; letter-spacing: 0 !important; box-shadow: none !important; }",
    "input[type=search]::placeholder, .pf-c-form-control::placeholder, [part=search-input]::placeholder, input[name=application-search]::placeholder { font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-style: normal !important; font-weight: 400 !important; color: hsl(240 5% 58%) !important; opacity: 1 !important; }",
    ".pf-c-page__main-section { width: 100% !important; max-width: 80rem !important; margin: 0 auto !important; padding: 0.5rem 2rem 2.5rem !important; box-sizing: border-box !important; }",
    "[part=card], .pf-c-card { background: hsl(240 6% 9%) !important; border: 1px solid hsl(240 4% 16%) !important; border-radius: 1rem !important; box-shadow: none !important; overflow: hidden !important; width: 100% !important; }",
    "[part=card]:hover, .pf-c-card:hover { border-color: hsl(263.4 45% 34%) !important; box-shadow: 0 12px 28px -14px rgb(124 58 237 / 0.5) !important; }",
    "[part=card-title], .pf-c-card__title { font-family: Geist, ui-sans-serif, system-ui, sans-serif !important; font-weight: 500 !important; font-style: normal !important; color: hsl(0 0% 98%) !important; -webkit-text-stroke: 0 !important; }",
    "[part=app-list], [part=app-group] { gap: 1rem !important; width: 100% !important; justify-items: stretch !important; grid-template-columns: repeat(auto-fit, minmax(16.5rem, 1fr)) !important; }",
    "[part=card-wrapper] { width: 100% !important; max-width: none !important; }",
    "@media (max-width: 768px) { .pf-c-page__header, .pf-c-page__header.pf-c-content { flex-direction: column !important; align-items: stretch !important; padding: 1rem 1.25rem 0.75rem !important; gap: 0.75rem !important; } .pf-c-page__title, h1 { font-size: 1.25rem !important; } search { flex: 1 1 auto !important; max-width: none !important; width: 100% !important; min-width: 0 !important; } .pf-c-page__main-section { padding: 0.5rem 1.25rem 1.5rem !important; } [part=app-list], [part=app-group] { grid-template-columns: 1fr !important; } }"
  ].join("");

  function ensureStyle(root, id, css) {
    if (!root || !root.querySelector) return;
    var s = root.querySelector("#" + id);
    if (!s) {
      s = document.createElement("style");
      s.id = id;
      (root.head || root).appendChild(s);
    }
    if (s.textContent !== css) s.textContent = css;
  }


  function swapFa(root) {
    var map = { "fa-bell": "bell", "fa-cog": "settings", "fa-sign-out-alt": "logout", "fa-code": "code" };
    var icons = root.querySelectorAll ? root.querySelectorAll("i.fas") : [];
    for (var i = 0; i < icons.length; i++) {
      var el = icons[i];
      if (el.getAttribute("data-orc") === "1") continue;
      var cls = el.className || "";
      var key = null;
      for (var k in map) { if (cls.indexOf(k) >= 0) { key = map[k]; break; } }
      if (!key || !ICONS[key]) continue;
      var wrap = document.createElement("span");
      wrap.className = "orc-nav-icon";
      wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = ICONS[key];
      el.setAttribute("data-orc", "1");
      el.style.display = "none";
      el.parentNode.insertBefore(wrap, el);
    }
  }
  var CHEV_R = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>';
  var CHEV_L = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
  function syncChevron(host) {
    var root = host && host.shadowRoot;
    var btn = root && root.querySelector("#orc-tab-toggle");
    if (!btn) return;
    var on = host.hasAttribute("data-orc-expanded");
    var dir = on ? "l" : "r";
    if (btn.getAttribute("data-orc-dir") !== dir) {
      btn.setAttribute("data-orc-dir", dir);
      btn.innerHTML = on ? CHEV_L : CHEV_R;
    }
    btn.setAttribute("aria-expanded", on ? "true" : "false");
  }
  function onToggleHit(ev) {
    var host = ev.currentTarget;
    var path = ev.composedPath ? ev.composedPath() : [];
    var hit = false;
    for (var i = 0; i < path.length; i++) {
      if (path[i] && path[i].id === "orc-tab-toggle") { hit = true; break; }
    }
    if (!hit) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if (host.hasAttribute("data-orc-expanded")) host.removeAttribute("data-orc-expanded");
    else host.setAttribute("data-orc-expanded", "1");
    syncChevron(host);
    try { centerCollapsedNav(host); } catch (e) {}
  }
  function bindHostToggle(host) {
    if (!host || host.__orcToggleBound) return;
    host.__orcToggleBound = true;
    host.addEventListener("pointerdown", onToggleHit, true);
  }
  function addTabToggle(root, host) {
    if (!host || (host.tagName || "").toLowerCase() !== "ak-tabs") return;
    if (!host.hasAttribute("vertical")) return;
    bindHostToggle(host);
    if (!host.__orcShadowWatch) {
      host.__orcShadowWatch = true;
      try {
        new MutationObserver(function () {
          addTabToggle(root, host);
        }).observe(root, { childList: true, subtree: true });
      } catch (e) {}
    }
    var btn = root.querySelector("#orc-tab-toggle");
    if (!btn) {
      btn = document.createElement("div");
      btn.id = "orc-tab-toggle";
      btn.setAttribute("role", "button");
      btn.setAttribute("aria-label", "Toggle menu");
      btn.tabIndex = -1;
      var list = root.querySelector(".pf-c-tabs__list");
      var tabs = root.querySelector(".pf-c-tabs");
      if (list && list.parentNode) list.parentNode.insertBefore(btn, list);
      else if (tabs) tabs.insertBefore(btn, tabs.firstChild);
      else root.appendChild(btn);
    }
    syncChevron(host);
  }
  function centerCollapsedNav(host) {
    if (!host || (host.tagName || "").toLowerCase() !== "ak-tabs") return;
    var root = host.shadowRoot;
    if (!root || !root.querySelectorAll) return;
    var collapsed = window.innerWidth <= 768 && !host.hasAttribute("data-orc-expanded");
    var mobile = window.innerWidth <= 768;
    var links = root.querySelectorAll(".pf-c-tabs__link");
    var i, t, link, texts, icon, svg;
    for (i = 0; i < links.length; i++) {
      link = links[i];
      if (collapsed) {
        link.style.setProperty("display", "grid", "important");
        link.style.setProperty("place-items", "center", "important");
        link.style.setProperty("place-content", "center", "important");
        link.style.setProperty("width", "2.5rem", "important");
        link.style.setProperty("height", "2.5rem", "important");
        link.style.setProperty("min-width", "2.5rem", "important");
        link.style.setProperty("max-width", "2.5rem", "important");
        link.style.setProperty("padding", "0", "important");
        link.style.setProperty("gap", "0", "important");
        link.style.setProperty("overflow", "hidden", "important");
        link.style.setProperty("line-height", "0", "important");
        link.style.setProperty("font-size", "0", "important");
        link.style.setProperty("box-sizing", "border-box", "important");
        texts = link.querySelectorAll(".pf-c-tabs__item-text");
        for (t = 0; t < texts.length; t++) {
          texts[t].style.setProperty("display", "none", "important");
        }
        icon = link.querySelector(".orc-tab-icon");
        if (icon) {
          icon.style.setProperty("position", "static", "important");
          icon.style.setProperty("display", "flex", "important");
          icon.style.setProperty("align-items", "center", "important");
          icon.style.setProperty("justify-content", "center", "important");
          icon.style.setProperty("margin", "0", "important");
          icon.style.setProperty("width", "1rem", "important");
          icon.style.setProperty("height", "1rem", "important");
          icon.style.setProperty("transform", "none", "important");
          icon.style.setProperty("grid-area", "1 / 1", "important");
          svg = icon.querySelector("svg");
          if (svg) {
            svg.style.setProperty("display", "block", "important");
            svg.style.setProperty("width", "1rem", "important");
            svg.style.setProperty("height", "1rem", "important");
            svg.style.setProperty("margin", "0", "important");
            svg.setAttribute("width", "16");
            svg.setAttribute("height", "16");
          }
        }
      } else {
        link.style.cssText = "";
        texts = link.querySelectorAll(".pf-c-tabs__item-text");
        for (t = 0; t < texts.length; t++) texts[t].style.cssText = "";
        icon = link.querySelector(".orc-tab-icon");
        if (icon) {
          icon.style.cssText = "";
          svg = icon.querySelector("svg");
          if (svg) svg.style.cssText = "";
        }
      }
    }
    var btn = root.querySelector("#orc-tab-toggle");
    if (!btn) return;
    if (mobile) {
      btn.style.setProperty("display", "grid", "important");
      btn.style.setProperty("place-items", "center", "important");
      btn.style.setProperty("place-content", "center", "important");
      btn.style.setProperty("width", "2.5rem", "important");
      btn.style.setProperty("height", "2.5rem", "important");
      btn.style.setProperty("min-width", "2.5rem", "important");
      btn.style.setProperty("padding", "0", "important");
      btn.style.setProperty("overflow", "hidden", "important");
      btn.style.setProperty("line-height", "0", "important");
      btn.style.setProperty("box-sizing", "border-box", "important");
      svg = btn.querySelector("svg");
      if (svg) {
        svg.style.setProperty("position", "static", "important");
        svg.style.setProperty("display", "block", "important");
        svg.style.setProperty("width", "1.1rem", "important");
        svg.style.setProperty("height", "1.1rem", "important");
        svg.style.setProperty("margin", "0", "important");
        svg.style.setProperty("transform", "none", "important");
      }
    } else {
      btn.style.cssText = "";
      svg = btn.querySelector("svg");
      if (svg) svg.style.cssText = "";
    }
  }
  function addIcons(root) {
    var links = root.querySelectorAll ? root.querySelectorAll(".pf-c-tabs__link") : [];
    for (var i = 0; i < links.length; i++) {
      var btn = links[i];
      if (btn.querySelector(".orc-tab-icon")) continue;
      var wrap = document.createElement("span");
      wrap.className = "orc-tab-icon";
      wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = iconFor((btn.textContent || "").trim());
      btn.insertBefore(wrap, btn.firstChild);
    }
  }


  var TABLE_CSS = [
    "@media (max-width: 768px) {",
    ":host:has(.pf-c-table){display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;}",
    "[part=table-container]{overflow:visible!important;width:100%!important;}",
    ".pf-c-toolbar,.pf-c-toolbar__content,.pf-c-toolbar__content-section,.pf-c-toolbar__group{flex-wrap:wrap!important;gap:0.5rem!important;width:100%!important;max-width:100%!important;padding-inline:0.25rem!important;}",
    ".pf-c-table{display:block!important;width:100%!important;border:0!important;background:transparent!important;}",
    ".pf-c-table colgroup{display:none!important;}",
    ".pf-c-table thead{display:none!important;}",
    ".pf-c-table thead{pointer-events:none!important;}",
    ".pf-c-table tbody{display:flex!important;flex-direction:column!important;gap:0.75rem!important;width:100%!important;}",
    ".pf-c-table tr{display:grid!important;grid-template-columns:1.5rem 1fr!important;align-items:start!important;gap:0.2rem 0.75rem!important;width:100%!important;margin:0!important;padding:0.9rem 1rem!important;box-sizing:border-box!important;background:hsl(240 6% 9%)!important;border:1px solid hsl(240 4% 16%)!important;border-radius:0.75rem!important;box-shadow:none!important;position:relative!important;overflow:hidden!important;isolation:isolate!important;}",
    ".pf-c-table td{display:block!important;grid-column:2!important;width:auto!important;max-width:100%!important;min-width:0!important;padding:0.2rem 0!important;border:0!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:break-word!important;text-align:left!important;line-height:1.35!important;position:relative!important;z-index:1!important;}",
    ".pf-c-table td.pf-c-table__check,.pf-c-table td:has(input[type=checkbox]){grid-column:1!important;grid-row:1!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;padding:0.15rem 0 0!important;width:1.5rem!important;min-width:1.5rem!important;max-width:1.5rem!important;max-height:1.5rem!important;visibility:visible!important;overflow:hidden!important;z-index:2!important;}",
    ".pf-c-table td.pf-c-table__check::before,.pf-c-table td:has(input[type=checkbox])::before{content:none!important;display:none!important;}",
    ".pf-c-table td.pf-c-table__check label,.pf-c-table td:has(input[type=checkbox]) label{display:flex!important;width:1.15rem!important;max-width:1.15rem!important;height:1.15rem!important;margin:0!important;padding:0!important;float:none!important;}",
    ".pf-c-table input[type=checkbox]{appearance:none!important;-webkit-appearance:none!important;width:1.15rem!important;height:1.15rem!important;min-width:1.15rem!important;min-height:1.15rem!important;margin:0!important;padding:0!important;border:1.5px solid hsl(240 5% 46%)!important;border-radius:0.25rem!important;background:hsl(240 6% 12%)!important;opacity:1!important;position:static!important;display:block!important;flex:none!important;visibility:visible!important;pointer-events:auto!important;box-shadow:none!important;}",
    ".pf-c-table input[type=checkbox]:checked{background:#7c3aed!important;border-color:#7c3aed!important;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M3.5 8.5 6.5 11.5 12.5 4.5'/></svg>\")!important;background-size:0.85rem!important;background-repeat:no-repeat!important;background-position:center!important;}",
    ".pf-c-table tr.pf-m-selected,.pf-c-table tr.orc-selected,.pf-c-table tr:has(> .pf-c-table__check input:checked),.pf-c-table tr:has(> td > label > input:checked){border-color:hsl(263.4 70% 50.4%)!important;background:hsl(263.4 40% 14%)!important;box-shadow:inset 0 0 0 1px hsl(263.4 70% 50.4%)!important;}",
    ".pf-c-table td[data-orc-label]::before{content:attr(data-orc-label);display:block;font-size:0.6875rem;font-weight:500;letter-spacing:0.02em;color:hsl(240 5% 64.9%);margin-bottom:0.12rem;}",
    ".pf-c-table tr:not(:has(td.pf-c-table__check)):not(:has(input[type=checkbox])) td{grid-column:1 / -1!important;}",
    ".pf-c-pagination{flex-wrap:wrap!important;gap:0.35rem!important;padding:0.5rem 0.25rem!important;}",
    "}",
  ].join("");

  function labelTables(root) {
    if (!root || !root.querySelectorAll) return;
    var tables = root.querySelectorAll("table.pf-c-table");
    for (var i = 0; i < tables.length; i++) {
      var thById = {};
      var ths = tables[i].querySelectorAll("thead th");
      for (var j = 0; j < ths.length; j++) {
        var th = ths[j];
        if (th.classList && th.classList.contains("pf-c-table__check")) continue;
        var lab = (th.textContent || "").replace(/\s+/g, " ").trim();
        if (th.id) thById[th.id] = lab;
      }
      var tds = tables[i].querySelectorAll("tbody td");
      for (var k = 0; k < tds.length; k++) {
        var td = tds[k];
        if (td.classList && td.classList.contains("pf-c-table__check")) continue;
        if (td.getAttribute("data-orc-label")) continue;
        var lab2 = "";
        var hdr = (td.getAttribute("headers") || "").split(/\s+/);
        for (var m = 0; m < hdr.length; m++) {
          if (hdr[m] && thById[hdr[m]]) { lab2 = thById[hdr[m]]; break; }
        }
        if (lab2) td.setAttribute("data-orc-label", lab2);
      }
    }
  }

  var scheduled = false;
  function run() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      inject(document);
    });
  }
  function watch(root) {
    if (!root || root.__orcObs) return;
    root.__orcObs = true;
    try {
      new MutationObserver(function () { try { applyBrandHide(); } catch (e) {} run(); }).observe(root, { childList: true, subtree: true });
    } catch (e) {}
  }


  function syncTableSelection(root, host) {
    if (!host || !host.selectedMap || !host.data || !host.data.results) return;
    var map = host.selectedMap;
    var results = host.data.results;
    var rows = root.querySelectorAll("table.pf-c-table tbody tr");
    var ri = 0;
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var box = row.querySelector("td.pf-c-table__check input[type=checkbox], td input[type=checkbox]");
      if (!box) continue;
      var item = results[ri++];
      var really = false;
      if (item) {
        map.forEach(function (v) { if (v === item) really = true; });
      }
      if (box.checked !== really) box.checked = really;
      if (really) row.classList.add("orc-selected");
      else row.classList.remove("orc-selected");
    }
  }
  function bindTableSelection(root, host) {
    if (!host || !host.selectedMap) return;
    if (host.__orcSelBound) {
      syncTableSelection(root, host);
      return;
    }
    host.__orcSelBound = true;
    var kick = function () { requestAnimationFrame(function () { syncTableSelection(root, host); }); };
    root.addEventListener("click", kick, true);
    root.addEventListener("input", kick, true);
    try {
      new MutationObserver(kick).observe(root, { subtree: true, attributes: true, attributeFilter: ["checked"] });
    } catch (e) {}
    kick();
  }
  function isFlowRoot(root) {
    var host = root && root.host;
    if (!host || !host.tagName) return false;
    var tag = host.tagName.toLowerCase();
    return tag.indexOf("ak-flow") === 0 || tag.indexOf("ak-stage") === 0 || tag.indexOf("ak-locale") === 0;
  }


  var FLOW_LOADER_CSS = [
    ":host([data-orc-loading]) .pf-c-login__main-header,",
    ":host([data-orc-loading]) .pf-c-login__main-header .branding-logo,",
    ":host([data-orc-loading]) .pf-c-brand,",
    ":host([data-orc-loading]) .branding-logo,",
    ":host([data-orc-loading]) img.branding-logo,",
    ":host:has(ak-loading-overlay) .pf-c-login__main-header,",
    ":host:has(ak-flow-card[loading]) .pf-c-login__main-header,",
    ":host:has(slot[name=\"placeholder\"]) .pf-c-login__main-header,",
    ":host:has(ak-empty-state[loading]) .pf-c-login__main-header",
    "{display:none!important;visibility:hidden!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important;}"
  ].join("");
  function scanLoading(root) {
    if (!root || !root.querySelector) return false;
    if (root.querySelector(".orc-lottie, ak-loading-overlay, ak-flow-card[loading], ak-empty-state[loading], slot[name=\"placeholder\"]")) return true;
    var nodes = root.querySelectorAll("*");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].shadowRoot && scanLoading(nodes[i].shadowRoot)) return true;
    }
    return false;
  }
  function applyBrandHide() {
    var on = false;
    try { on = scanLoading(document); } catch (e) {}
    var html = document.documentElement;
    if (on) html.setAttribute("data-orc-loading", "1");
    else html.removeAttribute("data-orc-loading");
    var execs = document.querySelectorAll("ak-flow-executor");
    for (var i = 0; i < execs.length; i++) {
      if (on) execs[i].setAttribute("data-orc-loading", "1");
      else execs[i].removeAttribute("data-orc-loading");
    }
  }


  var LOGIN_CSS = [
    "fieldset[name=login-sources]{display:flex!important;flex-direction:column!important;width:100%!important;gap:.5rem!important;padding-inline:0!important;margin:0.75rem 0 0!important;border:0!important;min-width:0!important;box-sizing:border-box!important;}",
    "fieldset[name=login-sources] legend{font-size:.75rem!important;font-weight:500!important;color:hsl(240 5% 64.9%)!important;padding:0!important;margin:0 0 .15rem!important;}",
    ".source-button,button.source-button,button[name^=source-]{display:flex!important;align-items:center!important;justify-content:center!important;gap:.6rem!important;width:100%!important;min-height:2.75rem!important;box-sizing:border-box!important;border-radius:.75rem!important;border:1px solid hsl(240 4% 22%)!important;background:hsl(240 6% 10%)!important;color:#fff!important;font-weight:500!important;font-size:.875rem!important;cursor:pointer!important;box-shadow:none!important;}",
    ".source-button:hover,button[name^=source-]:hover{background:hsl(240 6% 14%)!important;border-color:hsl(240 4% 30%)!important;}",
    ".source-button img,.source-button .pf-c-button__icon,.source-button i.fas,.source-button i.fab,button[name^=source-] img,button[name^=source-] .pf-c-button__icon,button[name^=source-] i.fas,button[name^=source-] i.fab{display:none!important;}",
    ".orc-src-icon,.orc-src-icon svg{width:1.15rem;height:1.15rem;display:block;flex-shrink:0}",
    ".orc-src-github svg{stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}",
    ".orc-src-google svg{stroke:none}",
    ".orc-src-label{font-size:.875rem;font-weight:500;color:inherit;line-height:1.2}",
    ".orc-field{position:relative;width:100%;max-width:100%;box-sizing:border-box}",
    ".orc-field-icon{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);width:1.05rem;height:1.05rem;color:hsl(270 20% 70%);pointer-events:none;z-index:1}",
    ".orc-field-icon svg{width:100%;height:100%;stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}",
    ".orc-field input.pf-c-form-control,.orc-field input[name=uidField],.orc-field input[name=username],.orc-field input[type=password]{padding-left:2.55rem!important;max-width:100%!important;box-sizing:border-box!important}",
    "button.pf-c-button.pf-m-primary:not(.source-button){display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:.45rem!important;border-radius:9999px!important;background:#7c3aed!important;color:#fff!important;border:0!important;font-weight:500!important;cursor:pointer!important;box-shadow:none!important;}",
    ".orc-submit-icon,.orc-submit-icon svg{width:1.05rem;height:1.05rem;display:block;flex-shrink:0}",
    ".orc-submit-icon svg{stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}",
    ".cf-turnstile,[id*=turnstile],.ak-captcha,ak-stage-captcha .captcha,[name=captcha]{margin:.75rem 0;display:flex;justify-content:center}"
  ].join("");

  function sourceKind(btn) {
    var bits = [
      btn.getAttribute("aria-label") || "",
      btn.getAttribute("name") || "",
      btn.getAttribute("title") || "",
      btn.textContent || "",
      typeof btn.className === "string" ? btn.className : String(btn.className || "")
    ];
    var imgs = btn.querySelectorAll ? btn.querySelectorAll("img") : [];
    for (var i = 0; i < imgs.length; i++) {
      bits.push(imgs[i].getAttribute("src") || "");
      bits.push(imgs[i].getAttribute("alt") || "");
    }
    var blob = bits.join(" ").toLowerCase();
    if (blob.indexOf("github") >= 0) return "github";
    if (blob.indexOf("google") >= 0) return "google";
    return null;
  }
  function hideNativeSourceIcons(btn) {
    var els = btn.querySelectorAll("img, .pf-c-button__icon, i.fas, i.fab");
    for (var i = 0; i < els.length; i++) {
      els[i].style.display = "none";
      els[i].setAttribute("aria-hidden", "true");
    }
  }
  function sourceHasVisibleText(btn) {
    var text = "";
    function walk(n) {
      if (!n) return;
      if (n.nodeType === 3) { text += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      var tag = (n.tagName || "").toLowerCase();
      if (tag === "img" || tag === "svg" || tag === "i") return;
      var cls = typeof n.className === "string" ? n.className : String(n.className || "");
      if (cls.indexOf("orc-src-icon") >= 0 || cls.indexOf("pf-c-button__icon") >= 0) return;
      if (n.style && n.style.display === "none") return;
      var kids = n.childNodes;
      for (var i = 0; i < kids.length; i++) walk(kids[i]);
    }
    var kids = btn.childNodes;
    for (var i = 0; i < kids.length; i++) walk(kids[i]);
    return text.replace(/\s+/g, " ").trim().length > 0;
  }
  function wrapLoginField(input, iconHtml) {
    if (!input || !input.parentNode) return;
    var p = input.parentElement;
    while (p) {
      if (p.classList && p.classList.contains("orc-field")) return;
      p = p.parentElement;
    }
    var wrap = document.createElement("div");
    wrap.className = "orc-field";
    var ic = document.createElement("span");
    ic.className = "orc-field-icon";
    ic.setAttribute("aria-hidden", "true");
    ic.innerHTML = iconHtml;
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(ic);
    wrap.appendChild(input);
  }
  function decorateLogin(root, host) {
    if (!root || !host || !host.tagName) return;
    var tag = host.tagName.toLowerCase();
    if (tag !== "ak-stage-identification" && tag !== "ak-stage-password" && tag !== "ak-flow-executor" && tag !== "ak-stage-prompt" && tag !== "ak-stage-captcha") return;
    ensureStyle(root, "orc-login", LOGIN_CSS);
    var buttons = root.querySelectorAll ? root.querySelectorAll(".source-button, button[name^=source-]") : [];
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var kind = sourceKind(btn);
      if (!kind) continue;
      if (!btn.querySelector(".orc-src-icon")) {
        hideNativeSourceIcons(btn);
        var span = document.createElement("span");
        span.className = "orc-src-icon orc-src-" + kind;
        span.setAttribute("aria-hidden", "true");
        span.innerHTML = kind === "github" ? ICONS.github : ICONS.google;
        btn.insertBefore(span, btn.firstChild);
      }
      if (!btn.querySelector(".orc-src-label") && !sourceHasVisibleText(btn)) {
        var lab = document.createElement("span");
        lab.className = "orc-src-label";
        lab.textContent = kind === "github" ? "GitHub" : "Google";
        btn.appendChild(lab);
      }
    }
    var idInputs = root.querySelectorAll ? root.querySelectorAll("input[name=uidField], #ak-identifier-input, input[name=username], input[type=email]") : [];
    for (var j = 0; j < idInputs.length; j++) {
      var inp = idInputs[j];
      var t = (inp.getAttribute("type") || inp.type || "").toLowerCase();
      wrapLoginField(inp, t === "email" ? ICONS.mail : ICONS.user);
    }
    var pws = root.querySelectorAll ? root.querySelectorAll("input[type=password]") : [];
    for (var k = 0; k < pws.length; k++) wrapLoginField(pws[k], ICONS.lock);
    var submits = root.querySelectorAll ? root.querySelectorAll("button.pf-c-button.pf-m-primary, button[type=submit]") : [];
    for (var s = 0; s < submits.length; s++) {
      var sub = submits[s];
      var cls = typeof sub.className === "string" ? sub.className : String(sub.className || "");
      var nm = sub.getAttribute("name") || "";
      if (cls.indexOf("source-button") >= 0 || nm.indexOf("source-") === 0) continue;
      var isPrimary = cls.indexOf("pf-m-primary") >= 0;
      var isSubmit = (sub.getAttribute("type") || "").toLowerCase() === "submit";
      if (!isPrimary && !isSubmit) continue;
      if (sub.querySelector(".orc-submit-icon")) continue;
      var si = document.createElement("span");
      si.className = "orc-submit-icon";
      si.setAttribute("aria-hidden", "true");
      si.innerHTML = ICONS.arrow;
      sub.appendChild(si);
    }
  }


  var PAGE_FOOTER_CSS = [
    ".pf-c-login__footer,.pf-v5-c-login__footer,footer.pf-c-login__footer{grid-column:1/-1!important;justify-self:stretch!important;align-self:end!important;width:100%!important;display:flex!important;justify-content:center!important;align-items:center!important;text-align:center!important;padding:0.75rem 1rem 1.25rem!important;}",
    "ak-brand-links{display:flex!important;justify-content:center!important;align-items:center!important;width:100%!important;}",
    "ak-brand-links ul,ak-brand-links::part(list){display:flex!important;justify-content:center!important;align-items:center!important;width:100%!important;margin:0!important;padding:0!important;list-style:none!important;gap:.5rem!important;}",
    "ak-brand-links li,ak-brand-links::part(list-item){display:flex!important;justify-content:center!important;align-items:center!important;}",
    "ak-brand-links li:last-child{display:none!important;}",
    "ak-brand-links a,ak-brand-links::part(list-item-link){display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:.45rem!important;color:#e9d5ff!important;text-decoration:none!important;font-size:.8125rem!important;font-weight:500!important;}",
    "ak-brand-links a::before,ak-brand-links::part(list-item-link)::before{content:\"\"!important;display:block!important;width:18px!important;height:18px!important;flex-shrink:0;background:url(/branding/orca-logo-white.png) center / contain no-repeat!important;}"
  ].join("");
  function applyPageFooter() {
    ensureStyle(document, "orc-page-footer", PAGE_FOOTER_CSS);
  }

  function inject(root) {
    if (!root) return;
    watch(root);
    try { replaceSpinners(root); } catch (e) {}
    try { applyBrandHide(); } catch (e) {}
    try { applyPageFooter(); } catch (e) {}
    var flow = isFlowRoot(root);
    if (flow) {
      ensureStyle(root, "orc-flow-loader", FLOW_LOADER_CSS);
      try { decorateLogin(root, root.host); } catch (e) {}
    }
    if (!flow) {
      ensureStyle(root, "orc-shadow-theme", TAB_CSS);
      try { addIcons(root); } catch (e) {}
      if (root.querySelector && root.querySelector(".pf-c-table")) {
        ensureStyle(root, "orc-table", TABLE_CSS);
        try { labelTables(root); } catch (e) {}
        try { bindTableSelection(root, root.host); } catch (e) {}
      }
    }
    var host = root.host;
    if (host && host.tagName) {
      var tag = host.tagName.toLowerCase();
      if (tag === "ak-nav-buttons") { ensureStyle(root, "orc-nav", NAV_CSS); try { swapFa(root); } catch (e) {} }
      if (tag === "ak-library-impl" || tag === "ak-library") ensureStyle(root, "orc-lib", LIB_CSS);
      if (tag === "ak-tabs") { ensureStyle(root, "orc-tabs-mobile", TAB_CSS); try { addTabToggle(root, host); } catch (e) {} try { centerCollapsedNav(host); } catch (e) {} }
    }
    var nodes = root.querySelectorAll ? root.querySelectorAll("*") : [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].shadowRoot) inject(nodes[i].shadowRoot);
    }
  }


  var LOADER_JSON = "/branding/orcastra-loader.json?v=1";
  var LOADER_JS = "/branding/lottie_light.min.js?v=1";
  var loaderCbs = [];
  var loaderLoading = false;
  function withLottie(cb) {
    var L = window.lottie || window.bodymovin;
    if (L) { cb(L); return; }
    loaderCbs.push(cb);
    if (loaderLoading) return;
    loaderLoading = true;
    var s = document.createElement("script");
    s.src = LOADER_JS;
    s.onload = function () {
      var P = window.lottie || window.bodymovin;
      var q = loaderCbs.splice(0);
      for (var i = 0; i < q.length; i++) try { q[i](P); } catch (e) {}
    };
    (document.head || document.documentElement).appendChild(s);
  }
  function isMainLoader(sp) {
    if (!sp) return false;
    var cls0 = sp.className && sp.className.baseVal != null ? String(sp.className.baseVal) : String(sp.className || "");
    if (cls0.indexOf("pf-c-spinner") < 0 && (sp.getAttribute("role") !== "progressbar")) return false;
    var node = sp;
    var hops = 0;
    while (node && hops++ < 20) {
      var tag = (node.tagName || "").toLowerCase();
      var id = node.id || "";
      var cls = node.className && node.className.baseVal != null ? String(node.className.baseVal) : String(node.className || "");
      if (tag === "button" || cls.indexOf("pf-c-button") >= 0 || (node.getAttribute && node.getAttribute("type") === "submit")) return false;
      if (id === "ak-placeholder" || cls.indexOf("ak-c-placeholder") >= 0 || cls.indexOf("pf-c-empty-state") >= 0) return true;
      var next = node.parentNode;
      if ((!next || next.nodeType !== 1) && node.getRootNode) {
        var rn = node.getRootNode();
        if (rn && rn.host) {
          var ht = (rn.host.tagName || "").toLowerCase();
          if (ht === "ak-loading-overlay" || ht === "ak-empty-state" || ht.indexOf("ak-flow") === 0) return true;
          node = rn.host;
          continue;
        }
      }
      node = next;
    }
    return false;
  }
  function mountLottie(sp) {
    var parent = sp.parentNode;
    if (!parent) return;
    sp.setAttribute("style", "opacity:0!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important;");
    if (parent.querySelector && parent.querySelector(".orc-lottie")) return;
    var box = document.createElement("div");
    box.className = "orc-lottie";
    box.setAttribute("aria-hidden", "true");
    box.style.cssText = "width:70px;height:70px;margin:0 auto;display:block;";
    parent.insertBefore(box, sp);
    try { applyBrandHide(); } catch (e) {}
    withLottie(function (L) {
      if (!L || box.__orcAnim) return;
      box.__orcAnim = L.loadAnimation({
        container: box,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: LOADER_JSON
      });
    });
  }
  function replaceSpinners(root) {
    if (!root || !root.querySelectorAll) return;
    var ph = root.querySelector("#ak-placeholder, .ak-c-placeholder");
    if (ph) {
      var psp = ph.querySelector(".pf-c-spinner");
      if (psp) mountLottie(psp);
    }
    var list = root.querySelectorAll(".pf-c-spinner");
    for (var i = 0; i < list.length; i++) {
      if (isMainLoader(list[i])) mountLottie(list[i]);
    }
  }
  (function () {
    var css = "#ak-placeholder,.ak-c-placeholder{display:flex!important;align-items:center!important;justify-content:center!important;min-height:10rem!important;}#ak-placeholder .pf-c-spinner,.ak-c-placeholder .pf-c-spinner{opacity:0!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important;}";
    var s = document.createElement("style");
    s.id = "orc-loader";
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  })();

  function boot() {
    run();
    ["hashchange", "popstate", "pageshow"].forEach(function (ev) {
      window.addEventListener(ev, run);
    });
    document.addEventListener("ak-refresh", run, true);
    try {
      new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
    var n = 0;
    var t = setInterval(function () {
      run();
      if (++n > 80) clearInterval(t);
    }, 250);
    setInterval(run, 2000);
  }
  boot();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
})();
