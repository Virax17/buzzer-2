import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HudDot } from '../hud/dot/dot';
import { HudEmpty } from '../hud/empty/empty';
import { HudIcon } from '../hud/icon/icon';
import { HudItem } from '../hud/item/item';
import { HudPanel } from '../hud/panel/panel';
import { HudProgress } from '../hud/progress/progress';
import { HudShell } from '../hud/shell/shell';
import { HudSkeleton } from '../hud/skeleton/skeleton';
import { HudSwitch } from '../hud/switch/switch';
import { HudTag } from '../hud/tag/tag';
import { type Answer, type Scope, type SourceKind } from './knowledge.data';
import { KnowledgeService } from './knowledge.service';

type SourceFilter = 'all' | SourceKind;

/** Knowledge base page of the HUD design: ask a question, browse what the index knows. */
@Component({
  selector: 'app-knowledge-hud',
  imports: [
    DecimalPipe,
    NgTemplateOutlet,
    HudShell,
    HudPanel,
    HudItem,
    HudIcon,
    HudDot,
    HudTag,
    HudProgress,
    HudSwitch,
    HudSkeleton,
    HudEmpty,
  ],
  templateUrl: './knowledge.html',
  styleUrl: './knowledge.scss',
})
export class KnowledgeHud {
  private readonly service = inject(KnowledgeService);

  protected readonly data = toSignal(this.service.get());
  protected readonly prompts = [
    'Did I ask Asmir for the numbers?',
    'Recap of meetings with Faruk',
    'What happened yesterday?',
  ];

  // Ask
  private readonly typed = signal<string | null>(null);
  protected readonly question = computed(() => this.typed() ?? this.data()?.defaultQuestion ?? '');
  protected readonly answer = signal<Answer | null>(null);
  protected readonly asking = signal(false);
  protected readonly voiceNote = signal('');
  private readonly askedNow = signal(0);
  protected readonly asked = computed(() => (this.data()?.askedToday ?? 0) + this.askedNow());
  protected readonly limitReached = computed(() => this.asked() >= (this.data()?.askLimit ?? 0));

  // Everything I know
  protected readonly scopes = signal<ReadonlySet<Scope>>(new Set<Scope>(['business', 'private']));
  protected readonly week = signal(false);
  protected readonly source = signal<SourceFilter>('all');
  protected readonly sourceChips: readonly { id: SourceFilter; label: string }[] = [
    { id: 'all', label: 'All sources' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'gmail', label: 'Gmail' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'meeting', label: 'Meetings' },
    { id: 'basecamp', label: 'Basecamp' },
  ];
  protected readonly entries = computed(() =>
    (this.data()?.entries ?? []).filter(
      (e) =>
        this.scopes().has(e.scope) &&
        (this.source() === 'all' || e.kind === this.source()) &&
        (!this.week() || e.daysAgo <= 7),
    ),
  );

  // Totals, all calculated
  protected readonly total = computed(() =>
    (this.data()?.sources ?? []).reduce((sum, s) => sum + s.count, 0),
  );
  protected readonly businessPercent = computed(() =>
    this.total() > 0 ? Math.round(((this.data()?.businessItems ?? 0) / this.total()) * 100) : 0,
  );
  protected readonly privatePercent = computed(() =>
    this.total() > 0 ? Math.round(((this.data()?.privateItems ?? 0) / this.total()) * 100) : 0,
  );

  // Suggestions
  private readonly dismissed = signal<readonly string[]>([]);
  protected readonly created = signal<readonly string[]>([]);
  protected readonly suggestions = computed(() =>
    (this.data()?.suggestions ?? []).filter((s) => !this.dismissed().includes(s.id)),
  );

  // Settings
  protected readonly indexOn = linkedSignal(() => this.data()?.settings.index ?? true);

  constructor() {
    // The design opens on the answer to its own sample question.
    effect(() => {
      const d = this.data();
      if (d) {
        untracked(() => this.service.ask(d.defaultQuestion).subscribe((a) => this.answer.set(a)));
      }
    });
  }

  protected setQuestion(text: string): void {
    this.typed.set(text);
  }

  protected typedValue(event: Event): void {
    this.typed.set((event.target as HTMLInputElement).value);
  }

  protected ask(event: Event): void {
    event.preventDefault();
    const q = this.question().trim();
    if (!q || this.asking() || this.limitReached()) return;
    this.asking.set(true);
    this.service.ask(q).subscribe((a) => {
      this.answer.set(a);
      this.askedNow.update((n) => n + 1);
      this.asking.set(false);
    });
  }

  protected toggleScope(scope: Scope): void {
    this.scopes.update((set) => {
      const next = new Set(set);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
  }

  protected dismiss(id: string): void {
    this.dismissed.update((list) => [...list, id]);
  }

  protected createTodo(id: string): void {
    this.created.update((list) => [...list, id]);
  }

  protected scopeTone(scope: Scope): 'info' | 'off' {
    return scope === 'business' ? 'info' : 'off';
  }

  protected scopeLabel(scope: Scope): string {
    return scope === 'business' ? 'Business' : 'Private';
  }
}
