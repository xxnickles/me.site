const VERSION = __APP_VERSION__;
const BUILD_DATE = new Date(__BUILD_DATE__).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
const GIT_HASH = __GIT_HASH__;
const REPO_URL = 'https://github.com/xxnickles/me.site';

class TbVersion extends HTMLElement {
  connectedCallback() {
    const version = document.createElement('span');
    version.textContent = `v${VERSION}`;

    const date = document.createElement('span');
    date.title = 'Build date';
    date.textContent = BUILD_DATE;

    const commit = document.createElement('span');
    const link = document.createElement('a');
    link.href = `${REPO_URL}/commit/${GIT_HASH}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = GIT_HASH;
    commit.append(link);

    this.append(version, date, commit);
  }
}

customElements.define('tb-version', TbVersion);
