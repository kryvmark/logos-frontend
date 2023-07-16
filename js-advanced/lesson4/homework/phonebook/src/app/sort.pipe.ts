import { Pipe, PipeTransform } from '@angular/core';
import { Contact, SortBy } from './app.component'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Contact[], keywords: string, sorting: SortBy = SortBy.FirstName, sortAscending: boolean = true): Contact[] {
    if (keywords = keywords.replaceAll(/\s+/g, ' ').trim()) {
      value = value.filter(contact => {
        let isMatch = false;
        let keywordArray = keywords.split(' ');

        for (const keyword of keywordArray) {
          if (isMatch) break;

          if (contact.firstName.toLowerCase().startsWith(keyword.toLowerCase())
            || contact.secondName.toLowerCase().startsWith(keyword.toLowerCase())
            || contact.phone.includes(keyword)) isMatch = true;
        }

        return isMatch;
      });
    }

    let compareFn: (prev: Contact, next: Contact) => number;

    switch (sorting) {
      case SortBy.FirstName:
      default:
        compareFn = (prev, next) => sortAscending
          ? (prev.firstName < next.firstName ? -1 : 1)
          : (prev.firstName > next.firstName ? -1 : 1);
        break;
      case SortBy.SecondName:
        compareFn = (prev, next) => sortAscending
          ? (prev.secondName < next.secondName ? -1 : 1)
          : (prev.secondName > next.secondName ? -1 : 1);
        break;
      case SortBy.Phone:
        compareFn = (prev, next) => sortAscending
          ? (prev.phone < next.phone ? -1 : 1)
          : (prev.phone > next.phone ? -1 : 1);
        break;
    }

    return value.sort(compareFn);
  }

}
