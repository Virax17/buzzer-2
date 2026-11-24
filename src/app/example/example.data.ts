import { type HudTone } from '../hud/tone';

/** Made-up sample data for the example page. Real pages keep theirs the same way. */
export interface ExampleStat {
  readonly label: string;
  readonly value: number;
  readonly hint: string;
  readonly tone: HudTone | null;
}

export interface ExampleSource {
  readonly name: string;
  readonly detail: string;
  readonly status: 'ok' | 'warn' | 'off';
}

export interface ExampleTask {
  readonly name: string;
  readonly mode: 'ON' | 'TEST MODE' | 'OFF';
  readonly lastRun: string;
  readonly result: 'OK' | 'Waiting' | 'Off';
}

export interface ExampleUsage {
  readonly name: string;
  readonly used: number;
  readonly limit: number;
}

export interface ExampleData {
  readonly stats: readonly ExampleStat[];
  readonly sources: readonly ExampleSource[];
  readonly tasks: readonly ExampleTask[];
  readonly usage: readonly ExampleUsage[];
}

export const EXAMPLE_DATA: ExampleData = {
  stats: [
    { label: 'Ready', value: 12, hint: 'items ready', tone: 'ok' },
    { label: 'Attention', value: 2, hint: 'need a look', tone: 'warn' },
    { label: 'Failed', value: 0, hint: 'nothing broken', tone: 'error' },
    { label: 'Paused', value: 3, hint: 'switched off', tone: 'off' },
  ],
  sources: [
    { name: 'Source A', detail: 'Connected', status: 'ok' },
    { name: 'Source B', detail: 'Waiting for access', status: 'warn' },
    { name: 'Source C', detail: 'Not set up', status: 'off' },
  ],
  tasks: [
    { name: 'Morning sync', mode: 'ON', lastRun: 'Today 07:30', result: 'OK' },
    { name: 'Report check', mode: 'TEST MODE', lastRun: 'Today 08:45', result: 'Waiting' },
    { name: 'Weekly digest', mode: 'OFF', lastRun: '-', result: 'Off' },
  ],
  usage: [
    { name: 'Quota one', used: 298, limit: 500 },
    { name: 'Quota two', used: 114, limit: 500 },
  ],
};
