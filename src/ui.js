import { esc } from "./utils.js?v=20260721-github-cache-1";

export function toast(message, type=""){
  const root = document.getElementById("toastRoot");
  const el = document.createElement("div");
  el.className = `toast ${type}`.trim();
  el.textContent = message;
  root.appendChild(el);
  setTimeout(()=>{ el.style.opacity = "0"; el.style.transform = "translateY(8px)"; }, 2800);
  setTimeout(()=>el.remove(), 3400);
}

export function setSync(status, text){
  const pill = document.getElementById("syncPill");
  if (!pill) return;
  const spin = ["loading","saving","unsaved"].includes(status) ? '<span class="spinner"></span>' : '';
  pill.className = `sync-pill ${status}`;
  pill.innerHTML = `${spin}<span>${esc(text)}</span>`;
}

export function modal(title, bodyHtml, actionsHtml=""){
  const root = document.getElementById("modalRoot");
  root.classList.remove("hidden");
  root.innerHTML = `<div class="modal"><div class="modal-head"><div><h2>${esc(title)}</h2></div><button class="ghost-btn" data-close-modal type="button">Close</button></div><div>${bodyHtml}</div>${actionsHtml?`<div class="button-row wrap" style="margin-top:14px">${actionsHtml}</div>`:""}</div>`;
  root.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click", closeModal));
  root.addEventListener("click", ev => { if (ev.target === root) closeModal(); }, {once:true});
  return root;
}
export function closeModal(){
  const root = document.getElementById("modalRoot");
  root.classList.add("hidden"); root.innerHTML = "";
}
