import { Component, input } from '@angular/core';
import { type HudTone } from '../tone';

/**
 * Glowing status dot followed by its label ("OK", "Waiting"). The label is required, so the
 * status is never shown by colour alone.
 */
@Component({
  selector: 'app-hud-dot',
  host: { '[attr.data-tone]': 'tone()' },
  template: '<span class="dot" aria-hidden="true"></span><ng-content />',
  styles: `
    :host {
      --dot: var(--hud-ok);
      --dot-text: var(--hud-ok-text);

      display: inline-flex;
      gap: 6px;
      align-items: center;
      font-size: var(--hud-size-sm);
      font-weight: 600;
      color: var(--dot-text);
      white-space: nowrap;
    }

    :host([data-tone='warn']) {
      --dot: var(--hud-warn);
      --dot-text: var(--hud-warn-text);
    }

    :host([data-tone='error']) {
      --dot: var(--hud-error);
      --dot-text: var(--hud-error-text);
    }

    :host([data-tone='off']) {
      --dot: var(--hud-off);
      --dot-text: var(--hud-off-text);
    }

    :host([data-tone='info']) {
      --dot: var(--hud-accent);
      --dot-text: var(--hud-info-text);
    }

    :host([data-tone='purple']) {
      --dot: var(--hud-purple);
      --dot-text: var(--hud-purple-text);
    }

    .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--dot);
      box-shadow: 0 0 8px var(--dot);
    }
  `,
})
export class HudDot {
  readonly tone = input<HudTone>('ok');
}
