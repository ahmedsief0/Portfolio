<script>
// ---------- Smooth scroll with header offset (JS-only) ----------
(function () {
  // لو عندك هيدر ثابت فوق، عرّفه هنا
  const header = document.querySelector('header, nav'); // عدّل السلكتور لو هيدرك عنصر تاني
  const headerOffset = () => (header ? header.offsetHeight : 0);

  // دالة سكرول ناعم (polyfill) تشتغل في أي متصفح
  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const delta = targetY - startY;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + delta * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // اربط كل لينكات النّاف اللي بتبدأ بـ #
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return; // سيب اللينكات الفاضية
      const target = document.querySelector(hash);
      if (!target) return; // لو مفيش عنصر بالـ id ده، سيبها متعملش حاجة

      e.preventDefault();

      // احسب المكان النهائي مطروح منه ارتفاع الهيدر
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      smoothScrollTo(y, 650);
    });
  });
})();
</script>
