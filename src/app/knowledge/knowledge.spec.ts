import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { KNOWLEDGE_DATA } from './knowledge.data';
import { KnowledgeHud } from './knowledge';
import { KnowledgeService } from './knowledge.service';

async function render() {
  const fixture = TestBed.createComponent(KnowledgeHud);
  const root = fixture.nativeElement as HTMLElement;
  await new Promise((resolve) => setTimeout(resolve, 1300));
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture, root };
}

describe('KnowledgeService', () => {
  it('returns the sample data through an Observable', async () => {
    const data = await firstValueFrom(TestBed.inject(KnowledgeService).get());
    expect(data.entries.length).toBeGreaterThan(0);
  });

  it('finds the sample answer and says "not found" for anything else', async () => {
    const service = TestBed.inject(KnowledgeService);
    expect((await firstValueFrom(service.ask('Did Faruk send it?'))).found).toBe(true);
    const none = await firstValueFrom(service.ask('Something unknown'));
    expect(none.found).toBe(false);
    expect(none.citations).toHaveLength(0);
  });

  it('keeps the source counts, business and private counts in line', () => {
    const total = KNOWLEDGE_DATA.sources.reduce((sum, s) => sum + s.count, 0);
    expect(total).toBe(KNOWLEDGE_DATA.businessItems + KNOWLEDGE_DATA.privateItems);
  });
});

describe('KnowledgeHud', () => {
  it('shows loading skeletons first', () => {
    const fixture = TestBed.createComponent(KnowledgeHud);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading');
    expect(root.querySelectorAll('app-hud-skeleton').length).toBeGreaterThan(3);
  });

  it('calculates the totals and percentages from the data', async () => {
    const { root } = await render();
    const text = root.textContent ?? '';
    expect(text).toContain('4,812 items');
    expect(text).toContain('4,377');
    const bars = [...root.querySelectorAll('[role="progressbar"]')].map((b) =>
      b.getAttribute('aria-valuenow'),
    );
    expect(bars).toEqual(['91', '9']);
  });

  it('opens on the answer to the sample question', async () => {
    const { root } = await render();
    expect(root.textContent).toContain('Faruk shared the draft contract');
    expect(root.textContent).toContain('Found');
  });

  it('filters the feed by source and shows an empty state when nothing matches', async () => {
    const { fixture, root } = await render();
    const chips = () => [...root.querySelectorAll<HTMLButtonElement>('.chip')];
    const chip = (label: string) => chips().find((c) => c.textContent?.trim() === label);
    chip('Gmail')?.click();
    fixture.detectChanges();
    expect(root.textContent).toContain('Gmail · Flight confirmation');
    chip('Private')?.click();
    fixture.detectChanges();
    expect(root.textContent).toContain('Nothing matches');
  });

  it('lets the visitor create a to-do or dismiss a suggestion, and shows an empty state', async () => {
    const { fixture, root } = await render();
    const button = (label: string) =>
      [...root.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
        b.textContent?.includes(label),
      );
    button('Create to-do')?.click();
    fixture.detectChanges();
    expect(root.textContent).toContain('To-do created');
    while (button('Dismiss')) {
      button('Dismiss')?.click();
      fixture.detectChanges();
    }
    expect(root.textContent).toContain('All caught up');
  });

  it('asks a new question, counts it, and says when nothing was found', async () => {
    const { fixture, root } = await render();
    const input = root.querySelector<HTMLInputElement>('input[aria-label="Question"]');
    if (!input) throw new Error('no input');
    input.value = 'Something unknown';
    input.dispatchEvent(new Event('input'));
    root.querySelector('form')?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(root.querySelectorAll('app-hud-skeleton').length).toBeGreaterThan(0);
    await new Promise((resolve) => setTimeout(resolve, 700));
    fixture.detectChanges();
    expect(root.textContent).toContain('Not found');
    expect(root.textContent).toContain('5 / 30');
  });

  it('turns the knowledge index switch off and on', async () => {
    const { fixture, root } = await render();
    const toggle = root.querySelector<HTMLButtonElement>('[role="switch"]');
    expect(toggle?.getAttribute('aria-checked')).toBe('true');
    toggle?.click();
    fixture.detectChanges();
    expect(toggle?.getAttribute('aria-checked')).toBe('false');
  });
});
