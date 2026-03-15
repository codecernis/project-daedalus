// Navigation

var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

var sections = document.querySelectorAll('#about, #experience, #projects, #contact');
var navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  var current = '';

  sections.forEach(function(section) {
    var sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
    current = 'contact';
  }

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// Typewriter

var typedText = document.getElementById('typed-text');
var textToType = "Sciencing a brighter future through data.";
var charIndex = 0;

function typeWriter() {
  if (charIndex < textToType.length) {
    typedText.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

typeWriter();


// Neural Network Background

var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');
var nodeColor = '203, 166, 247';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var mouseX = -1000;
var mouseY = -1000;

canvas.parentElement.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', function() {
  mouseX = -1000;
  mouseY = -1000;
});

var nodes = [];
var numberOfNodes = 40;
var connectionDistance = 150;

for (var i = 0; i < numberOfNodes; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2 + 1,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseOffset: Math.random() * Math.PI * 2
  });
}

var time = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 1;

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    var dx = mouseX - node.x;
    var dy = mouseY - node.y;
    var mouseDist = Math.sqrt(dx * dx + dy * dy);
    if (mouseDist < 200) {
      node.x -= dx * 0.01;
      node.y -= dy * 0.01;
    }
  }

  for (var i = 0; i < nodes.length; i++) {
    for (var j = i + 1; j < nodes.length; j++) {
      var dx = nodes[i].x - nodes[j].x;
      var dy = nodes[i].y - nodes[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < connectionDistance) {
        var pulse = Math.sin(time * 0.03 + i + j) * 0.5 + 0.5;
        var opacity = (1 - distance / connectionDistance) * 0.25 * (0.5 + pulse * 0.5);
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = 'rgba(' + nodeColor + ', ' + opacity + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset);
    var currentRadius = node.radius + pulse * 0.5;
    var glowOpacity = 0.15 + pulse * 0.1;
    ctx.beginPath();
    ctx.arc(node.x, node.y, currentRadius + 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + nodeColor + ', ' + glowOpacity * 0.3 + ')';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + nodeColor + ', ' + (0.4 + pulse * 0.2) + ')';
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();


// Scroll Effects

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(function(section) {
  section.classList.add('reveal');
  observer.observe(section);
});

var progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var docHeight = document.body.scrollHeight - window.innerHeight;
  var scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
  progressBar.style.top = navbar.offsetHeight + 'px';
});

var backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Text Scramble

var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function scrambleElement(element, delay) {
  var originalText = element.getAttribute('data-text');
  var length = originalText.length;
  var duration = 600;
  var startTime = Date.now() + delay;

  function update() {
    var elapsed = Date.now() - startTime;
    if (elapsed < 0) { requestAnimationFrame(update); return; }
    var progress = elapsed / duration;
    if (progress >= 1) { element.textContent = originalText; return; }

    var result = '';
    for (var i = 0; i < length; i++) {
      if (originalText[i] === ' ') result += ' ';
      else if (i < length * progress) result += originalText[i];
      else result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }

    element.textContent = result;
    requestAnimationFrame(update);
  }

  update();
}


// Project Cards

var cards = document.querySelectorAll('.project-card');

cards.forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = (y - centerY) / centerY * -8;
    var rotateY = (x - centerX) / centerX * 8;
    card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
  });

  card.addEventListener('mouseleave', function() {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

document.querySelectorAll('.project-card').forEach(function(card) {
  var title = card.querySelector('.project-title');
  var techs = card.querySelectorAll('.project-tech span');

  title.setAttribute('data-text', title.textContent);
  techs.forEach(function(tech) { tech.setAttribute('data-text', tech.textContent); });

  card.addEventListener('mouseenter', function() {
    scrambleElement(title, 0);
    techs.forEach(function(tech, i) { scrambleElement(tech, 100 + i * 50); });
  });
});


// Experience Solar System

var solarCanvas = document.getElementById('solarCanvas');
var solarCtx = solarCanvas.getContext('2d');
var expCard = document.getElementById('exp-card');
var solarDpr = window.devicePixelRatio || 1;
var SW, SH, sunCenterX, sunCenterY;

function resizeSolarCanvas() {
  var rect = solarCanvas.parentElement.getBoundingClientRect();
  solarCanvas.width = rect.width * solarDpr;
  solarCanvas.height = rect.height * solarDpr;
  solarCanvas.style.width = rect.width + 'px';
  solarCanvas.style.height = rect.height + 'px';
  solarCtx.setTransform(solarDpr, 0, 0, solarDpr, 0, 0);
}

function updateSolarDimensions() {
  var rect = solarCanvas.parentElement.getBoundingClientRect();
  SW = rect.width;
  SH = rect.height;
  sunCenterX = SW * 0.5;
  sunCenterY = SH * 0.48;
}

resizeSolarCanvas();
updateSolarDimensions();
window.addEventListener('resize', function() { resizeSolarCanvas(); updateSolarDimensions(); });

var expPlanets = [
  { name: 'mSix&Partners', role: 'Data Strategist', type: 'Internship', date: 'Oct 2021 — Jan 2022', desc: "Rolled out DuitNow QR cashless payments nationwide for PayNet — which involved analysing post-COVID adoption across 100+ merchants and pretending I wasn't terrified of presenting to blue-chip clients like Celcom and Maybank. Also built a virtual showroom web app for Sime Darby Properties. My first time building something that actual humans used, which was both exciting and mildly concerning.", color: '205, 214, 244', size: 8, orbitA: 0.16, orbitB: 0.28, speed: 0.003, angle: 0.8, hasMoon: false },
  { name: 'MISHU', role: 'Data Analyst', type: 'Internship', date: 'Jan 2023 — Apr 2023', desc: "Drove a 20% bump in web traffic and 30% improvement in client retention through data-driven marketing strategies using HubSpot and PowerBI. Built dashboards that turned messy CRM data into something leadership could actually read. My first role where the numbers I pulled on a Tuesday directly changed what the business did on a Wednesday.", color: '0, 172, 188', size: 9, orbitA: 0.26, orbitB: 0.42, speed: 0.002, angle: 3.5, hasMoon: false },
  { name: 'PETRONAS', role: 'Junior Executive', type: 'PROTEGE-GEES Programme', date: 'Jul 2024 — Dec 2024', desc: "Audited 50+ Data & AI initiatives for governance compliance, which is corporate speak for 'made sure nobody's AI project was secretly going off the rails.' Built a custom Access database to centralise oversight, and deployed a company-wide PowerApps dashboard that gave 8 stakeholders real-time project visibility. Achieved 100% compliance with internal standards — which sounds boring until you realise what happens when you don't.", color: '0, 171, 160', size: 14, orbitA: 0.36, orbitB: 0.58, speed: 0.0014, angle: 1.9, hasMoon: true, moonOrbit: 24, moonSpeed: 0.015 },
  { name: 'United Overseas Bank', role: 'Business Analyst', type: 'FSTEP Trainee', date: 'Jan 2025 — Jan 2026', desc: "Built Python automation frameworks for treasury transactions worth more than I'll ever see in my bank account — we're talking RM 100 million+ deals. Cut manual processing time by 50% and reduced operational risk in the process. Also engineered custom Murex tracking modules for Global Markets data reconciliation. The role where I learned that in banking, 'move fast and break things' is not a philosophy anyone appreciates.", color: '0, 91, 171', size: 17, orbitA: 0.46, orbitB: 0.78, speed: 0.001, angle: 5.2, hasMoon: true, moonOrbit: 28, moonSpeed: 0.012 }
];

var activeExp = 0;
var solarTime = 0;
var expShipX, expShipY, expTargetX, expTargetY;
var expShipAngle = 0;
var expShipTrail = [];

var bgStars = [];
for (var i = 0; i < 70; i++) { bgStars.push({ x: Math.random(), y: Math.random(), size: Math.random() * 1 + 0.2, twinkleSpeed: Math.random() * 0.02 + 0.005, twinkleOffset: Math.random() * Math.PI * 2 }); }

function getExpPlanetPos(p, t) { var a = Math.min(SW, SH) * p.orbitA; var b = Math.min(SW, SH) * p.orbitB; var angle = p.angle + t * p.speed; return { x: sunCenterX + Math.cos(angle) * b, y: sunCenterY + Math.sin(angle) * a }; }

function initExpShip() { var pos = getExpPlanetPos(expPlanets[0], solarTime); expShipX = pos.x; expShipY = pos.y; expTargetX = pos.x; expTargetY = pos.y; }

expCard.classList.add('visible');
document.getElementById('exp-company').style.color = 'rgb(' + expPlanets[0].color + ')';
expCard.style.borderColor = 'rgba(' + expPlanets[0].color + ', 0.3)';

solarCanvas.addEventListener('click', function(e) {
  var rect = solarCanvas.getBoundingClientRect();
  var mx = e.clientX - rect.left;
  var my = e.clientY - rect.top;

  for (var i = 0; i < expPlanets.length; i++) {
    var pos = getExpPlanetPos(expPlanets[i], solarTime);
    var dx = mx - pos.x;
    var dy = my - pos.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < expPlanets[i].size + 20) {
      activeExp = i;
      expShipTrail = [];
      expCard.classList.remove('visible');
      setTimeout(function() {
        var p = expPlanets[activeExp];
        document.getElementById('exp-company').textContent = p.name;
        document.getElementById('exp-company').style.color = 'rgb(' + p.color + ')';
        document.getElementById('exp-type').textContent = p.type;
        document.getElementById('exp-role').textContent = p.role;
        document.getElementById('exp-date').textContent = p.date;
        document.getElementById('exp-desc').textContent = p.desc;
        expCard.style.borderColor = 'rgba(' + p.color + ', 0.3)';
        expCard.classList.add('visible');
      }, 350);
      break;
    }
  }
});

function drawSolarSystem() {
  solarCtx.clearRect(0, 0, SW, SH);
  solarTime += 1;

  for (var i = 0; i < bgStars.length; i++) { var s = bgStars[i]; var twinkle = Math.sin(solarTime * s.twinkleSpeed + s.twinkleOffset) * 0.25 + 0.3; solarCtx.beginPath(); solarCtx.arc(s.x * SW, s.y * SH, s.size, 0, Math.PI * 2); solarCtx.fillStyle = 'rgba(205, 214, 244, ' + twinkle + ')'; solarCtx.fill(); }

  var sunRadius = 28;
  var sunPulse = Math.sin(solarTime * 0.015) * 3;

  var sunGlow3 = solarCtx.createRadialGradient(sunCenterX, sunCenterY, sunRadius, sunCenterX, sunCenterY, sunRadius + 50 + sunPulse); sunGlow3.addColorStop(0, 'rgba(249, 226, 175, 0.06)'); sunGlow3.addColorStop(1, 'rgba(249, 226, 175, 0)'); solarCtx.beginPath(); solarCtx.arc(sunCenterX, sunCenterY, sunRadius + 50 + sunPulse, 0, Math.PI * 2); solarCtx.fillStyle = sunGlow3; solarCtx.fill();
  var sunGlow2 = solarCtx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.5, sunCenterX, sunCenterY, sunRadius + 25 + sunPulse); sunGlow2.addColorStop(0, 'rgba(250, 179, 135, 0.12)'); sunGlow2.addColorStop(1, 'rgba(250, 179, 135, 0)'); solarCtx.beginPath(); solarCtx.arc(sunCenterX, sunCenterY, sunRadius + 25 + sunPulse, 0, Math.PI * 2); solarCtx.fillStyle = sunGlow2; solarCtx.fill();
  var sunGrad = solarCtx.createRadialGradient(sunCenterX - sunRadius * 0.3, sunCenterY - sunRadius * 0.3, sunRadius * 0.1, sunCenterX, sunCenterY, sunRadius); sunGrad.addColorStop(0, '#f9e2af'); sunGrad.addColorStop(0.4, '#fab387'); sunGrad.addColorStop(1, '#e8834a'); solarCtx.beginPath(); solarCtx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2); solarCtx.fillStyle = sunGrad; solarCtx.fill();
  solarCtx.beginPath(); solarCtx.arc(sunCenterX - sunRadius * 0.2, sunCenterY - sunRadius * 0.2, sunRadius * 0.3, 0, Math.PI * 2); solarCtx.fillStyle = 'rgba(255, 255, 255, 0.12)'; solarCtx.fill();
  solarCtx.font = '12px JetBrains Mono'; solarCtx.fillStyle = 'rgba(249, 226, 175, 0.8)'; solarCtx.textAlign = 'center'; solarCtx.fillText('Data', sunCenterX, sunCenterY + sunRadius + 18); solarCtx.textAlign = 'start';

  for (var i = 0; i < expPlanets.length; i++) { var p = expPlanets[i]; var a = Math.min(SW, SH) * p.orbitA; var b = Math.min(SW, SH) * p.orbitB; solarCtx.beginPath(); solarCtx.ellipse(sunCenterX, sunCenterY, b, a, 0, 0, Math.PI * 2); if (i === activeExp) { solarCtx.strokeStyle = 'rgba(' + p.color + ', 0.18)'; solarCtx.lineWidth = 1; } else { solarCtx.strokeStyle = 'rgba(88, 91, 112, 0.15)'; solarCtx.lineWidth = 0.5; } solarCtx.stroke(); }

  var planetPositions = [];
  for (var i = 0; i < expPlanets.length; i++) { var pos = getExpPlanetPos(expPlanets[i], solarTime); planetPositions.push({ index: i, x: pos.x, y: pos.y }); }
  planetPositions.sort(function(a, b) { return a.y - b.y; });

  for (var pi = 0; pi < planetPositions.length; pi++) {
    var idx = planetPositions[pi].index;
    var p = expPlanets[idx];
    var px = planetPositions[pi].x;
    var py = planetPositions[pi].y;

    if (p.hasMoon) { var moonAngle = solarTime * p.moonSpeed; var moonX = px + Math.cos(moonAngle) * p.moonOrbit; var moonY = py + Math.sin(moonAngle) * p.moonOrbit * 0.35; solarCtx.beginPath(); solarCtx.ellipse(px, py, p.moonOrbit, p.moonOrbit * 0.35, 0, 0, Math.PI * 2); solarCtx.strokeStyle = 'rgba(' + p.color + ', 0.12)'; solarCtx.lineWidth = 0.5; solarCtx.stroke(); solarCtx.beginPath(); solarCtx.arc(moonX, moonY, 2.5, 0, Math.PI * 2); solarCtx.fillStyle = 'rgba(' + p.color + ', 0.4)'; solarCtx.fill(); }

    var glowPulse = Math.sin(solarTime * 0.018 + idx * 1.5) * 2; var glowSize = p.size + 12 + glowPulse; var glow = solarCtx.createRadialGradient(px, py, p.size * 0.3, px, py, glowSize); glow.addColorStop(0, 'rgba(' + p.color + ', 0.15)'); glow.addColorStop(1, 'rgba(' + p.color + ', 0)'); solarCtx.beginPath(); solarCtx.arc(px, py, glowSize, 0, Math.PI * 2); solarCtx.fillStyle = glow; solarCtx.fill();

    solarCtx.beginPath(); solarCtx.arc(px, py, p.size, 0, Math.PI * 2); var pGrad = solarCtx.createRadialGradient(px - p.size * 0.3, py - p.size * 0.3, p.size * 0.1, px + p.size * 0.1, py + p.size * 0.1, p.size); pGrad.addColorStop(0, 'rgba(' + p.color + ', 1)'); pGrad.addColorStop(0.6, 'rgba(' + p.color + ', 0.75)'); pGrad.addColorStop(1, 'rgba(' + p.color + ', 0.3)'); solarCtx.fillStyle = pGrad; solarCtx.fill();

    solarCtx.beginPath(); solarCtx.arc(px - p.size * 0.25, py - p.size * 0.25, p.size * 0.22, 0, Math.PI * 2); solarCtx.fillStyle = 'rgba(255, 255, 255, 0.1)'; solarCtx.fill();

    if (idx === activeExp) { solarCtx.beginPath(); solarCtx.arc(px, py, p.size + 5, 0, Math.PI * 2); solarCtx.strokeStyle = 'rgba(' + p.color + ', 0.5)'; solarCtx.lineWidth = 1.5; solarCtx.setLineDash([3, 3]); solarCtx.stroke(); solarCtx.setLineDash([]); }

    solarCtx.font = '10px JetBrains Mono'; solarCtx.fillStyle = 'rgba(' + p.color + ', 0.65)'; solarCtx.textAlign = 'center'; solarCtx.fillText(p.name, px, py + p.size + 16); solarCtx.textAlign = 'start';
  }

  var activePos = getExpPlanetPos(expPlanets[activeExp], solarTime); expTargetX = activePos.x; expTargetY = activePos.y;
  var dx = expTargetX - expShipX; var dy = expTargetY - expShipY; var dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > expPlanets[activeExp].size + 8) { var speed = Math.min(dist * 0.03, 4.5); expShipX += (dx / dist) * speed; expShipY += (dy / dist) * speed; expShipAngle = Math.atan2(dy, dx); expShipTrail.push({ x: expShipX, y: expShipY, age: 0 }); if (expShipTrail.length > 20) expShipTrail.shift(); }
  else { var orbitDist = expPlanets[activeExp].size + 10; var orbitAngle = solarTime * 0.02; expShipX = activePos.x + Math.cos(orbitAngle) * orbitDist; expShipY = activePos.y + Math.sin(orbitAngle) * orbitDist * 0.6; expShipAngle = orbitAngle + Math.PI * 0.5; }

  for (var i = 0; i < expShipTrail.length; i++) { expShipTrail[i].age += 1; var alpha = (1 - expShipTrail[i].age / 45) * 0.3; var trailSize = 1.2 * (1 - i / expShipTrail.length); if (alpha > 0) { solarCtx.beginPath(); solarCtx.arc(expShipTrail[i].x, expShipTrail[i].y, trailSize, 0, Math.PI * 2); solarCtx.fillStyle = 'rgba(250, 179, 135, ' + alpha + ')'; solarCtx.fill(); } }

  solarCtx.save(); solarCtx.translate(expShipX, expShipY); solarCtx.rotate(expShipAngle);
  solarCtx.beginPath(); solarCtx.moveTo(8, 0); solarCtx.lineTo(-4, -3.5); solarCtx.lineTo(-1.5, 0); solarCtx.lineTo(-4, 3.5); solarCtx.closePath(); solarCtx.fillStyle = '#cdd6f4'; solarCtx.fill();
  solarCtx.beginPath(); solarCtx.moveTo(-4, -2.5); solarCtx.lineTo(-6.5, 0); solarCtx.lineTo(-4, 2.5); solarCtx.closePath(); solarCtx.fillStyle = 'rgba(137, 180, 250, 0.4)'; solarCtx.fill();
  if (dist > expPlanets[activeExp].size + 10) { solarCtx.beginPath(); solarCtx.moveTo(-1.5, 0); solarCtx.lineTo(-7 - Math.random() * 4, -1.5 + Math.random() * 3); solarCtx.lineTo(-5 - Math.random() * 2, 0); solarCtx.lineTo(-7 - Math.random() * 4, 1.5 - Math.random() * 3); solarCtx.closePath(); solarCtx.fillStyle = 'rgba(250, 179, 135, ' + (0.35 + Math.random() * 0.3) + ')'; solarCtx.fill(); }
  solarCtx.restore();

  requestAnimationFrame(drawSolarSystem);
}

