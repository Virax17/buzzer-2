import { Component, input } from '@angular/core';
import { type HudTone } from '../tone';

/** Small status tag ("OK", "TEST MODE", "ON"). Say the status in words, not only colour. */
@Component({
  selector: 'app-hud-tag',
  host: { '[attr.data-tone]': 'tone()' },
  template: '<ng-content />',
  styles: `
    :host {
      display: inline-block;
      padding: 2px 7px;
      border-radius: var(--hud-radius-sm);
      font-family: var(--hud-font-display);
      font-size: var(--hud-size-xs);
      font-weight: 700;
      letter-spacing: 0.08em;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--hud-info-text);
      background: var(--hud-info-bg);
    }

    :host([data-tone='ok']) {
      color: var(--hud-ok-text);
      background: var(--hud-ok-bg);
    }

    :host([data-tone='warn']) {
      color: var(--hud-warn-text);
      background: var(--hud-warn-bg);
    }

    :host([data-tone='error']) {
      color: var(--hud-error-text);
      background: var(--hud-error-bg);
    }

    :host([data-tone='off']) {
      color: var(--hud-off-text);
      background: var(--hud-off-bg);
    }

    :host([data-tone='purple']) {
      color: var(--hud-purple-text);
      background: var(--hud-purple-bg);
    }
  `,
})
export class HudTag {
  readonly tone = input<HudTone>('info');
}
