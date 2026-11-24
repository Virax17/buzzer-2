import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  it('returns the sample data through an Observable', async () => {
    const data = await firstValueFrom(TestBed.inject(ExampleService).get());
    expect(data.stats).toHaveLength(4);
    expect(data.tasks.map((t) => t.mode)).toContain('TEST MODE');
  });
});