initExpShip();
drawSolarSystem();


// Experience Card Effects

var expRole = document.getElementById('exp-role');
var expCompany = document.getElementById('exp-company');
expRole.setAttribute('data-text', expRole.textContent);
expCompany.setAttribute('data-text', expCompany.textContent);

expCard.addEventListener('mouseenter', function() {
  expRole.setAttribute('data-text', expRole.textContent);
  expCompany.setAttribute('data-text', expCompany.textContent);
  scrambleElement(expRole, 0);
  scrambleElement(expCompany, 100);
});

expCard.addEventListener('mousemove', function(e) {
  var rect = expCard.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var centerX = rect.width / 2;
  var centerY = rect.height / 2;
  var rotateX = (y - centerY) / centerY * -5;
  var rotateY = (x - centerX) / centerX * 5;
  expCard.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
});

expCard.addEventListener('mouseleave', function() {
  expCard.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
});


// Theme Toggle

var themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
  var isDark = document.body.classList.contains('dark');
  if (isDark) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    themeToggle.textContent = 'Dark';
    nodeColor = '136, 57, 239';
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light';
    nodeColor = '203, 166, 247';
  }
});


// Easter Egg

var konamiCode = ['h', 'e', 'l', 'l', 'o'];
var konamiIndex = 0;

