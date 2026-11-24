import { Service } from '@angular/core';
import { type Observable, delay, of } from 'rxjs';
import { EXAMPLE_DATA, type ExampleData } from './example.data';

/** One service per page; returns sample data now, an API later. */
@Service()
export class ExampleService {
  get(): Observable<ExampleData> {
    return of(EXAMPLE_DATA).pipe(delay(600));
  }
}
