import { createIcon } from '../scripts/icons';

class TbStatus extends HTMLElement {
  private iconEl!: HTMLSpanElement;
  private tipEl!: HTMLDivElement;
  private onOnline = () => this.render();
  private onOffline = () => this.render();

  connectedCallback() {
    this.iconEl = document.createElement('span');
    this.iconEl.setAttribute('aria-hidden', 'true');
    this.appendChild(this.iconEl);

    this.tipEl = document.createElement('div');
    this.tipEl.setAttribute('popover', '');
    this.tipEl.className = 'tray-popover';
    this.appendChild(this.tipEl);

    this.addEventListener('mouseenter', this.showTip);
    this.addEventListener('mouseleave', this.hideTip);

    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);

    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  private render() {
    const online = navigator.onLine;
    this.iconEl.replaceChildren();
    const icon = createIcon(online ? 'plug' : 'unplug');
    if (icon) {
      if (!online) icon.classList.add('offline');
      this.iconEl.appendChild(icon);
    }
    this.tipEl.textContent = online ? 'Connected' : 'Disconnected';
    this.setAttribute('aria-label', online ? 'Connected' : 'Disconnected');
  }

  private showTip = () => {
    const rect = this.getBoundingClientRect();
    this.tipEl.style.left = `${rect.left}px`;
    this.tipEl.showPopover();
  };

  private hideTip = () => {
    this.tipEl.hidePopover();
  };
}

customElements.define('tb-status', TbStatus);