document.addEventListener('keydown', function(e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) { konamiIndex = 0; launchConfetti(); }
  } else { konamiIndex = 0; }
});

function launchConfetti() {
  var colors = ['#f5e0dc', '#f2cdcd', '#f5c2e7', '#cba6f7', '#f38ba8', '#fab387', '#f9e2af', '#a6e3a1', '#94e2d5', '#89dceb', '#89b4fa', '#b4befe'];
  for (var i = 0; i < 150; i++) {
    var confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(confetti);
    animateConfetti(confetti);
  }
}

function animateConfetti(confetti) {
  var duration = Math.random() * 2000 + 2000;
  var delay = Math.random() * 1000;
  var spinSpeed = Math.random() * 720 - 360;
  var drift = Math.random() * 200 - 100;
  var startTime = Date.now() + delay;

  function update() {
    var elapsed = Date.now() - startTime;
    if (elapsed < 0) { requestAnimationFrame(update); return; }
    var progress = elapsed / duration;
    if (progress >= 1) { confetti.remove(); return; }
    var y = progress * (window.innerHeight + 40);
    var x = Math.sin(progress * Math.PI * 2) * drift;
    var rotation = progress * spinSpeed;
    var fade = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
    confetti.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + rotation + 'deg)';
    confetti.style.opacity = fade * (Math.random() * 0.3 + 0.7);
    requestAnimationFrame(update);
  }

  update();
}