import { Component, input } from '@angular/core';
import { type HudTone } from '../tone';

/** Rounded square around a 24×24 stroke icon (`<svg viewBox="0 0 24 24">`), as in the lists. */
@Component({
  selector: 'app-hud-icon',
  host: { 'aria-hidden': 'true', '[attr.data-tone]': 'tone()' },
  template: '<ng-content />',
  styles: `
    :host {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--hud-icon-border);
      border-radius: 9px;
      color: var(--hud-accent-soft);
      background: rgb(58 216 255 / 7%);
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

    :host ::ng-deep svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentcolor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class HudIcon {
  /** Icon colour; `info` is the default cyan. */
  readonly tone = input<HudTone>('info');
}
