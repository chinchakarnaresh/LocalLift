// ===== LocalLift script =====

// ---- Data (kept in arrays so HTML stays short) ----
const services = [
  { icon:'📱', name:'Social Media Management', text:'We handle your Instagram and Facebook pages.' },
  { icon:'🎬', name:'Instagram Posts & Reels', text:'Posts and short reels made to reach more people.' },
  { icon:'✍️', name:'Content Creation', text:'Captions, graphics and ideas for every month.' },
  { icon:'📷', name:'Photo & Video Shoots', text:'We visit your shop and shoot fresh content.' },
  { icon:'📍', name:'Google Business Profile', text:'Keep your timings, photos and offers updated.' },
  { icon:'🎨', name:'Promotional Creatives', text:'Offer and festival posters for your customers.' },
  { icon:'⭐', name:'Review Management', text:'We help you reply to customer reviews.' },
  { icon:'📊', name:'Monthly Analytics', text:'A simple report so you know what is working.' }
];
const customers = {
  'Restaurants & Cafes':   'Show your menu, special dishes and offers with reels and photos.',
  'Salons & Barbershops':  'Post before/after work and keep your Google profile ready for bookings.',
  'Gyms':                  'Share workouts, member offers and your gym photos regularly.',
  'Car & Bike Detailing':  'Show your detailing results with reels and shoots.',
  'Interior Designers':    'Present completed projects and attract new enquiries.',
  'Coaching Classes':      'Promote batches, results and admission offers on social media.'
};

// ---- Build services cards ----
const grid = document.getElementById('servicesGrid');
services.forEach(s => {
  grid.innerHTML += `<div class="card reveal"><div class="icon">${s.icon}</div><h3>${s.name}</h3><p>${s.text}</p></div>`;
});

// ---- Build customer buttons + contact dropdown ----
const chips = document.getElementById('chips');
const infoBox = document.getElementById('infoBox');
const businessSelect = document.getElementById('business');
Object.keys(customers).forEach(type => {
  const btn = document.createElement('button');
  btn.className = 'chip'; btn.textContent = type;
  btn.onclick = () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    infoBox.innerHTML = `<b>${type}</b><br>${customers[type]}`;
  };
  chips.appendChild(btn);
  businessSelect.innerHTML += `<option>${type}</option>`;
});
businessSelect.innerHTML += '<option>Other</option>';

// ---- Mobile menu ----
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').onclick = () => navLinks.classList.toggle('open');
navLinks.querySelectorAll('a').forEach(a => a.onclick = () => navLinks.classList.remove('open'));

// ---- "Choose plan" buttons fill the form and scroll to it ----
document.querySelectorAll('.choose').forEach(btn => {
  btn.onclick = () => {
    document.getElementById('plan').value = btn.dataset.plan;
    document.getElementById('contact').scrollIntoView({ behavior:'smooth' });
  };
});

// ---- Scroll animation + highlight active nav link ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold:0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
  navLinks.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// ---- Form validation ----
function setError(id, msg) {
  document.getElementById(id + 'Err').textContent = msg;
  document.getElementById(id).classList.toggle('invalid', msg !== '');
  return msg === '';
}
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  let ok = true;
  ok = setError('name',  v('name').length < 3 ? 'Please enter your name (min 3 letters).' : '') && ok;
  ok = setError('phone', !/^[6-9]\d{9}$/.test(v('phone')) ? 'Enter a valid 10-digit mobile number.' : '') && ok;
  ok = setError('email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')) ? 'Enter a valid email address.' : '') && ok;
  ok = setError('business', v('business') === '' ? 'Please select your business type.' : '') && ok;
  ok = setError('plan', v('plan') === '' ? 'Please select a package.' : '') && ok;
  ok = setError('message', v('message').length < 10 ? 'Message should be at least 10 characters.' : '') && ok;
  const success = document.getElementById('success');
  if (ok) {
    success.textContent = `Thank you, ${v('name')}! We received your request for the ${v('plan')} package.`;
    e.target.reset();
  } else success.textContent = '';
});
