import { createIcon } from '../scripts/icons';

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    background: var(--win-bg);
    border: 2px solid var(--win-border-color);
    box-shadow: var(--win-outset), 3px 3px 0 rgba(0,0,0,.15);
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    transition: background .4s, border-color .4s, box-shadow .4s;
    min-height: 0;
  }

  :host([minimized]) {
    grid-template-rows: auto 0fr;
    align-self: start;

    & .body { padding: 0; margin: 0; }
  }

  :host(.fullscreen) {
    position: fixed;
    inset: 0 0 40px;
    z-index: 150;
    box-shadow: none;
    border: none;

    & .body { margin: 0; }
  }

  header {
    background: var(--win-title-bg);
    color: var(--win-title-text);
    padding: 4px 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: .82rem;
    font-weight: 600;
    user-select: none;
    min-height: 26px;
    flex-shrink: 0;
  }

  header svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  h2 {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: inherit;
    font-weight: inherit;
  }

  .controls {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
  }

  button {
    width: 18px;
    height: 18px;
    background: var(--win-bg);
    border: none;
    box-shadow: var(--win-outset);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--win-text);
    cursor: pointer;
    padding: 0;
    position: relative;

    &:active { box-shadow: var(--win-inset); }
  }

  button .icon {
    width: 10px;
    height: 10px;
    position: relative;
  }

  /* CSS-drawn control icons */
  .icon-min::after {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 1px;
    right: 1px;
    height: 2px;
    background: var(--win-text);
  }

  .icon-max {
    border: 1px solid var(--win-text);
    border-top: 2px solid var(--win-text);
  }

  .icon-restore { width: 10px; height: 10px; }
  .icon-restore::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 7px;
    height: 7px;
    border: 1.5px solid var(--win-text);
    background: var(--win-bg);
  }
  .icon-restore::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 7px;
    height: 7px;
    border: 1.5px solid var(--win-text);
    background: var(--win-bg);
  }

  .icon-close { width: 10px; height: 10px; }
  .icon-close::before, .icon-close::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    background: var(--win-text);
  }
  .icon-close::before { transform: translate(-50%, -50%) rotate(45deg); }
  .icon-close::after  { transform: translate(-50%, -50%) rotate(-45deg); }

  .body {
    padding: 14px;
    background: var(--win-surface);
    margin: 3px;
    box-shadow: var(--win-inset);
    overflow: hidden;
    min-height: 0;
    transition: background .4s;
  }
</style>

<header>
  <span class="title-icon" aria-hidden="true"></span>
  <h2 id="win-title"></h2>
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
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    );
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
