/* Ars Atomie shared code. Loaded by index, admin, simulation and lecture pages. */

/* theme is applied before anything renders, so there is no flash */
(function theme(){
  const KEY = "ars_theme";
  function current(){
    try{ const t = localStorage.getItem(KEY); if(t==="dark"||t==="light") return t; }catch(e){}
    try{ if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"; }catch(e){}
    return "light";
  }
  document.documentElement.dataset.theme = current();
})();

/* global error trap: a script problem is always shown on the page, never a silent blank */
(function errtrap(){
  function show(msg){
    try{
      let b = document.getElementById("ars_err");
      if(!b){
        b = document.createElement("div");
        b.id = "ars_err";
        b.style.cssText = "position:sticky;top:0;z-index:99;background:#0a0a0a;color:#fff;"
          + "padding:10px 16px;font-size:12.5px;font-family:ui-monospace,monospace;"
          + "white-space:pre-wrap;word-break:break-word";
        (document.body || document.documentElement).insertBefore(b, document.body ? document.body.firstChild : null);
      }
      b.textContent += (b.textContent ? "\n" : "") + msg;
    }catch(e){}
  }
  window.addEventListener("error", function(ev){
    show("Script error on this page: " + (ev && ev.message ? ev.message : "unknown")
      + (ev && ev.filename ? "\nFile: " + ev.filename + " line " + ev.lineno : ""));
  });
  window.addEventListener("unhandledrejection", function(ev){
    show("Background task failed: " + (ev && ev.reason ? ev.reason : "unknown"));
  });
})();

/* inject the icon sprite, base styles, theme toggle and data doctor */
(function inject(){
  const SPRITE = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">'
    + '<symbol id="i-logo" viewBox="0 0 24 24">'
    + '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">'
    + '<circle cx="12" cy="12" r="2.4"/>'
    + '<ellipse cx="12" cy="12" rx="9.4" ry="3.8"/>'
    + '<ellipse cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(60 12 12)"/>'
    + '<ellipse cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(-60 12 12)"/>'
    + '</g>'
    + '<g fill="currentColor" stroke="none">'
    + '<circle cx="21.4" cy="12" r="1.45"/>'
    + '<circle cx="7.3" cy="3.85" r="1.45"/>'
    + '<circle cx="7.3" cy="20.15" r="1.45"/>'
    + '</g>'
    + '</symbol>'
    + '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></symbol>'
    + '<symbol id="i-play" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></symbol>'
    + '<symbol id="i-book" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></symbol>'
    + '<symbol id="i-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>'
    + '<symbol id="i-folder" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></symbol>'
    + '<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></symbol>'
    + '<symbol id="i-external" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>'
    + '<symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></symbol>'
    + '<symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></symbol>'
    + '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>'
    + '<symbol id="i-chev-l" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>'
    + '<symbol id="i-chev-r" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>'
    + '<symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>'
    + '<symbol id="i-check-c" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="8 12.5 11 15.5 16 9.5"/></symbol>'
    + '<symbol id="i-x-c" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></symbol>'
    + '<symbol id="i-key" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></symbol>'
    + '<symbol id="i-rotate" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></symbol>'
    + '<symbol id="i-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>'
    + '<symbol id="i-edit" viewBox="0 0 24 24"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></symbol>'
    + '<symbol id="i-trash" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></symbol>'
    + '<symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>'
    + '<symbol id="i-upload" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></symbol>'
    + '<symbol id="i-chart" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></symbol>'
    + '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>'
    + '<symbol id="i-login" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></symbol>'
    + '<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></symbol>'
    + '<symbol id="i-sliders" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></symbol>'
    + '<symbol id="i-grad" viewBox="0 0 24 24"><path d="M2 9.5 12 4l10 5.5-10 5.5L2 9.5z"/><path d="M6 11.9V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.1"/><path d="M22 9.5V15"/></symbol>'
    + '<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></symbol>'
    + '<symbol id="i-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></symbol>'
    + '</svg>';

  const BASE_CSS = [
    '*,*::before,*::after{box-sizing:border-box}',

    /* ---------- light theme: pure black on white ---------- */
    ':root{--bg:#fafafa;--surface:#ffffff;--border:#e5e5e5;--ink:#0a0a0a;--muted:#6f6f6f;',
    '--primary:#0a0a0a;--primary-hover:#262626;--btn-ink:#ffffff;--primary-soft:#f4f4f5;',
    '--soft:#fafafa;--track:#f0f0f0;--hoverb:#d4d4d4;--doneb:#d4d4d4;--timerb:#d4d4d4;',
    '--hbg1:#f5f5f5;--hbg2:#f0f0f0;',
    '--ok:#0a0a0a;--ok-soft:#f4f4f5;--bad:#171717;--bad-soft:#f4f4f5;',
    '--headbg:rgba(255,255,255,.85);--overlay:rgba(0,0,0,.55);',
    '--radius:14px;',
    '--shadow:0 1px 2px rgba(0,0,0,.04)}',
    'html{color-scheme:light}',

    /* ---------- dark theme: pure white on black ---------- */
    'html[data-theme="dark"]{--bg:#0a0a0a;--surface:#141414;--border:#262626;--ink:#fafafa;--muted:#a3a3a3;',
    '--primary:#fafafa;--primary-hover:#d4d4d4;--btn-ink:#0a0a0a;--primary-soft:#1f1f1f;',
    '--soft:#0f0f0f;--track:#1f1f1f;--hoverb:#404040;--doneb:#333333;--timerb:#333333;',
    '--hbg1:#1a1a1a;--hbg2:#1f1f1f;',
    '--ok:#fafafa;--ok-soft:#1f1f1f;--bad:#d4d4d4;--bad-soft:#1f1f1f;',
    '--headbg:rgba(10,10,10,.85);--overlay:rgba(0,0,0,.7);',
    '--shadow:0 1px 2px rgba(0,0,0,.4)}',

    'body{margin:0;color:var(--ink);background:var(--bg);min-height:100vh;overflow-wrap:break-word;',
    "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}",
    'img{max-width:100%}',
    'header,main,footer{position:relative;z-index:1}',
    '.hidden{display:none!important}',

    'header{position:sticky;top:0;z-index:20;background:var(--headbg);backdrop-filter:blur(8px);',
    'border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;padding:10px 20px}',
    '.brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:var(--ink)}',
    '.bt{display:flex;flex-direction:column;line-height:1.25}',
    '.brand-name{font-weight:800;font-size:17px;letter-spacing:-.02em}',
    '.brand-sub{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:1px}',
    '.nav{display:flex;gap:6px;align-items:center;flex-wrap:wrap}',
    '.navlink{font-size:14px;font-weight:600;color:var(--muted);text-decoration:none;padding:8px 14px;border-radius:99px;transition:.15s}',
    '.navlink:hover{background:var(--hbg2);color:var(--ink)}',
    '.navlink.cur{background:var(--primary);color:var(--btn-ink)}',

    /* the plain SVG mark: inverted tile, monochrome */
    '.mark{width:36px;height:36px;border-radius:10px;background:var(--primary);color:var(--btn-ink);',
    'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.mark .ic{width:21px;height:21px;stroke-width:1.7}',
    '.mark.big{width:88px;height:88px;border-radius:22px}',
    '.mark.big .ic{width:50px;height:50px;stroke-width:1.25}',

    '.btn{display:inline-flex;align-items:center;gap:7px;background:var(--surface);border:1px solid var(--border);',
    'border-radius:9px;padding:9px 15px;font-size:14px;font-weight:600;color:var(--ink);font-family:inherit;',
    'cursor:pointer;text-decoration:none;transition:.15s}',
    '.btn:hover{border-color:var(--ink);transform:translateY(-1px)}',
    '.btn.primary{background:var(--primary);border-color:var(--primary);color:var(--btn-ink)}',
    '.btn.primary:hover{background:var(--primary-hover);border-color:var(--primary-hover);transform:translateY(-1px)}',
    '.btn.danger{color:var(--ink)}',
    '.btn.danger:hover{border-color:var(--ink);background:var(--hbg1)}',
    '.btn.small{padding:5px 10px;font-size:13px;border-radius:8px}',
    '.btn:disabled{opacity:.4;cursor:not-allowed;transform:none}',
    '.themebtn{width:36px;height:36px;border-radius:99px;display:inline-flex;align-items:center;justify-content:center;',
    'background:var(--surface);border:1px solid var(--border);color:var(--muted);cursor:pointer;flex-shrink:0}',
    '.themebtn:hover{color:var(--ink);border-color:var(--ink)}',
    '.themebtn .ic{width:17px;height:17px}',

    '.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;',
    'margin-bottom:16px;box-shadow:var(--shadow)}',
    'input[type=text],input[type=number],input[type=password],textarea{width:100%;padding:10px 12px;',
    'border:1px solid var(--border);border-radius:9px;font:inherit;background:var(--surface);color:var(--ink)}',
    'input:focus,textarea:focus{outline:none;border-color:var(--ink);box-shadow:0 0 0 3px var(--primary-soft)}',
    'textarea{resize:vertical;min-height:64px}',
    '::placeholder{color:#a3a3a3}',
    'input[type=radio],input[type=checkbox]{accent-color:var(--primary)}',
    'label.field{display:block;margin:13px 0 5px;font-weight:600;font-size:13.5px}',
    '.muted{color:var(--muted)} .small{font-size:13px}',
    '.kicker{font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--muted)}',
    '.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}',
    'code{background:var(--primary-soft);color:var(--ink);padding:1px 6px;border-radius:5px;font-size:12.5px}',
    'svg.ic{width:16px;height:16px;flex-shrink:0;display:inline-block;vertical-align:middle;fill:none;',
    'stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    'svg.ic-lg{width:44px;height:44px;display:inline-block;fill:none;stroke:currentColor;stroke-width:1.7;',
    'stroke-linecap:round;stroke-linejoin:round}',
    '.katex-display{overflow-x:auto;overflow-y:hidden;margin:6px 0}',

    /* monochrome tiles: all former color classes map to the same neutral chip */
    '.tile{width:42px;height:42px;border-radius:10px;background:var(--primary-soft);color:var(--ink);',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid var(--border)}',
    '.tile .ic{width:19px;height:19px}',
    '.tile.indigo,.tile.teal,.tile.amber,.tile.violet{background:var(--primary-soft);color:var(--ink)}',
    '.pill{font-size:12px;font-weight:700;border-radius:99px;padding:3px 10px;white-space:nowrap;',
    'background:var(--primary-soft);color:var(--ink);border:1px solid var(--border)}',
    '.pill.teal,.pill.indigo{background:var(--primary-soft);color:var(--ink)}',
    '.empty{border:1.5px dashed var(--border);border-radius:12px;padding:26px 18px;text-align:center;',
    'color:var(--muted);font-size:13.5px;line-height:1.65}',
    '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;align-items:stretch}',
    '.gcard{display:flex;flex-direction:column;gap:10px;background:var(--surface);border:1px solid var(--border);',
    'border-radius:var(--radius);padding:18px;box-shadow:var(--shadow);transition:.15s;min-width:0}',
    '.gcard:hover{transform:translateY(-2px);border-color:var(--ink)}',
    '.chead{display:flex;gap:12px;align-items:center;min-width:0}',
    '.att{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:9px 2px;',
    'border-bottom:1px solid var(--border);font-size:14px}',
    '.att:last-child{border-bottom:none}',
    '.preview{background:var(--soft);border:1.5px dashed var(--border);border-radius:10px;padding:10px 13px;',
    'font-size:14.5px;margin-top:8px;overflow-x:auto}',
    '.tex-fallback{background:var(--primary-soft);padding:1px 5px;border-radius:5px;font-family:ui-monospace,monospace}',
    '.tip{display:flex;gap:10px;align-items:flex-start;background:var(--soft);border:1px solid var(--border);',
    'border-radius:10px;padding:11px 13px;font-size:13px;margin:0 0 14px;color:var(--muted)}',
    '.qitem{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--border);border-radius:12px;',
    'padding:12px 14px;margin-bottom:9px;background:var(--soft);flex-wrap:wrap}',

    /* data doctor modal */
    '.docmodal{position:fixed;inset:0;background:var(--overlay);z-index:70;display:flex;',
    'align-items:flex-start;justify-content:center;padding:6vh 16px}',
    '.docpanel{background:var(--surface);border:1px solid var(--border);border-radius:16px;width:100%;',
    'max-width:560px;box-shadow:0 30px 80px rgba(0,0,0,.35);overflow:hidden}',
    '.dochead{display:flex;justify-content:space-between;align-items:center;gap:10px;',
    'padding:14px 18px;border-bottom:1px solid var(--border)}',
    '.docrow{display:flex;justify-content:space-between;gap:12px;padding:9px 18px;font-size:13.5px;',
    'border-bottom:1px solid var(--border);flex-wrap:wrap}',
    '.docadvice{padding:13px 18px;font-size:13px;color:var(--muted);line-height:1.65}',
    '.docadvice b{color:var(--ink)}'
  ].join("");

  function h(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

  /* ---------- data status doctor ---------- */
  function openDoctor(){
    let m = document.getElementById("ars_doctor");
    if(!m){
      m = document.createElement("div");
      m.className = "docmodal"; m.id = "ars_doctor";
      m.innerHTML = '<div class="docpanel"><div class="dochead"><b>Data status</b>'
        + '<span class="row" style="gap:8px">'
        + '<button type="button" class="btn small" data-docfix>Repair data</button>'
        + '<button type="button" class="btn small" data-docclose><svg class="ic"><use href="#i-x"/></svg>Close</button></span></div>'
        + '<div data-docrows></div><div class="docadvice" data-docadvice></div></div>';
      document.body.appendChild(m);
      m.addEventListener("click", e=>{ if(e.target===m) m.classList.add("hidden"); });
      m.querySelector("[data-docclose]").onclick = ()=>m.classList.add("hidden");
      m.querySelector("[data-docfix]").onclick = ()=>{
        const ok = ARS.repair();
        fill(m);
        m.querySelector("[data-docfix]").textContent = ok ? "Repaired" : "Repair failed";
        setTimeout(()=>{ const b=m.querySelector("[data-docfix]"); if(b) b.textContent="Repair data"; }, 1600);
      };
      document.addEventListener("keydown", e=>{ if(e.key==="Escape") m.classList.add("hidden"); });
    }
    fill(m);
    m.classList.remove("hidden");
  }
  function fill(m){
    const st = ARS.storageStatus();
    const row = (k,v)=>'<div class="docrow"><span class="muted">'+k+'</span><b>'+v+'</b></div>';
    const addr = st.isFile ? "local file (file://)" : h(st.origin);
    m.querySelector("[data-docrows]").innerHTML =
      row("Page address", addr)
      + row("Browser storage", st.supported ? "Available" : "Blocked by the browser")
      + row("Saved Ars Atomie data", st.corrupt ? "Found but unreadable" : (st.hasKey ? "Found" : "Not found (empty)"))
      + row("Simulations / questions", st.sims+" / "+st.questions)
      + row("Lecture sections / materials", st.lectures+" / "+st.materials)
      + row("Student attempts", st.attempts)
      + row("Drive folder link", st.driveUrl ? "Set" : "Not set");
    let advice;
    if(!st.supported){
      advice = "This browser is blocking local storage for this page. Serve the folder with a tiny local server or host it online, then try again.";
    }else if(st.corrupt){
      advice = "Saved data exists but could not be read. Click <b>Repair data</b> above. If that does not help, re import a good backup in the admin page, or recreate the content.";
    }else if(!st.hasKey){
      advice = "<b>This page sees an empty database.</b> If the site is hosted and you published a data.js file, it will be loaded on the next full reload. If your content shows in the admin page, the two pages are not sharing storage: open every page in this same browser.";
    }else if(st.sims===0 && st.lectures===0){
      advice = "The database here contains no content yet. On a hosted site with a published data.js, reload once. Locally, log in to the admin page and create content. Click <b>Repair data</b> if you believe content is missing.";
    }else{
      advice = "Data is readable on this page. If something is still missing, click Refresh or reload the page.";
    }
    advice += "<br><br><b>Remember:</b> locally, this data lives only in this browser. On a hosted site, published content arrives via data.js, while attempts stay in each student's own browser.";
    m.querySelector("[data-docadvice]").innerHTML = advice;
  }

  function place(){
    if(document.getElementById("ars_sprite")) return;
    const holder = document.createElement("div");
    holder.innerHTML = SPRITE;
    const node = holder.firstChild;
    node.id = "ars_sprite";
    document.body.insertBefore(node, document.body.firstChild);
    const style = document.createElement("style");
    style.textContent = BASE_CSS;
    document.head.appendChild(style);

    /* theme toggle */
    const KEY = "ars_theme";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "themebtn";
    btn.title = "Switch theme";
    const setIcon = ()=>{
      const dark = document.documentElement.dataset.theme==="dark";
      btn.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-'+(dark?"sun":"moon")+'"/></svg>';
    };
    btn.onclick = ()=>{
      const next = document.documentElement.dataset.theme==="dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try{ localStorage.setItem(KEY, next); }catch(e){}
      setIcon();
    };
    setIcon();

    /* data status doctor */
    const docBtn = document.createElement("button");
    docBtn.type = "button";
    docBtn.className = "themebtn";
    docBtn.title = "Data status";
    docBtn.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-info"/></svg>';
    docBtn.onclick = openDoctor;

    const nav = document.querySelector("header .nav");
    if(nav){ nav.appendChild(btn); nav.appendChild(docBtn); }
    else{
      const hd = document.querySelector("header");
      if(hd){ hd.appendChild(btn); hd.appendChild(docBtn); }
      else{
        btn.style.cssText = docBtn.style.cssText = "position:fixed;top:10px;z-index:60";
        btn.style.right = "12px"; docBtn.style.right = "56px";
        document.body.appendChild(btn); document.body.appendChild(docBtn);
      }
    }
  }
  if(document.body){ place(); }
  else{ document.addEventListener("DOMContentLoaded", place); }
})();

const ARS = (function(){
  const DB_KEY = "ars_atomie_v2";
  const OLD_KEY = "olympiad_sim_v1";

  const el = id => document.getElementById(id);
  function esc(s){ return (s||"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function wire(id, evt, fn){ const n = el(id); if(n){ n.addEventListener(evt, fn); } }
  const icon = (name, cls) => '<svg class="'+(cls||"ic")+'" aria-hidden="true"><use href="#i-'+name+'"/></svg>';

  function texToHtml(src){
    if(src == null) return "";
    src = String(src);
    const plain = t => esc(t).replace(/\n/g,"<br>");
    const math = (t, display) => {
      if(window.katex){
        try{ return katex.renderToString(t, {displayMode:display, throwOnError:false, strict:false}); }
        catch(e){}
      }
      const d = display ? "$$" : "$";
      return '<code class="tex-fallback">'+esc(d+t+d)+'</code>';
    };
    let html = "", i = 0, last = 0;
    while(i < src.length){
      if(src[i] === "$"){
        const display = src[i+1] === "$";
        const delim = display ? "$$" : "$";
        const start = i + delim.length;
        const end = src.indexOf(delim, start);
        if(end !== -1 && end > start){
          html += plain(src.slice(last, i)) + math(src.slice(start, end), display);
          i = last = end + delim.length;
          continue;
        }
      }
      i++;
    }
    return html + plain(src.slice(last));
  }

  /* strict repair: every field is validated, junk is dropped, nothing can crash a renderer */
  function norm(db){
    if(!db || typeof db!=="object") db = {};
    db.sims = Array.isArray(db.sims) ? db.sims.filter(s=>s && typeof s==="object") : [];
    db.lectures = Array.isArray(db.lectures) ? db.lectures.filter(s=>s && typeof s==="object") : [];
    db.attempts = Array.isArray(db.attempts) ? db.attempts : [];
    db.driveUrl = (typeof db.driveUrl==="string") ? db.driveUrl : "";
    db.sims.forEach(s=>{
      if(!Array.isArray(s.questions)) s.questions = [];
      s.title = (typeof s.title==="string") ? s.title : "Untitled simulation";
    });
    db.lectures.forEach(s=>{
      if(!Array.isArray(s.items)) s.items = [];
      s.title = (typeof s.title==="string") ? s.title : "Untitled section";
    });
    return db;
  }
  function loadDB(){
    try{
      const d = JSON.parse(localStorage.getItem(DB_KEY));
      if(d && Array.isArray(d.sims)) return norm(d);
    }catch(e){}
    /* published content baked into the site via data.js */
    if(window.ARS_SEED && Array.isArray(window.ARS_SEED.sims)){
      const seeded = norm({
        sims: window.ARS_SEED.sims,
        lectures: window.ARS_SEED.lectures || [],
        attempts: [],
        driveUrl: window.ARS_SEED.driveUrl || ""
      });
      if(seeded.sims.length || seeded.lectures.length){
        saveDB(seeded);
        return seeded;
      }
    }
    try{
      const o = JSON.parse(localStorage.getItem(OLD_KEY));
      if(o && Array.isArray(o.questions) && o.questions.length){
        const db = norm({});
        db.sims = [{ id:1, title:o.title||"Olympiad Simulation", desc:"",
                     durationMin:o.durationMin||0, questions:o.questions }];
        db.attempts = (o.attempts||[]).map(a=>({ simId:1, simTitle:db.sims[0].title, name:a.name,
                     score:a.score, max:a.max, date:a.date, answers:a.answers||[] }));
        saveDB(db);
        return db;
      }
    }catch(e){}
    return norm({});
  }
  function saveDB(db){
    try{ localStorage.setItem(DB_KEY, JSON.stringify(norm(db))); return true; }
    catch(e){
      alert("Storage is full. Use smaller pictures, and share large lecture documents with a Drive link.");
      return false;
    }
  }
  function repair(){
    try{ return saveDB(loadDB()); }catch(e){ return false; }
  }
  function storageStatus(){
    let raw = null, supported = true;
    try{ raw = localStorage.getItem(DB_KEY); }catch(e){ supported = false; }
    let parsed = null, corrupt = false;
    if(raw){
      try{ parsed = JSON.parse(raw); }catch(e){ corrupt = true; }
    }
    let d = null;
    if(parsed && !corrupt){ try{ d = norm(parsed); }catch(e){ d = null; } }
    return {
      supported, hasKey: !!raw, corrupt,
      origin: location.origin || "file://",
      isFile: location.protocol === "file:",
      sims: d ? d.sims.length : 0,
      questions: d ? d.sims.reduce((a,s)=>a+s.questions.length,0) : 0,
      lectures: d ? d.lectures.length : 0,
      materials: d ? d.lectures.reduce((a,s)=>a+s.items.length,0) : 0,
      attempts: d ? d.attempts.length : 0,
      driveUrl: d ? d.driveUrl : ""
    };
  }

  /* favicon: the atom mark, white on black */
  (function favicon(){
    function apply(){
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        + '<rect width="64" height="64" rx="14" fill="#0a0a0a"/>'
        + '<g fill="none" stroke="#fafafa" stroke-width="3.1" stroke-linecap="round">'
        + '<circle cx="32" cy="32" r="4.5"/>'
        + '<ellipse cx="32" cy="32" rx="20.5" ry="8.2"/>'
        + '<ellipse cx="32" cy="32" rx="20.5" ry="8.2" transform="rotate(60 32 32)"/>'
        + '<ellipse cx="32" cy="32" rx="20.5" ry="8.2" transform="rotate(-60 32 32)"/>'
        + '</g>'
        + '<g fill="#fafafa">'
        + '<circle cx="52.5" cy="32" r="3"/>'
        + '<circle cx="21.75" cy="14.25" r="3"/>'
        + '<circle cx="21.75" cy="49.75" r="3"/>'
        + '</g></svg>';
      const f = document.createElement("link");
      f.rel = "icon"; f.type = "image/svg+xml";
      f.href = "data:image/svg+xml,"+encodeURIComponent(svg);
      document.head.appendChild(f);
    }
    if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", apply); }
    else{ apply(); }
  })();

  return { el, esc, wire, icon, texToHtml, loadDB, saveDB, storageStatus, repair };
})();