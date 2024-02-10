// scroll.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new Subject<void>();

  sendScrollEvent() {
    this.scrollSubject.next();
  }

  getScrollEvent() {
    return this.scrollSubject.asObservable();
  }
}
