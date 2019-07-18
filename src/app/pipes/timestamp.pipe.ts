import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const time = new Date(1970, 0, 1); // Epoch
    time.setSeconds(value);
    return time;
  }

}