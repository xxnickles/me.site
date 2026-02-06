import {
  createElement,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Linkedin,
  ChevronDown,
  ChevronRight,
  Folder,
  Sun,
  Moon,
  Clock,
  CircleX,
  Plug,
  Unplug,
} from 'lucide';
import type { IconNode, SVGProps } from 'lucide';

const iconMap: Record<string, IconNode> = {
  user: User,
  code: Code,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  linkedin: Linkedin,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  folder: Folder,
  sun: Sun,
  moon: Moon,
  clock: Clock,
  'circle-x': CircleX,
  plug: Plug,
  unplug: Unplug,
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
