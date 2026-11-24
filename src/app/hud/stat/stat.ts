import { Component, input } from '@angular/core';
import { type HudTone } from '../tone';

/** KPI tile: small label, big number, one line of context ("OK / 14 / checks passing"). */
@Component({
  selector: 'app-hud-stat',
  host: { '[attr.data-tone]': 'tone()' },
  template: `
    <span class="label">{{ label() }}</span>
    <span class="value">{{ value() }}</span>
    @if (hint()) {
      <span class="hint">{{ hint() }}</span>
    }
  `,
  styles: `
    :host {
      --stat: var(--hud-text-bright);

      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      padding: 12px 14px;
      border: 1px solid var(--hud-item-border);
      border-radius: var(--hud-radius-md);
      background: var(--hud-item);
    }

    :host([data-tone='ok']) {
      --stat: var(--hud-ok-text);
    }

    :host([data-tone='warn']) {
      --stat: var(--hud-warn-text);
    }

    :host([data-tone='error']) {
      --stat: var(--hud-error-text);
    }

    :host([data-tone='off']) {
      --stat: var(--hud-off-text);
    }

    :host([data-tone='info']) {
      --stat: var(--hud-accent-strong);
    }

    .label,
    .hint {
      font-size: var(--hud-size-sm);
      color: var(--hud-text-muted);
    }

    .value {
      font-family: var(--hud-font-display);
      font-size: var(--hud-size-xl);
      font-weight: 700;
      line-height: 1.1;
      color: var(--stat);
    }
  `,
})
export class HudStat {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly hint = input('');
  /** Colour of the number; none = neutral. */
  readonly tone = input<HudTone | null>(null);
}
