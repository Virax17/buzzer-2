import { Component, input, model } from '@angular/core';

/** On/off switch (green glow when on). Two-way: `[(checked)]="…"`. */
@Component({
  selector: 'app-hud-switch',
  template: `
    <button
      type="button"
      role="switch"
      class="sw"
      [attr.aria-checked]="checked()"
      [attr.aria-label]="label()"
      (click)="checked.set(!checked())"
    >
      <span></span>
    </button>
  `,
  styles: `
    .sw {
      display: inline-flex;
      flex: none;
      align-items: center;
      width: 44px;
      height: 24px;
      padding: 2px;
      border: 1px solid var(--hud-control-border);
      border-radius: 12px;
      background: var(--hud-control-bg);
      cursor: pointer;
    }

    .sw span {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--hud-text-dim);
    }

    .sw[aria-checked='true'] {
      justify-content: flex-end;
      border-color: var(--hud-ok);
      background: rgb(62 230 160 / 25%);
    }

    .sw[aria-checked='true'] span {
      background: var(--hud-ok-text);
      box-shadow: 0 0 8px var(--hud-ok);
    }
  `,
})
export class HudSwitch {
  readonly checked = model(false);
  readonly label = input.required<string>();
}
