import '../styles/global.css';
import '../components/win-window';
import '../components/win-dialog';
import '../components/tb-version';
import '../components/tb-theme';
import '../components/tb-clock';
import '../components/tb-status';
import { renderIcons } from './icons';
import { initTree } from './tree';
import { initTabs } from './tabs';
import type { WinDialog } from '../components/win-dialog';
import type { WinWindow } from '../components/win-window';

renderIcons();
initTree(document.getElementById('experience-tree'));
initTabs(document.getElementById('education-tabs'));

const dialog = document.querySelector<WinDialog>('win-dialog');

document.addEventListener('win-close', () => {
  dialog?.show();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll<WinWindow>('win-window').forEach((w) => {
      w.exitFullscreen();
    });
  }
});
