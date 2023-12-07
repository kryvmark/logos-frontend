import { Pipe, PipeTransform } from '@angular/core';
import { MarketItem, MarketItemSubcat } from '../types';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: MarketItem[], product: string, subcat: string): MarketItem[] {
    if (product) value = value.filter(record => record.product == product);
    if (subcat) value = value.filter(record => record.subcat == subcat);
    return value;
  }
}
