import { Component } from '@angular/core';

/** Rounded square around a 24×24 stroke icon (`<svg viewBox="0 0 24 24">`), as in the lists. */
@Component({
  selector: 'app-hud-icon',
  host: { 'aria-hidden': 'true' },
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
export class HudIcon {}
