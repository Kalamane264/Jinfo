import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Pipe({
  name: 'vidduration'
})
export class ViddurationPipe implements PipeTransform {

  transform(value: HTMLVideoElement, ...args: unknown[]): Subject<number> {

    let subj = new Subject<number>();
    value.onloadedmetadata = function(){
       subj.next(Math.ceil(value.duration / 60));
    }
    return subj;
  }

}
