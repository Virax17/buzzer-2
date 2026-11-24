import { Component, input } from '@angular/core';

/** Empty state for a list or panel: icon ring, title, one line of help. */
@Component({
  selector: 'app-hud-empty',
  host: { role: 'status' },
  template: `
    <span class="ring" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8" />
      </svg>
    </span>
    <strong class="title">{{ title() }}</strong>
    @if (text()) {
      <span class="text">{{ text() }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      text-align: center;
    }

    .ring {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid var(--hud-control-border);
      border-radius: 50%;
      color: var(--hud-accent);
      background: var(--hud-accent-wash);
      box-shadow: 0 0 14px rgb(58 216 255 / 25%);
    }

    svg {
      width: 20px;
      height: 20px;
      fill: none;
      stroke: currentcolor;
      stroke-width: 1.8;
      stroke-linecap: round;
    }

    .title {
      font-family: var(--hud-font-display);
      font-size: var(--hud-size-lg);
      letter-spacing: 0.1em;
      color: var(--hud-heading);
      text-transform: uppercase;
    }

    .text {
      max-width: 280px;
      font-size: var(--hud-size-sm);
      color: var(--hud-text-muted);
    }
  `,
})
export class HudEmpty {
  readonly title = input.required<string>();
  readonly text = input('');
}
