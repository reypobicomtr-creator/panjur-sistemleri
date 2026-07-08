import type { MouseEvent } from 'react';

export function scrollToSection(e: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  e.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}
