import { createIcon } from '../scripts/icons';

class TbClock extends HTMLElement {
  private interval: ReturnType<typeof setInterval> | null = null;
  private timeEl!: HTMLSpanElement;

  connectedCallback() {
    const iconEl = document.createElement('span');
    iconEl.setAttribute('aria-hidden', 'true');
    const icon = createIcon('clock');
    if (icon) iconEl.appendChild(icon);
    this.appendChild(iconEl);

    this.timeEl = document.createElement('span');
    this.appendChild(this.timeEl);

    this.update();
    this.interval = setInterval(() => this.update(), 60_000);
  }

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private update() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    this.timeEl.textContent = `${hour12}:${m} ${period}`;
    this.setAttribute('datetime', d.toISOString());
  }
}

customElements.define('tb-clock', TbClock);
