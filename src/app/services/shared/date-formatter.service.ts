import {inject, Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {
  datePipe = inject(DatePipe)

  format(date: string): string {
    return <string>this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
