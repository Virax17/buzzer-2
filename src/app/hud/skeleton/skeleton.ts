import { Component, input } from '@angular/core';

/** Loading placeholder with a soft shimmer. Wrap a group of them in `role="status"`. */
@Component({
  selector: 'app-hud-skeleton',
  host: {
    'aria-hidden': 'true',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
  template: '',
  styles: `
    :host {
      display: block;
      border-radius: var(--hud-radius-md);
      background: linear-gradient(
        90deg,
        rgb(18 48 79 / 60%) 25%,
        rgb(58 216 255 / 14%) 50%,
        rgb(18 48 79 / 60%) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }

    @keyframes shimmer {
      from {
        background-position: 100% 0;
      }

      to {
        background-position: -100% 0;
      }
    }
  `,
})
export class HudSkeleton {
  readonly width = input('100%');
  readonly height = input('16px');
}
