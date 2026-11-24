import { type HudTone } from '../hud/tone';

/** Made-up sample data for the Knowledge base page. Numbers that can be derived are not stored. */
export type SourceKind = 'whatsapp' | 'gmail' | 'calendar' | 'meeting' | 'basecamp';
export type Scope = 'business' | 'private';

export interface KnowledgeSource {
  readonly id: string;
  readonly label: string;
  readonly count: number;
  readonly tone: HudTone;
  /** Where the label floats around the orb. */
  readonly place: 'tl' | 'tr' | 'ml' | 'mr' | 'bl' | 'br';
}

export interface KnowledgeEntry {
  readonly id: string;
  readonly kind: SourceKind;
  readonly title: string;
  readonly detail: string;
  readonly scope: Scope;
  /** Days ago, so the "7 days" filter can be calculated. */
  readonly daysAgo: number;
}

export interface KnowledgeGroup {
  readonly name: string;
  readonly messagesToday: number;
}

export interface KnowledgeSuggestion {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
}

export interface KnowledgeSettings {
  readonly index: boolean;
  readonly scopeNote: string;
  readonly schedule: string;
  readonly keepDays: number;
}

export interface KnowledgeData {
  readonly indexOn: boolean;
  readonly askedToday: number;
  readonly askLimit: number;
  readonly defaultQuestion: string;
  readonly questionHints: readonly string[];
  readonly sources: readonly KnowledgeSource[];
  readonly entries: readonly KnowledgeEntry[];
  readonly groups: readonly KnowledgeGroup[];
  readonly watchedGroups: number;
  readonly privateKeyNote: string;
  readonly suggestions: readonly KnowledgeSuggestion[];
  readonly settings: KnowledgeSettings;
  /** Business and private item counts. */
  readonly businessItems: number;
  readonly privateItems: number;
}

export interface Citation {
  readonly kind: SourceKind;
  readonly title: string;
  readonly detail: string;
  readonly scope: Scope;
}

export interface Answer {
  readonly found: boolean;
  readonly text: string;
  readonly window: string;
  readonly citations: readonly Citation[];
}

export const SOURCE_LABEL: Readonly<Record<SourceKind, string>> = {
  whatsapp: 'WhatsApp',
  gmail: 'Gmail',
  calendar: 'Calendar',
  meeting: 'Meeting notes',
  basecamp: 'Basecamp',
};

export const KNOWLEDGE_DATA: KnowledgeData = {
  indexOn: true,
  askedToday: 4,
  askLimit: 30,
  defaultQuestion: 'Did Faruk send the Al Habtoor contract last week?',
  questionHints: ['Did I ask … ?', 'Recap of meetings with …', 'What happened in November?'],
  businessItems: 4377,
  privateItems: 435,
  sources: [
    { id: 'wa', label: 'WhatsApp', count: 2931, tone: 'ok', place: 'tl' },
    { id: 'gm', label: 'Gmail', count: 884, tone: 'purple', place: 'tr' },
    { id: 'cal', label: 'Calendar', count: 412, tone: 'info', place: 'ml' },
    { id: 'mn', label: 'Meeting notes', count: 96, tone: 'info', place: 'mr' },
    { id: 'bt', label: 'Basecamp to-dos', count: 214, tone: 'warn', place: 'bl' },
    { id: 'bc', label: 'Comments', count: 275, tone: 'warn', place: 'br' },
  ],
  entries: [
    {
      id: 'e1',
      kind: 'whatsapp',
      title: 'WhatsApp · Sales team',
      detail: 'Amir: 3 new subscriptions today, Tryouts 2 bookings · Today 10:24',
      scope: 'business',
      daysAgo: 0,
    },
    {
      id: 'e2',
      kind: 'calendar',
      title: 'Calendar · Q4 deck review',
      detail: 'Tomorrow 10:00 · Faruk, Amer · Tomorrow',
      scope: 'business',
      daysAgo: 0,
    },
    {
      id: 'e3',
      kind: 'meeting',
      title: 'Meeting notes · Streaming sync',
      detail: 'Decision: start with one platform partner · Yesterday',
      scope: 'business',
      daysAgo: 1,
    },
    {
      id: 'e4',
      kind: 'gmail',
      title: 'Gmail · Flight confirmation',
      detail: 'Sarajevo → Dubai, Thu 26 Nov · Yesterday',
      scope: 'private',
      daysAgo: 1,
    },
    {
      id: 'e5',
      kind: 'basecamp',
      title: 'Basecamp · Approve marketing budget',
      detail: 'To-do assigned to you, due Thu · Fri',
      scope: 'business',
      daysAgo: 4,
    },
  ],
  groups: [
    { name: 'Sales team', messagesToday: 38 },
    { name: 'Partnerships', messagesToday: 12 },
    { name: 'Marketing Q4', messagesToday: 21 },
    { name: 'Product delivery', messagesToday: 7 },
  ],
  watchedGroups: 12,
  privateKeyNote: 'Private items go to AI only on your own key',
  suggestions: [
    {
      id: 's1',
      title: 'Follow up with Amina on the campaign timeline',
      detail: 'From Marketing Q4 · promised Monday, still open',
    },
    {
      id: 's2',
      title: 'Send Al Habtoor the signed NDA',
      detail: 'From Gmail · Amer asked twice',
    },
  ],
  settings: { index: true, scopeNote: 'Knowledge index', schedule: 'Every 30 min', keepDays: 365 },
};

/** The one answer the sample knows. Anything else comes back as "not found". */
export const SAMPLE_ANSWER: Answer = {
  found: true,
  window: 'last 7 days',
  text: 'Yes. Faruk shared the draft contract on Thu 19 Nov in the Partnerships group and sent the signed copy by email on Fri 20 Nov.',
  citations: [
    {
      kind: 'whatsapp',
      title: 'Partnerships · WhatsApp',
      detail: 'Thu 19 Nov 16:20 · Faruk Cicic',
      scope: 'business',
    },
    {
      kind: 'gmail',
      title: 'Re: Al Habtoor agreement · Gmail',
      detail: 'Fri 20 Nov 09:41 · Faruk Cicic',
      scope: 'business',
    },
  ],
};
