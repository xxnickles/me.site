import { createIcon } from '../scripts/icons';
import { getTheme, setTheme } from '../scripts/theme';

class TbTheme extends HTMLElement {
  private iconEl!: HTMLSpanElement;

  connectedCallback() {
    this.iconEl = document.createElement('span');
    this.iconEl.setAttribute('aria-hidden', 'true');
    this.appendChild(this.iconEl);

    const label = document.createElement('span');
    label.textContent = 'Theme';
    this.appendChild(label);

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', () => this.toggle());
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });

    this.renderIcon();
  }

  private toggle() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    this.renderIcon();
  }

  private renderIcon() {
    const isDark = getTheme() === 'dark';
    this.iconEl.replaceChildren();
    const icon = createIcon(isDark ? 'moon' : 'sun');
    if (icon) this.iconEl.appendChild(icon);
    this.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  }
}

customElements.define('tb-theme', TbTheme);
