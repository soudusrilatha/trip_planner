/* ========================================
   WanderPlan — Global Client-Side JS
   Common utilities used across all pages.
   ======================================== */

// Auto-dismiss flash messages after 4 seconds
document.addEventListener('DOMContentLoaded', () => {
  ['flash-success', 'flash-error'].forEach(id => {
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.remove(), 4000);
  });

  // Mobile nav toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mob-nav');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Plan-section fade-in animations (plan-trip page)
  document.querySelectorAll('.plan-section').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
    el.style.animationPlayState = 'running';
  });
});

// Password visibility toggle (login/register pages)
function togglePass(inputId = 'password', iconId = 'eye-icon') {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}
