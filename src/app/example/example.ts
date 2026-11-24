import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HudDot } from '../hud/dot/dot';
import { HudEmpty } from '../hud/empty/empty';
import { HudIcon } from '../hud/icon/icon';
import { HudItem } from '../hud/item/item';
import { HudPanel } from '../hud/panel/panel';
import { HudProgress } from '../hud/progress/progress';
import { HudShell } from '../hud/shell/shell';
import { HudSkeleton } from '../hud/skeleton/skeleton';
import { HudStat } from '../hud/stat/stat';
import { HudSwitch } from '../hud/switch/switch';
import { HudTag } from '../hud/tag/tag';
import { type HudTone } from '../hud/tone';
import { ExampleService } from './example.service';

/** Every kit part on one made-up page. Copy the patterns, not the content. */
@Component({
  selector: 'app-example',
  imports: [
    HudShell,
    HudPanel,
    HudStat,
    HudItem,
    HudIcon,
    HudDot,
    HudTag,
    HudProgress,
    HudSwitch,
    HudSkeleton,
    HudEmpty,
  ],
  templateUrl: './example.html',
})
export class Example {
  protected readonly data = toSignal(inject(ExampleService).get());
  protected readonly alerts = signal(true);
  protected readonly prompts = ['Is everything working?', 'What needs attention?'];

  protected resultTone(result: string): HudTone {
    return result === 'OK' ? 'ok' : result === 'Waiting' ? 'warn' : 'off';
  }

  protected modeTone(mode: string): HudTone {
    return mode === 'ON' ? 'ok' : mode === 'TEST MODE' ? 'warn' : 'off';
  }

  protected statusText(status: string): string {
    return status === 'ok' ? 'OK' : status === 'warn' ? 'Waiting' : 'Off';
  }

  protected percent(used: number, limit: number): number {
    return limit > 0 ? (used / limit) * 100 : 0;
  }
}
