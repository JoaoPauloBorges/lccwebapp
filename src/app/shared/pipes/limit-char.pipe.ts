import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitChar'})
export class LimitChar implements PipeTransform {

  charQtd = 100;

  transform(text: string): string {
    return text.length < this.charQtd ? text : text.substr(0, this.charQtd) + '...';
  }
}
