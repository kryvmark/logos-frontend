import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    let phone = value.replace(/\D+/g, '').slice(0, 10);
    if (phone.length >= 3 && phone.length <= 6) return phone;
    if (phone.length < 10) return '';

    let code = phone.slice(0, 3);
    let group1 = phone.slice(3, 6);
    let group2 = phone.slice(6, 8);
    let group3 = phone.slice(8, 10);

    return `(${code}) ${group1}-${group2}-${group3}`;
  }

}
