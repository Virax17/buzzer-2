/** The sidebar as in the design: groups of pages, each with its 24×24 stroke icon (SVG inner markup). */
export interface HudNavItem {
  readonly label: string;
  readonly icon: string;
}

export interface HudNavGroup {
  readonly title: string;
  readonly items: readonly HudNavItem[];
}

const trend = '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>';
const flag = '<path d="M5 21V4h12l-2 4 2 4H5"/>';

export const HUD_NAV: readonly HudNavGroup[] = [
  {
    title: 'Console',
    items: [
      { label: 'Dashboard', icon: flag },
      {
        label: 'Team map',
        icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      },
      {
        label: 'Meetings',
        icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
      },
      { label: 'Company overview', icon: trend },
      { label: 'Revenue Engines', icon: trend },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Health Center', icon: '<path d="M3 12h4l2-5 4 10 2-5h6"/>' },
      {
        label: 'Visitor activity',
        icon: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
      },
    ],
  },
  {
    title: 'Reports',
    items: [
      { label: 'Daily report warnings', icon: flag },
      {
        label: 'Reminders & leads',
        icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      },
      {
        label: 'Weekly reports',
        icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      },
    ],
  },
  {
    title: 'AI',
    items: [
      {
        label: 'My commitments',
        icon: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 3 3 5-6"/>',
      },
      {
        label: 'AI Pikachu',
        icon: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
      },
      { label: 'Assistant actions', icon: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>' },
      {
        label: 'Knowledge base',
        icon: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3"/><path d="M20 4v14h-6"/>',
      },
    ],
  },
];
