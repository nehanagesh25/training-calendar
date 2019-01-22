import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    } 
    value = value.toLowerCase();
    return items.filter((item) => {
      var match = item[field].toLowerCase();
      return match.indexOf(value) !== -1
    });
  }
}