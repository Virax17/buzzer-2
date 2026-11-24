import { Component, input } from '@angular/core';

/**
 * The HUD card: glass background, thin border and the two cyan corner brackets. Optional title
 * (uppercase display font) and hint; put buttons or tags in the top right with `panel-action`.
 *
 * ```html
 * <app-hud-panel title="Jobs" hint="Scheduled jobs and their last run">
 *   <app-hud-tag panel-action tone="ok">Live</app-hud-tag>
 *   ...content...
 * </app-hud-panel>
 * ```
 */
@Component({
  selector: 'app-hud-panel',
  template: `
    @if (title() || hint()) {
      <header class="head">
        <div>
          @if (title()) {
            <h2 class="title">{{ title() }}</h2>
          }
          @if (hint()) {
            <p class="hint">{{ hint() }}</p>
          }
        </div>
        <ng-content select="[panel-action]" />
      </header>
    }
    <ng-content />
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
      padding: var(--hud-pad);
      border: 1px solid var(--hud-panel-border);
      border-radius: var(--hud-radius-lg);
      background: var(--hud-panel);
    }

    :host::before,
    :host::after {
      position: absolute;
      width: 14px;
      height: 14px;
      border-color: var(--hud-accent);
      border-style: solid;
      opacity: 0.8;
      content: '';
    }

    :host::before {
      top: -1px;
      left: -1px;
      border-width: 2px 0 0 2px;
      border-radius: var(--hud-radius-lg) 0 0;
    }

    :host::after {
      right: -1px;
      bottom: -1px;
      border-width: 0 2px 2px 0;
      border-radius: 0 0 var(--hud-radius-lg);
    }

    .head {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      justify-content: space-between;
    }

    .title {
      font-family: var(--hud-font-display);
      font-size: var(--hud-size-lg);
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--hud-heading);
      text-transform: uppercase;
    }

    .hint {
      margin: 2px 0 0;
      font-size: var(--hud-size-sm);
      color: var(--hud-text-muted);
    }
  `,
})
export class HudPanel {
  readonly title = input('');
  readonly hint = input('');
}
