import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateInFull'})
export class DateInFull implements PipeTransform {
  montharray: string[] = [
    ' de Janeiro de ',
    ' de Fevereiro de ',
    ' de Março de ',
    ' de Abril de ',
    ' de Maio de ',
    ' de Junho de',
    ' de Julho de ',
    ' de Agosto de ',
    ' de Setembro de ',
    ' de Outubro de ',
    ' de Novembro de ',
    ' de Dezembro de '];

  transform(date: Date): string {
    const output = date.getUTCDate().toString() + this.montharray[date.getMonth()] + date.getFullYear().toString();
    return output;
  }
}
