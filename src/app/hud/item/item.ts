import { Component } from '@angular/core';

/**
 * A row inside a panel list: optional icon box on the left, text in the middle, status on the
 * right. Mark the parts with `item-icon` and `item-end`.
 *
 * ```html
 * <app-hud-item>
 *   <app-hud-icon item-icon><svg>...</svg></app-hud-icon>
 *   <strong>Basecamp</strong><span class="hud-sm">Connected</span>
 *   <app-hud-dot item-end tone="ok">OK</app-hud-dot>
 * </app-hud-item>
 * ```
 */
@Component({
  selector: 'app-hud-item',
  template: `
    <ng-content select="[item-icon]" />
    <div class="text"><ng-content /></div>
    <ng-content select="[item-end]" />
  `,
  styles: `
    :host {
      display: flex;
      gap: 12px;
      align-items: center;
      min-width: 0;
      padding: 10px 12px;
      border: 1px solid var(--hud-item-border);
      border-radius: var(--hud-radius-md);
      background: var(--hud-item);
    }

    .text {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      font-size: 13px;
      color: var(--hud-text-bright);
    }
  `,
})
export class HudItem {}
