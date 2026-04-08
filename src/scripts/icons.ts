import {
  createElement,
  User,
  Code,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Folder,
  Sun,
  Moon,
  Clock,
  CircleX,
  Plug,
  Unplug,
  FileText,
} from 'lucide';
import type { IconNode, SVGProps } from 'lucide';

// Lucide dropped brand icons in v1.x — define LinkedIn inline
const LinkedinIcon: IconNode = [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9' }],
  ['circle', { cx: '4', cy: '4', r: '2' }],
];

const iconMap: Record<string, IconNode> = {
  user: User,
  code: Code,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  linkedin: LinkedinIcon,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  folder: Folder,
  sun: Sun,
  moon: Moon,
  clock: Clock,
  'circle-x': CircleX,
  plug: Plug,
  unplug: Unplug,
  'file-text': FileText,
};

/** Create an SVG element from an icon name */
export function createIcon(name: string, attrs?: SVGProps): SVGElement | null {
  const node = iconMap[name];
  if (!node) return null;
  return createElement(node, attrs);
}

/** Replace all `[data-lucide]` elements with SVGs */
export function renderIcons(root: HTMLElement = document.body): void {
  root.querySelectorAll<HTMLElement>('[data-lucide]').forEach((el) => {
    const name = el.getAttribute('data-lucide');
    if (!name) return;
    const svg = createIcon(name);
    if (!svg) return;
    svg.classList.add('lucide', `lucide-${name}`);
    el.classList.forEach((c) => svg.classList.add(c));
    el.parentNode?.replaceChild(svg, el);
  });
}
