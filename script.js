// Navbar Scroll Effect

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade Ins

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('section').forEach(function(section) {
  section.classList.add('reveal');
  observer.observe(section);
});

// Nav Highlighting

const sections = document.querySelectorAll('#about, #projects, #contact');
const navLinks = document.querySelectorAll('.nav-links a');

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

// Typewriter Effect

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

// Effects

var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var nodes = [];
var numberOfNodes = 40;
var connectionDistance = 150;
var mouseX = -1000;
var mouseY = -1000;
var nodeColor = '203, 166, 247';

canvas.parentElement.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', function() {
  mouseX = -1000;
  mouseY = -1000;
});

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

// Progress Bar

var progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var docHeight = document.body.scrollHeight - window.innerHeight;
  var scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
  progressBar.style.top = navbar.offsetHeight + 'px';
});

// Back to the Top

var backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//  Hover Effect

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

// Scramble

var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function scrambleElement(element, delay) {
  var originalText = element.getAttribute('data-text');
  var length = originalText.length;
  var duration = 600;
  var startTime = Date.now() + delay;

  function update() {
    var elapsed = Date.now() - startTime;
    if (elapsed < 0) {
      requestAnimationFrame(update);
      return;
    }
    var progress = elapsed / duration;

    if (progress >= 1) {
      element.textContent = originalText;
      return;
    }

    var result = '';
    for (var i = 0; i < length; i++) {
      if (originalText[i] === ' ') {
        result += ' ';
      } else if (i < length * progress) {
        result += originalText[i];
      } else {
        result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
    }

    element.textContent = result;
    requestAnimationFrame(update);
  }

  update();
}

document.querySelectorAll('.project-card').forEach(function(card) {
  var title = card.querySelector('.project-title');
  var techs = card.querySelectorAll('.project-tech span');

  title.setAttribute('data-text', title.textContent);
  techs.forEach(function(tech) {
    tech.setAttribute('data-text', tech.textContent);
  });

  card.addEventListener('mouseenter', function() {
    scrambleElement(title, 0);
    techs.forEach(function(tech, i) {
      scrambleElement(tech, 100 + i * 50);
    });
  });
});

// Light Mode & Dark Mode

var themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    themeToggle.textContent = 'Dark';
    nodeColor = '136, 57, 239';
  } else {
    themeToggle.textContent = 'Light';
    nodeColor = '203, 166, 247';
  }
});

// Konami Code

var konamiCode = ['h', 'e', 'l', 'l', 'o'];
var konamiIndex = 0;

document.addEventListener('keydown', function(e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      launchConfetti();
    }
  } else {
    konamiIndex = 0;
  }
});

function launchConfetti() {
  var colors = ['#f5e0dc', '#f2cdcd', '#f5c2e7', '#cba6f7', '#f38ba8', '#fab387', '#f9e2af', '#a6e3a1', '#94e2d5', '#89dceb', '#89b4fa', '#b4befe'];
  var confettiCount = 150;

  for (var i = 0; i < confettiCount; i++) {
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

    animateConfetti(confetti, i);
  }
}

function animateConfetti(confetti, index) {
  var duration = Math.random() * 2000 + 2000;
  var delay = Math.random() * 1000;
  var spinSpeed = Math.random() * 720 - 360;
  var drift = Math.random() * 200 - 100;
  var startTime = Date.now() + delay;

  function update() {
    var elapsed = Date.now() - startTime;
    if (elapsed < 0) {
      requestAnimationFrame(update);
      return;
    }

    var progress = elapsed / duration;

    if (progress >= 1) {
      confetti.remove();
      return;
    }

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