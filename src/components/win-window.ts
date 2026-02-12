import { createIcon } from '../scripts/icons';
import chromeStyles from './win-chrome.css?inline';
import styles from './win-window.css?inline';

const chromeSheet = new CSSStyleSheet();
chromeSheet.replaceSync(chromeStyles);

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement('template');
template.innerHTML = `
<header>
  <span class="title-icon" aria-hidden="true"></span>
  <h2 class="title-text" id="win-title"></h2>
  <div class="controls" role="group" aria-label="Window controls">
    <button class="btn-min" aria-label="Minimize"><span class="icon icon-min" aria-hidden="true"></span></button>
    <button class="btn-max" aria-label="Maximize"><span class="icon icon-max" aria-hidden="true"></span></button>
    <button class="btn-close" aria-label="Close"><span class="icon icon-close" aria-hidden="true"></span></button>
  </div>
</header>
<section class="body" role="region" aria-labelledby="win-title">
  <slot></slot>
</section>
`;

export class WinWindow extends HTMLElement {
  private maxIcon!: HTMLSpanElement;
  private maxBtn!: HTMLButtonElement;

  static get observedAttributes() {
    return ['title', 'icon'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [chromeSheet, sheet];
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const shadow = this.shadowRoot!;
    this.maxIcon = shadow.querySelector('.btn-max .icon')!;
    this.maxBtn = shadow.querySelector('.btn-max')!;

    this.updateTitle();
    this.updateIcon();

    shadow.querySelector('.btn-min')!.addEventListener('click', () => this.minimize());
    this.maxBtn.addEventListener('click', () => this.maximize());
    shadow.querySelector('.btn-close')!.addEventListener('click', () => this.close());
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this.updateTitle();
    this.updateIcon();
  }

  private updateTitle() {
    const el = this.shadowRoot?.querySelector('#win-title');
    if (el) el.textContent = this.getAttribute('title') ?? '';
  }

  private updateIcon() {
    const container = this.shadowRoot?.querySelector('.title-icon');
    if (!container) return;
    container.replaceChildren();
    const iconName = this.getAttribute('icon');
    if (iconName) {
      const svg = createIcon(iconName);
      if (svg) container.appendChild(svg);
    }
  }

  minimize() {
    if (this.classList.contains('fullscreen')) {
      this.classList.remove('fullscreen');
      this.maxIcon.className = 'icon icon-max';
      this.maxBtn.setAttribute('aria-label', 'Maximize');
    }
    this.toggleAttribute('minimized');
  }

  maximize() {
    if (this.hasAttribute('minimized')) {
      this.removeAttribute('minimized');
    }
    if (this.classList.contains('fullscreen')) {
      this.classList.remove('fullscreen');
      this.maxIcon.className = 'icon icon-max';
      this.maxBtn.setAttribute('aria-label', 'Maximize');
    } else {
      this.classList.add('fullscreen');
      this.maxIcon.className = 'icon icon-restore';
      this.maxBtn.setAttribute('aria-label', 'Restore');
    }
  }

  exitFullscreen() {
    if (this.classList.contains('fullscreen')) {
      this.classList.remove('fullscreen');
      this.maxIcon.className = 'icon icon-max';
      this.maxBtn.setAttribute('aria-label', 'Maximize');
    }
  }

  private close() {
    this.dispatchEvent(new CustomEvent('win-close', { bubbles: true, composed: true }));
  }
}

customElements.define('win-window', WinWindow);
