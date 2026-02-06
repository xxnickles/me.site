const VERSION = __APP_VERSION__;

class TbVersion extends HTMLElement {
  connectedCallback() {
    this.textContent = VERSION;
  }
}

customElements.define('tb-version', TbVersion);
