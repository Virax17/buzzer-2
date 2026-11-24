import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { HUD_NAV } from './shell.data';

/** "11:18" in a time zone. */
function clock(now: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(
    now,
  );
}

/**
 * The HUD page frame from the design: header (logo, title, clock, settings, avatar), the
 * sidebar with the pages and the voice card, the page content, and the footer with the
 * "Ask Buzzer Intelligence" button.
 *
 * ```html
 * <app-hud-shell title="Health Center" subtitle="Services, jobs, AI usage" active="Health Center">
 *   <div shell-status>...optional pill next to the logo...</div>
 *   <div class="hud-grid">...panels...</div>
 *   <button shell-action type="button" class="hud-btn">Check again</button>
 * </app-hud-shell>
 * ```
 */
@Component({
  selector: 'app-hud-shell',
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class HudShell {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  /** Label of the sidebar item to highlight. */
  readonly active = input('');
  readonly initials = input('AA');
  /** Example lines in the voice card. */
  readonly prompts = input<readonly string[]>([]);

  protected readonly collapsed = signal(false);
  private readonly now = signal(new Date());
  protected readonly time = computed(() => clock(this.now()));
  protected readonly cities = computed(
    () => `${clock(this.now(), 'Europe/Sarajevo')} · ${clock(this.now(), 'Asia/Dubai')}`,
  );

  private readonly sanitizer = inject(DomSanitizer);

  /** The nav icons are fixed markup from shell.data.ts, never user input. */
  protected readonly nav = HUD_NAV.map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({
      label: item.label,
      icon: this.sanitizer.bypassSecurityTrustHtml(item.icon) as SafeHtml,
    })),
  }));

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 30_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
