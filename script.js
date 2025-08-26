// Utility
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Mobile Menu Toggle
const navToggle = $('.nav-toggle');
const navMenu = $('.nav-menu');

// Toggle mobile menu
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a nav link
$$('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle') && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Year
$('#year').textContent = new Date().getFullYear();

// Smooth scroll for internal anchors
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Intersection reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in'); io.unobserve(e.target)}
  })
},{threshold:.15});
$$('.reveal').forEach(el=>io.observe(el));

// Lightbox
const lightbox = $('#lightbox');
const lbImg = $('#lightboxImg');
const lbCap = $('#lightboxCap');
$('#lightboxClose').addEventListener('click', ()=>{
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
});
$('#gallery').addEventListener('click', e=>{
  const fig = e.target.closest('figure');
  if(!fig) return;
  const img = fig.querySelector('img');
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = fig.querySelector('figcaption')?.textContent || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
});
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) $('#lightboxClose').click(); });

// Local file preview add to gallery (no upload server needed)
const fileInput = $('#fileInput');
fileInput?.addEventListener('change', ()=>{
  const gallery = $('#gallery');
  [...fileInput.files].forEach(file=>{
    const url = URL.createObjectURL(file);
    const fig = document.createElement('figure');
    fig.className = 'shot reveal in';
    fig.innerHTML = `<img src="${url}" alt="Uploaded screenshot"/><figcaption>${file.name}</figcaption>`;
    gallery.prepend(fig);
  })
  fileInput.value = '';
});

// Chat widget
const chatToggle = $('#chatToggle');
const chatPanel = $('#chatPanel');
const chatInput = $('#chatInput');
const chatSend = $('#chatSend');
const whatsappNumber = '254742582849';

chatToggle.addEventListener('click', ()=>{
  const open = chatPanel.hasAttribute('hidden');
  if(open){ chatPanel.removeAttribute('hidden'); chatToggle.setAttribute('aria-expanded','true'); } 
  else { chatPanel.setAttribute('hidden',''); chatToggle.setAttribute('aria-expanded','false'); }
});

$$('.chat-quick button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    chatInput.value = btn.dataset.msg;
    chatInput.focus();
  })
});

chatSend.addEventListener('click', ()=>{
  const msg = chatInput.value.trim() || 'Hi Tutor Shify! I need A+ help.';
  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(link, '_blank', 'noopener');
});

// Escape to close lightbox
window.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && lightbox.classList.contains('open')) $('#lightboxClose').click();
});
