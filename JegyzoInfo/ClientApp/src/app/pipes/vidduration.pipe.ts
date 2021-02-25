import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';

@Pipe({
  name: 'vidduration'
})
export class ViddurationPipe implements PipeTransform {

  transform(value: HTMLVideoElement, ...args: unknown[]): unknown {

    let subj = new Subject();
    value.onloadedmetadata = function(){
       subj.next(Math.ceil(value.duration / 60));
    }
    return subj;
  }

}
