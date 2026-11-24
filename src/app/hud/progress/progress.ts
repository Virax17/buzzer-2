import { Component, computed, input } from '@angular/core';

/** Glowing progress bar with its label on the left and the value on the right. */
@Component({
  selector: 'app-hud-progress',
  template: `
    @if (label() || valueText()) {
      <div class="row">
        <span>{{ label() }}</span>
        <span class="hud-num value">{{ valueText() }}</span>
      </div>
    }
    <div
      class="track"
      role="progressbar"
      [attr.aria-label]="label() || 'Progress'"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="percent()"
    >
      <span class="fill" [style.width.%]="percent()"></span>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
      color: var(--hud-text-soft);
    }

    .value {
      color: var(--hud-text-bright);
    }

    .track {
      height: 6px;
      overflow: hidden;
      border-radius: 3px;
      background: var(--hud-track);
    }

    .fill {
      display: block;
      height: 100%;
      border-radius: 3px;
      background: var(--hud-fill);
      box-shadow: var(--hud-fill-glow);
    }
  `,
})
export class HudProgress {
  /** 0 to 100. */
  readonly value = input.required<number>();
  readonly label = input('');
  /** Right-hand text, e.g. "298 / 500". */
  readonly valueText = input('');

  protected readonly percent = computed(() => Math.max(0, Math.min(100, this.value())));
}
