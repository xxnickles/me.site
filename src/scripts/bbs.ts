import { SITE, type SiteData, type SkillGroup, type ExperienceEntry, type EducationEntry } from './site-data';

type SectionKey = 'about' | 'skills' | 'experience' | 'education' | 'contact' | 'all';

const SECTION_KEYS: readonly SectionKey[] = [
  'about',
  'skills',
  'experience',
  'education',
  'contact',
  'all',
] as const;

const NUM_KEY_MAP: Record<string, SectionKey> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'education',
  '5': 'contact',
  a: 'all',
  A: 'all',
};

const THEME_KEY = 'bbs-theme';

// ---------- DOM helpers ----------
const byId = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} not found`);
  return el as T;
};

type Child = Node | string | null | undefined | false;
type Attrs = Record<string, string | boolean | undefined>;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === undefined) continue;
    if (k === 'class') node.className = String(v);
    else if (v === true) node.setAttribute(k, '');
    else node.setAttribute(k, String(v));
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

function boldLabel(label: string, value: string): Node {
  const frag = document.createDocumentFragment();
  frag.append(el('b', {}, label), ' ', value);
  return frag;
}

// ========== THEME ==========
function initTheme(): () => void {
  const html = document.documentElement;
  const icon = byId('theme-icon');
  const label = byId('theme-label');

  const apply = (t: 'dark' | 'light'): void => {
    html.setAttribute('data-theme', t);
    icon.textContent = t === 'light' ? '☀' : '☽';
    label.textContent = t === 'light' ? 'LIGHT' : 'DARK';
    try { localStorage.setItem(THEME_KEY, t); } catch { /* ignore */ }
  };

  let saved: string | null = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch { /* ignore */ }
  if (saved === 'light' || saved === 'dark') apply(saved);
  else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) apply('light');
  else apply('dark');

  byId<HTMLButtonElement>('theme-toggle').addEventListener('click', () => {
    apply(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  return () => apply(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
}

// ========== BOOT ==========
function initBoot(): { onKick: (fn: () => void) => void } {
  const bootEl = byId('boot');
  const textEl = byId<HTMLPreElement>('boot-text');
  const screen = byId('screen');

  const lines = [
    'POST v4.21 — aflechas.me BIOS',
    'CPU: 1× Engineer @ 15+ yrs ........ OK',
    'MEM: TypeScript, C#, Angular, .NET . OK',
    'HDD: experience.log 6 entries ...... OK',
    'NET: LinkedIn / GitHub .............. LINK',
    '',
    'Loading aflechas.bbs .............. OK',
    '',
    'Welcome. Press any key to continue _',
  ];

  let i = 0;
  const step = (): void => {
    const line = lines[i];
    if (line === undefined) return;
    textEl.append(line + '\n');
    i++;
    setTimeout(step, i === 1 ? 300 : 100);
  };
  step();

  const listeners: Array<() => void> = [];
  let done = false;

  const finish = (): void => {
    if (done) return;
    done = true;
    setTimeout(() => {
      bootEl.hidden = true;
      screen.hidden = false;
      for (const fn of listeners) fn();
    }, 80);
  };

  setTimeout(finish, lines.length * 100 + 500);
  window.addEventListener('keydown', finish, { once: true });
  bootEl.addEventListener('click', finish, { once: true });

  return {
    onKick(fn) {
      if (done) fn();
      else listeners.push(fn);
    },
  };
}

// ========== BANNER ==========
function renderBanner(site: SiteData): void {
  const banner = byId('banner');
  banner.replaceChildren(
    '     _    _     _____  __  __\n',
    `    / \\  | |   | ____| \\ \\/ /      ${site.role}\n`,
    `   / _ \\ | |   |  _|    \\  /       ${site.location}\n`,
    `  / ___ \\| |___| |___   /  \\       ${site.yearsXp}+ yrs · EN/ES\n`,
    ` /_/   \\_\\_____|_____| /_/\\_\\      @ aflechas.me · 9600 baud\n`,
    el('span', { class: 'sub' }, '  ─── Flechas BBS ── running on alex.exe ───'),
  );
}

// ========== WHOIS ==========
function renderWhois(site: SiteData): void {
  byId('w-name').textContent = site.name;
  byId('w-role').textContent = site.role;
  byId('w-loc').textContent = site.location;
  byId('w-yrs').textContent = site.yearsXp + '+ years';
  byId('w-quote').textContent = `"${site.tagline}"`;
}

// ========== SECTION RENDER ==========
function panelEl(title: string, ...body: Child[]): HTMLElement {
  return el('section', { class: 'panel' }, el('h2', { class: 'ttl' }, title), ...body);
}

function aboutNode(site: SiteData): HTMLElement {
  return panelEl('ABOUT', el('p', {}, site.blurb));
}

function skillGroupTree(g: SkillGroup): HTMLElement {
  return el(
    'li',
    { class: 'sk-group' },
    el('h3', {}, g.group),
    el('ul', {}, ...g.items.map((i) => el('li', {}, i))),
  );
}

function skillGroupPara(g: SkillGroup): HTMLElement {
  const p = el('p', { class: 'items' });
  g.items.forEach((item, idx) => {
    if (idx) p.append(el('span', { class: 'sep' }, ' · '));
    p.append(item);
  });
  return el('li', { class: 'sk-group' }, el('h3', {}, g.group), p);
}

function skillsNode(site: SiteData): HTMLElement {
  const treeBtn = el(
    'button',
    {
      type: 'button', id: 'sv-tree-tab', role: 'tab',
      'aria-selected': 'true', 'aria-controls': 'sv-tree', 'data-view': 'tree',
    },
    '[ TREE ]',
  );
  const paraBtn = el(
    'button',
    {
      type: 'button', id: 'sv-para-tab', role: 'tab',
      'aria-selected': 'false', 'aria-controls': 'sv-para', 'data-view': 'para',
    },
    '[ LIST ]',
  );
  const tablist = el(
    'ul',
    { class: 'skills-view-sel', role: 'tablist', 'aria-label': 'Skills view' },
    el('li', { role: 'presentation' }, treeBtn),
    el('li', { role: 'presentation' }, paraBtn),
  );
  const tree = el(
    'ul',
    {
      class: 'skills-tree skills-view', id: 'sv-tree',
      role: 'tabpanel', 'aria-labelledby': 'sv-tree-tab',
    },
    ...site.skills.map(skillGroupTree),
  );
  const para = el(
    'ul',
    {
      class: 'skills-para skills-view', id: 'sv-para',
      role: 'tabpanel', 'aria-labelledby': 'sv-para-tab', hidden: true,
    },
    ...site.skills.map(skillGroupPara),
  );

  return panelEl('SKILLS MATRIX', tablist, tree, para);
}

function experienceNode(site: SiteData): HTMLElement {
  const boxes = site.experience.map((e: ExperienceEntry) =>
    el(
      'article',
      { class: 'box' },
      el('h3', { class: 'box-title' }, `\u00a0${e.company} ${e.flag}\u00a0`),
      el(
        'dl',
        { class: 'box-grid' },
        el('dt', {}, 'ROLE'), el('dd', {}, e.role),
        el('dt', {}, 'DATES'), el('dd', {}, e.period),
        el('dt', {}, 'STACK'), el('dd', {}, e.stack),
        el('dt', {}, 'NOTE'), el('dd', {}, e.note),
      ),
    ),
  );
  return panelEl('EMPLOYMENT LOG', ...boxes);
}

function educationNode(site: SiteData): HTMLElement {
  const boxes = site.education.map((e: EducationEntry) =>
    el(
      'article',
      { class: 'box' },
      el('h3', { class: 'box-title' }, `\u00a0${e.school} ${e.flag}\u00a0`),
      el(
        'dl',
        { class: 'box-grid' },
        el('dt', {}, 'DEGREE'), el('dd', {}, e.degree),
        el('dt', {}, 'DATES'), el('dd', {}, e.period),
      ),
    ),
  );
  return panelEl('EDUCATION', ...boxes);
}

function contactNode(site: SiteData): HTMLElement {
  const { linkedin, github, resume } = site.contact;
  const link = (href: string, text: string): HTMLAnchorElement =>
    el('a', { href, target: '_blank', rel: 'noopener' }, text);

  const dl = el(
    'dl',
    { class: 'box-grid', style: 'padding:4px 0' },
    el('dt', {}, 'linkedin'), el('dd', {}, link(linkedin, linkedin)),
    el('dt', {}, 'github'), el('dd', {}, link(github, github)),
    el('dt', {}, 'resume'), el('dd', {}, link(resume, 'README.md on GitHub')),
  );
  return panelEl('SEND MAIL', dl);
}

function wireSkillsTabs(container: HTMLElement): void {
  const sel = container.querySelector<HTMLUListElement>('.skills-view-sel');
  if (!sel) return;
  sel.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('button[data-view]');
    if (!btn) return;
    const view = btn.dataset['view'];
    if (view !== 'tree' && view !== 'para') return;
    sel.querySelectorAll<HTMLButtonElement>('button[data-view]').forEach((b) => {
      b.setAttribute('aria-selected', String(b === btn));
    });
    (['tree', 'para'] as const).forEach((k) => {
      const panelNode = container.querySelector<HTMLElement>(`#sv-${k}`);
      if (panelNode) panelNode.hidden = k !== view;
    });
  });
}

