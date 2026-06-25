import type { ComponentType } from 'react';

export type ModuleStatus = 'live' | 'soon';

export interface ToolModule {
  id: string;
  label: string;
  icon: string;
  status: ModuleStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
}

// Import modules lazily to avoid circular issues at the registry level.
// Add a new module: one entry here + one component file. That's it.
import { CreativeReview } from './creative-review';
import { EmailHub } from './email-hub';
import { EobBrief } from './eob-brief';
import { ComingSoon } from './coming-soon';

export const modules: ToolModule[] = [
  {
    id: 'creative-review',
    label: 'Creative review',
    icon: '🎨',
    status: 'live',
    Component: CreativeReview,
  },
  {
    id: 'eob-brief',
    label: 'Campaign brief',
    icon: '📋',
    status: 'live',
    Component: EobBrief,
  },
  {
    id: 'campaign-performance',
    label: 'Campaign performance',
    icon: '📈',
    status: 'soon',
    Component: () => ComingSoon({ label: 'Campaign performance' }),
  },
  {
    id: 'email-hub',
    label: 'Email hub',
    icon: '✉️',
    status: 'live',
    Component: EmailHub,
  },
];
