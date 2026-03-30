/* ============================================================
   Isabel Bettinger — Portfolio
   Shared JavaScript
   ============================================================ */

// ─── Mobile Menu ───
function toggleMenu() {
  const hb = document.getElementById('hamburger');
  const mn = document.getElementById('mobile-nav');
  const isOpen = hb.classList.toggle('open');
  mn.classList.toggle('open');

  // Lock/unlock body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-nav').classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  const mn = document.getElementById('mobile-nav');
  const hb = document.getElementById('hamburger');
  if (mn && hb && mn.classList.contains('open')) {
    if (!mn.contains(e.target) && !hb.contains(e.target)) {
      closeMenu();
    }
  }
});

// ─── Tab Switching (Homepage) ───
function switchTab(name, btn) {
  // Deactivate all panels and buttons
  document.querySelectorAll('.tab-panel').forEach(function (p) {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });

  // Activate the selected panel and button
  var panel = document.getElementById('tab-' + name);
  if (panel) {
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
  }
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
}

// Keyboard navigation for tabs (arrow keys)
document.addEventListener('DOMContentLoaded', function () {
  var tabBar = document.querySelector('.tab-bar[role="tablist"]');
  if (tabBar) {
    tabBar.addEventListener('keydown', function (e) {
      var tabs = Array.from(tabBar.querySelectorAll('.tab-btn'));
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      var nextIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  }
});

// ─── Accordion (Homepage) ───
function toggleAc(btn) {
  var item = btn.closest('.ac-item');
  var body = item.querySelector('.ac-body');
  var isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.ac-item.open').forEach(function (i) {
    i.classList.remove('open');
    i.querySelector('.ac-body').style.maxHeight = '';
    i.querySelector('.ac-trigger').setAttribute('aria-expanded', 'false');
  });

  // Open clicked (if it was closed)
  if (!isOpen) {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ─── Scroll Reveal ───
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  });
} else {
  // Fallback: show everything if IntersectionObserver is not supported
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  });
}
