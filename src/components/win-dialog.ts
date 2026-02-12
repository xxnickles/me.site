import { createIcon } from '../scripts/icons';
import chromeStyles from './win-chrome.css?inline';
import styles from './win-dialog.css?inline';

const ERROR_MESSAGES = [
  "This program has performed an illegal operation and will be shut down.\n\nJust kidding. You can't close me.",
  "Error 0x80004005: Unspecified error.\n\nNice try though.",
  "Are you sure? Just kidding, I don't care. Access Denied.",
  "FATAL EXCEPTION 0E at 0028:C001DC0F.\n\nNot really. I'm here to stay.",
  "This window is essential for system operation.\n\n(Translation: I'm not going anywhere.)",
  "Task failed successfully.\n\nThe window remains open.",
  "General Protection Fault in module RESUME.DLL.\n\nPlease enjoy the content instead.",
];

const chromeSheet = new CSSStyleSheet();
chromeSheet.replaceSync(chromeStyles);

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement('template');
template.innerHTML = `
<dialog role="alertdialog" aria-labelledby="dlg-title" aria-describedby="dlg-text">
  <article class="chrome">
    <header>
      <h3 class="title-text" id="dlg-title">System Error</h3>
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
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [chromeSheet, sheet];
    shadow.appendChild(template.content.cloneNode(true));
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
