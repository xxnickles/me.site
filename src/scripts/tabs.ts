export function initTabs(container: HTMLElement | null): void {
  if (!container) return;

  const tabs = [...container.querySelectorAll<HTMLElement>('[role="tab"]')];
  const panels = [...container.querySelectorAll<HTMLElement>('[role="tabpanel"]')];

  function activate(index: number) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });
  }

  // Click handler
  container.addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
    if (!tab) return;
    const idx = tabs.indexOf(tab);
    if (idx >= 0) activate(idx);
  });

  // Keyboard navigation (Arrow keys, Home, End)
  container.addEventListener('keydown', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
    if (!tab) return;

    const idx = tabs.indexOf(tab);
    let next = idx;

    switch (e.key) {
      case 'ArrowRight':
        next = (idx + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (idx - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    activate(next);
    tabs[next]?.focus();
  });
}