// ========== NAVIGATION ==========
interface NavApi {
  items: HTMLButtonElement[];
  gotoKey: (key: SectionKey) => void;
  clearSection: () => void;
}

function createNav(site: SiteData): NavApi {
  const content = byId('content');
  const hint = byId('hint');
  const lastCmd = byId('last-cmd');
  const items = Array.from(document.querySelectorAll<HTMLButtonElement>('.menu-item'));
  const menuRoot = document.querySelector<HTMLElement>('.menu');

  const render = (key: SectionKey): void => {
    content.replaceChildren();
    if (key === 'about' || key === 'all') content.append(aboutNode(site));
    if (key === 'skills' || key === 'all') content.append(skillsNode(site));
    if (key === 'experience' || key === 'all') content.append(experienceNode(site));
    if (key === 'education' || key === 'all') content.append(educationNode(site));
    if (key === 'contact' || key === 'all') content.append(contactNode(site));

    hint.hidden = true;
    lastCmd.replaceChildren(boldLabel('CMD:', key.toUpperCase()));

    wireSkillsTabs(content);

    if (menuRoot) {
      window.scrollTo({ top: menuRoot.offsetTop + 120, behavior: 'smooth' });
    }
  };

  const selectItem = (item: HTMLButtonElement): void => {
    items.forEach((i) => i.removeAttribute('aria-current'));
    item.setAttribute('aria-current', 'true');
    const go = item.dataset['go'] as SectionKey | undefined;
    if (go && SECTION_KEYS.includes(go)) render(go);
  };

  for (const item of items) {
    item.addEventListener('click', () => selectItem(item));
  }

  return {
    items,
    gotoKey(key) {
      const t = items.find((i) => i.dataset['go'] === key);
      if (t) selectItem(t);
    },
    clearSection() {
      content.replaceChildren();
      hint.hidden = false;
      items.forEach((i) => i.removeAttribute('aria-current'));
      lastCmd.replaceChildren(boldLabel('CMD:', '—'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  };
}

// ========== HELP DIALOG ==========
interface HelpApi {
  isOpen: () => boolean;
  toggle: () => void;
  close: () => void;
}

function initHelp(): HelpApi {
  const dlg = byId<HTMLDialogElement>('help-ov');
  const btn = byId<HTMLButtonElement>('help-btn');
  const closeBtn = byId<HTMLButtonElement>('help-close');

  const open = (): void => {
    if (!dlg.open) dlg.showModal();
  };
  const close = (): void => {
    if (dlg.open) dlg.close();
  };

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  dlg.addEventListener('click', (ev) => {
    if (ev.target === dlg) close();
  });
  // Native Esc fires `cancel` — suppress the default close so our keyboard
  // handler is the single code path, preventing Esc from also clearing the
  // section behind the modal.
  dlg.addEventListener('cancel', (ev) => {
    ev.preventDefault();
    close();
  });

  return {
    isOpen: () => dlg.open,
    toggle: () => (dlg.open ? close() : open()),
    close,
  };
}

// ========== KEYBOARD ==========
function initKeyboard(nav: NavApi, help: HelpApi, toggleTheme: () => void): void {
  window.addEventListener('keydown', (ev) => {
    const t = ev.target as HTMLElement | null;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

    if (help.isOpen()) {
      if (ev.key === '?' || ev.key === 'Escape') {
        ev.preventDefault();
        help.close();
      }
      return;
    }

    if (ev.key === '?') { ev.preventDefault(); help.toggle(); return; }
    if (ev.key === 'Escape') { ev.preventDefault(); nav.clearSection(); return; }
    if (ev.key === 't' || ev.key === 'T') { toggleTheme(); return; }

    if (
      ev.key === 'ArrowDown' || ev.key === 'ArrowUp' ||
      ev.key === 'ArrowLeft' || ev.key === 'ArrowRight'
    ) {
      ev.preventDefault();
      const curIdx = nav.items.findIndex((i) => i === document.activeElement);
      let next: number;
      if (curIdx === -1) next = 0;
      else if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight')
        next = (curIdx + 1) % nav.items.length;
      else next = (curIdx - 1 + nav.items.length) % nav.items.length;
      nav.items[next]?.focus();
      return;
    }

    const sec = NUM_KEY_MAP[ev.key];
    if (sec) {
      ev.preventDefault();
      nav.gotoKey(sec);
    }
  });
}

// ========== VERSION ==========
function renderVersion(): void {
  const host = document.getElementById('sys-ver');
  if (!host) return;

  const version = __APP_VERSION__;
  const hash = __GIT_HASH__;
  const repo = __REPO_URL__.replace(/\.git$/, '');
  const date = __BUILD_DATE__.slice(0, 10);

  const commitLink = el(
    'a',
    {
      href: `${repo}/commit/${hash}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      title: `Built ${date}`,
    },
    hash,
  );

  host.replaceChildren(el('b', {}, 'VER:'), ' ', `v${version} · `, commitLink);
}

// ========== CLOCK ==========
function initClock(): void {
  const el = byId('sys-time');
  const tick = (): void => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    el.replaceChildren(boldLabel('TIME:', `${h}:${m}:${s}`));
  };
  tick();
  setInterval(tick, 1000);
}

// ========== ENTRY ==========
export function initBBS(): void {
  const toggleTheme = initTheme();
  renderBanner(SITE);
  renderWhois(SITE);
  renderVersion();
  initClock();

  const boot = initBoot();
  boot.onKick(() => {
    const nav = createNav(SITE);
    const help = initHelp();
    initKeyboard(nav, help, toggleTheme);
  });
}
