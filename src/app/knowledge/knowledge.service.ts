import { Service } from '@angular/core';
import { type Observable, delay, of } from 'rxjs';
import { type Answer, KNOWLEDGE_DATA, type KnowledgeData, SAMPLE_ANSWER } from './knowledge.data';

/** One service per page; returns sample data now, an API later. */
@Service()
export class KnowledgeService {
  get(): Observable<KnowledgeData> {
    return of(KNOWLEDGE_DATA).pipe(delay(600));
  }

  ask(question: string): Observable<Answer> {
    const known = /faruk|habtoor/i.test(question);
    const answer: Answer = known
      ? SAMPLE_ANSWER
      : { found: false, text: '', window: 'last 7 days', citations: [] };
    return of(answer).pipe(delay(500));
  }
}
