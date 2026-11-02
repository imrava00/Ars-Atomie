/* Ars Atomie shared code. Static GitHub Pages edition.
   Content for visitors comes from data.js (window.ARS_SEED), re-read on every load.
   The admin edits a working copy in localStorage and publishes it via Export for GitHub. */

(function theme(){
  const KEY = "ars_theme";
  function current(){
    try{ const t = localStorage.getItem(KEY); if(t==="dark"||t==="light") return t; }catch(e){}
    try{ if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"; }catch(e){}
    return "light";
  }
  document.documentElement.dataset.theme = current();
})();

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
    show("Script error: " + (ev && ev.message ? ev.message : "unknown")
      + (ev && ev.filename ? "\nFile: " + ev.filename + " line " + ev.lineno : ""));
  });
  window.addEventListener("unhandledrejection", function(ev){
    show("Background task failed: " + (ev && ev.reason ? ev.reason : "unknown"));
  });
})();

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
    + '<circle cx="21.4" cy="12" r="1.45"/><circle cx="7.3" cy="3.85" r="1.45"/><circle cx="7.3" cy="20.15" r="1.45"/>'
    + '</g></symbol>'
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
    + '<symbol id="i-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>'
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
    ':root{--bg:#fafafa;--surface:#ffffff;--border:#e5e5e5;--ink:#0a0a0a;--muted:#6f6f6f;',
    '--primary:#0a0a0a;--primary-hover:#262626;--btn-ink:#ffffff;--primary-soft:#f4f4f5;',
    '--soft:#fafafa;--track:#f0f0f0;--hoverb:#d4d4d4;--timerb:#d4d4d4;',
    '--hbg1:#f5f5f5;--hbg2:#f0f0f0;',
    '--headbg:rgba(255,255,255,.85);--overlay:rgba(0,0,0,.55);',
    '--radius:14px;--shadow:0 1px 2px rgba(0,0,0,.04)}',
    'html{color-scheme:light}',
    'html[data-theme="dark"]{--bg:#0a0a0a;--surface:#141414;--border:#262626;--ink:#fafafa;--muted:#a3a3a3;',
    '--primary:#fafafa;--primary-hover:#d4d4d4;--btn-ink:#0a0a0a;--primary-soft:#1f1f1f;',
    '--soft:#0f0f0f;--track:#1f1f1f;--hoverb:#404040;--timerb:#333333;',
    '--hbg1:#1a1a1a;--hbg2:#1f1f1f;',
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
    '.btn.primary:hover{background:var(--primary-hover);border-color:var(--primary-hover)}',
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
    '.katex-display{overflow-x:auto;overflow-y:hidden;margin:6px 0}',
    '.tile{width:42px;height:42px;border-radius:10px;background:var(--primary-soft);color:var(--ink);',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid var(--border)}',
    '.tile .ic{width:19px;height:19px}',
    '.pill{font-size:12px;font-weight:700;border-radius:99px;padding:3px 10px;white-space:nowrap;',
    'background:var(--primary-soft);color:var(--ink);border:1px solid var(--border)}',
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
    '.docmodal{position:fixed;inset:0;background:var(--overlay);z-index:70;display:flex;',
    'align-items:flex-start;justify-content:center;padding:6vh 16px}',
    '.docpanel{background:var(--surface);border:1px solid var(--border);border-radius:16px;width:100%;',
    'max-width:560px;box-shadow:0 30px 80px rgba(0,0,0,.35);overflow:hidden}',
    '.dochead{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--border)}',
    '.docrow{display:flex;justify-content:space-between;gap:12px;padding:9px 18px;font-size:13.5px;border-bottom:1px solid var(--border);flex-wrap:wrap}',
    '.docadvice{padding:13px 18px;font-size:13px;color:var(--muted);line-height:1.65}',
    '.docadvice b{color:var(--ink)}'
  ].join("");

  function h(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

  function openDoctor(){
    let m = document.getElementById("ars_doctor");
    if(!m){
      m = document.createElement("div");
      m.className = "docmodal"; m.id = "ars_doctor";
      m.innerHTML = '<div class="docpanel"><div class="dochead"><b>Data status</b>'
        + '<button type="button" class="btn small" data-docclose><svg class="ic"><use href="#i-x"/></svg>Close</button></div>'
        + '<div data-docrows></div><div class="docadvice" data-docadvice></div></div>';
      document.body.appendChild(m);
      m.addEventListener("click", e=>{ if(e.target===m) m.classList.add("hidden"); });
      m.querySelector("[data-docclose]").onclick = ()=>m.classList.add("hidden");
      document.addEventListener("keydown", e=>{ if(e.key==="Escape") m.classList.add("hidden"); });
    }
    const st = ARS.status();
    const row = (k,v)=>'<div class="docrow"><span class="muted">'+k+'</span><b>'+v+'</b></div>';
    m.querySelector("[data-docrows]").innerHTML =
      row("Site mode", st.published ? "Published live site" : "Local editing")
      + row("data.js found", st.hasSeed ? "Yes" : "No")
      + row("Content shown to visitors", st.sims+" simulations · "+st.questions+" questions · "+st.lectures+" sections · "+st.materials+" materials")
      + row("Your working copy (editable)", st.workSims+" simulations · "+st.workLectures+" sections")
      + row("Attempts in this browser", st.attempts);
    let advice;
    if(st.published){
      advice = st.hasSeed
        ? "Visitors see exactly what is inside data.js, reloaded fresh on every visit. To change content: open admin, edit (or press Load published into editor first), click Export for GitHub, and upload the downloaded data.js to your repository."
        : "No data.js was found in the repository, so visitors see an empty site. In admin, click Export for GitHub and upload the file next to index.html.";
      advice += " Attempts are saved in each student's own browser only.";
    }else{
      advice = "You are in local editing mode. Build your content here, then click Export for GitHub and upload the data.js file to your repository so students can see it.";
    }
    m.querySelector("[data-docadvice]").innerHTML = advice;
    m.classList.remove("hidden");
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

    const KEY = "ars_theme";
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "themebtn"; btn.title = "Switch theme";
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

    const docBtn = document.createElement("button");
    docBtn.type = "button"; docBtn.className = "themebtn"; docBtn.title = "Data status";
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
  const WORK_KEY = "ars_work_v1";
  const OLD_KEY = "ars_atomie_v2";
  const ATT_KEY = "ars_attempts_v1";

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

  function normAll(o){
    o = (o && typeof o==="object") ? o : {};
    const sims = (Array.isArray(o.sims)?o.sims:[]).filter(s=>s&&typeof s==="object").map(s=>({
      id: s.id || Date.now(),
      title: (typeof s.title==="string" && s.title) ? s.title : "Untitled simulation",
      desc: (typeof s.desc==="string") ? s.desc : "",
      durationMin: Math.max(0, parseInt(s.durationMin)||0),
      questions: Array.isArray(s.questions) ? s.questions.filter(q=>q&&typeof q==="object") : []
    }));
    const lectures = (Array.isArray(o.lectures)?o.lectures:[]).filter(s=>s&&typeof s==="object").map(s=>({
      id: s.id || Date.now(),
      title: (typeof s.title==="string" && s.title) ? s.title : "Untitled section",
      desc: (typeof s.desc==="string") ? s.desc : "",
      items: Array.isArray(s.items) ? s.items.filter(it=>it&&typeof it==="object") : []
    }));
    return { sims, lectures, driveUrl:(typeof o.driveUrl==="string")?o.driveUrl:"" };
  }

  function isPublished(){
    if(location.protocol.indexOf("http")!==0) return false;
    const h = location.hostname;
    return h!=="localhost" && h!=="127.0.0.1";
  }
  function seed(){
    return (window.ARS_SEED && typeof window.ARS_SEED==="object") ? normAll(window.ARS_SEED) : null;
  }
  function readWork(){
    try{ return normAll(JSON.parse(localStorage.getItem(WORK_KEY))); }catch(e){ return normAll({}); }
  }
  function writeWork(c){
    try{ localStorage.setItem(WORK_KEY, JSON.stringify(normAll(c))); return true; }
    catch(e){ alert("Browser storage is full. Remove or shrink some pictures."); return false; }
  }
  function doMigrate(){
    try{ if(localStorage.getItem("ars_migrated_v1")==="1") return; }catch(e){}
    try{
      const o = JSON.parse(localStorage.getItem(OLD_KEY));
      if(o && typeof o==="object"){
        let sims = Array.isArray(o.sims)?o.sims:[];
        let lectures = Array.isArray(o.lectures)?o.lectures:[];
        if(!sims.length && Array.isArray(o.questions) && o.questions.length){
          sims = [{ id:1, title:o.title||"Olympiad Simulation", desc:"", durationMin:o.durationMin||0, questions:o.questions }];
        }
        const w = readWork();
        if(!w.sims.length && !w.lectures.length && (sims.length||lectures.length)){
          writeWork({ sims, lectures, driveUrl:o.driveUrl||"" });
        }
        let att = getAttempts();
        if(!att.length && Array.isArray(o.attempts) && o.attempts.length){
          try{ localStorage.setItem(ATT_KEY, JSON.stringify(o.attempts)); }catch(e){}
        }
      }
    }catch(e){}
    try{ localStorage.setItem("ars_migrated_v1","1"); }catch(e){}
  }

  /* content visitors see: on the published site always data.js (fresh every load);
     locally the working copy, falling back to a data.js in the same folder */
  function getContent(){
    const s = seed();
    if(isPublished()) return s || normAll({});
    doMigrate();
    const w = readWork();
    if(w.sims.length || w.lectures.length) return w;
    return s || w;
  }
  function mode(){ return isPublished() ? "published" : "local"; }
  function getWorking(){ doMigrate(); return readWork(); }
  function saveWorking(mut){
    const c = readWork(); mut(c); return writeWork(c);
  }
  function loadPublishedIntoEditor(){
    const s = seed();
    if(!s) return false;
    return writeWork(s);
  }

  function getAttempts(){
    try{ const a = JSON.parse(localStorage.getItem(ATT_KEY)); return Array.isArray(a)?a:[]; }
    catch(e){ return []; }
  }
  function saveAttempt(a){
    const list = getAttempts();
    list.push({ simId:a.simId, simTitle:a.simTitle||"", name:a.name||"Anonymous",
      score:a.score||0, max:a.max||0, date:a.date||new Date().toISOString(),
      answers:Array.isArray(a.answers)?a.answers:[] });
    try{ localStorage.setItem(ATT_KEY, JSON.stringify(list)); return true; }
    catch(e){ alert("This device's storage is full. Your score is shown but may not be saved."); return false; }
  }
  function deleteAttemptsWhere(pred){
    const list = getAttempts().filter(x=>!pred(x));
    try{ localStorage.setItem(ATT_KEY, JSON.stringify(list)); }catch(e){}
  }
  function clearAttemptsWhere(pred){
    let list = getAttempts();
    if(pred) list = list.filter(x=>!pred(x)); else list = [];
    try{ localStorage.setItem(ATT_KEY, JSON.stringify(list)); }catch(e){}
  }

  function buildDataJS(){
    const w = getWorking();
    return "/* Ars Atomie published content. Re upload this file to GitHub to update the live site. */\n"
      + "window.ARS_SEED = " + JSON.stringify({ sims:w.sims, lectures:w.lectures, driveUrl:w.driveUrl||"" }, null, 2) + ";\n";
  }

  function status(){
    const c = getContent(), w = getWorking(), s = seed();
    return {
      published: isPublished(), hasSeed: !!s,
      sims:c.sims.length, questions:c.sims.reduce((a,x)=>a+x.questions.length,0),
      lectures:c.lectures.length, materials:c.lectures.reduce((a,x)=>a+x.items.length,0),
      workSims:w.sims.length, workLectures:w.lectures.length,
      attempts:getAttempts().length
    };
  }

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
        + '<circle cx="52.5" cy="32" r="3"/><circle cx="21.75" cy="14.25" r="3"/><circle cx="21.75" cy="49.75" r="3"/>'
        + '</g></svg>';
      const f = document.createElement("link");
      f.rel = "icon"; f.type = "image/svg+xml";
      f.href = "data:image/svg+xml,"+encodeURIComponent(svg);
      document.head.appendChild(f);
    }
    if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", apply); }
    else{ apply(); }
  })();

  return { el, esc, wire, icon, texToHtml,
    getContent, mode, getWorking, saveWorking, loadPublishedIntoEditor, seed,
    getAttempts, saveAttempt, deleteAttemptsWhere, clearAttemptsWhere,
    buildDataJS, status };
})();