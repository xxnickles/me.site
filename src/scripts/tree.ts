export function initTree(container: HTMLElement | null): void {
  if (!container) return;

  container.addEventListener('click', (e) => {
    const header = (e.target as HTMLElement).closest('.tree-header');
    if (!header) return;

    const children = header.nextElementSibling as HTMLElement | null;
    if (!children) return;

    children.classList.toggle('collapsed');

    const chevron = header.querySelector('.chevron') as HTMLElement | null;
    if (chevron) {
      const collapsed = children.classList.contains('collapsed');
      chevron.setAttribute('data-lucide', collapsed ? 'chevron-right' : 'chevron-down');
    }
  });
}
