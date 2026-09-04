document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.case-tabs__trigger');
  const panels = document.querySelectorAll('.case-tabs__content');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.dataset.tab;

      triggers.forEach(t => {
        const isActive = t === trigger;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach(panel => {
        panel.classList.toggle('is-active', panel.dataset.panel === target);
      });
    });
  });
});
