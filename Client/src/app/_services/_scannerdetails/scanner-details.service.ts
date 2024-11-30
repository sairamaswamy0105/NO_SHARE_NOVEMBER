import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerDetailsService {
  private message = new BehaviorSubject<{ data1: any; data2: any }>({ data1: null, data2: null });
  public getData=this.message.asObservable();

  updateMessage(newData1: any, newData2: any) {
    this.message.next({ data1: newData1, data2: newData2 });
  }
  constructor() { }
}
