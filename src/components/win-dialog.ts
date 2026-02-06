import { createIcon } from '../scripts/icons';

const ERROR_MESSAGES = [
  "This program has performed an illegal operation and will be shut down.\n\nJust kidding. You can't close me.",
  "Error 0x80004005: Unspecified error.\n\nNice try though.",
  "Are you sure? Just kidding, I don't care. Access Denied.",
  "FATAL EXCEPTION 0E at 0028:C001DC0F.\n\nNot really. I'm here to stay.",
  "This window is essential for system operation.\n\n(Translation: I'm not going anywhere.)",
  "Task failed successfully.\n\nThe window remains open.",
  "General Protection Fault in module RESUME.DLL.\n\nPlease enjoy the content instead.",
];

const template = document.createElement('template');
template.innerHTML = `
<style>
  dialog {
    border: none;
    padding: 0;
    background: transparent;
    max-width: 420px;
    min-width: 300px;
    color: var(--win-text);

    &::backdrop {
      background: rgba(0,0,0,.35);
    }
    &[open] {
      animation: dialogPop .2s ease;
    }
  }

  @keyframes dialogPop {
    from { transform: scale(.92); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .chrome {
    background: var(--win-bg);
    border: 2px solid var(--win-border-color);
    box-shadow: var(--win-outset), 6px 6px 0 rgba(0,0,0,.25);
    color: var(--win-text);
  }

  header {
    background: var(--win-title-bg);
    color: var(--win-title-text);
    padding: 4px 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: .8rem;
    font-weight: 600;
    user-select: none;
    min-height: 24px;
  }

  h3 {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: inherit;
    font-weight: inherit;
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

  .icon-close { width: 10px; height: 10px; position: relative; }
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

  .dialog-body {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 20px 18px 14px;
    background: var(--win-surface);
    margin: 3px;
    margin-bottom: 0;
  }

  .dialog-icon {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }
  .dialog-icon svg {
    width: 32px;
    height: 32px;
    color: var(--win-error);
  }

  .dialog-text {
    margin: 0;
    font-size: .88rem;
    line-height: 1.5;
    white-space: pre-line;
  }

  footer {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px 18px 16px;
    background: var(--win-surface);
    margin: 0 3px 3px;
  }

  .dialog-btn {
    all: unset;
    padding: 4px 24px;
    background: var(--win-bg);
    box-shadow: var(--win-outset);
    font-family: inherit;
    font-size: .82rem;
    font-weight: 500;
    cursor: pointer;
    color: var(--win-text);
    min-width: 80px;
    height: 28px;
    text-align: center;

    &:active { box-shadow: var(--win-inset); }
    &.primary {
      outline: 1px dotted var(--win-text);
      outline-offset: -4px;
    }
  }
</style>

<dialog role="alertdialog" aria-labelledby="dlg-title" aria-describedby="dlg-text">
  <article class="chrome">
    <header>
      <h3 id="dlg-title">System Error</h3>
      <button class="btn-close" aria-label="Close dialog"><span class="icon-close" aria-hidden="true"></span></button>
    </header>
    <div class="dialog-body">
      <div class="dialog-icon" aria-hidden="true"></div>
      <p class="dialog-text" id="dlg-text"></p>
    </div>
    <footer>
      <button class="dialog-btn primary btn-ok" autofocus>OK</button>
    </footer>
  </article>
</dialog>
`;

export class WinDialog extends HTMLElement {
  private dialog!: HTMLDialogElement;
  private textEl!: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const shadow = this.shadowRoot!;
    this.dialog = shadow.querySelector('dialog')!;
    this.textEl = shadow.querySelector('.dialog-text')!;

    // Insert error icon
    const iconContainer = shadow.querySelector('.dialog-icon')!;
    const icon = createIcon('circle-x');
    if (icon) iconContainer.appendChild(icon);

    // Close handlers
    shadow.querySelector('.btn-close')!.addEventListener('click', () => this.dialog.close());
    shadow.querySelector('.btn-ok')!.addEventListener('click', () => this.dialog.close());

    // Backdrop click closes
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.dialog.close();
    });
  }

  show(message?: string) {
    const msg = message ?? ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]!;
    this.textEl.textContent = msg;
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }
}

customElements.define('win-dialog', WinDialog);
