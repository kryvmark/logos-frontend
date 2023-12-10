import { Pipe, PipeTransform } from '@angular/core';
import { MarketItem } from '../types';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: MarketItem[], product: string, category: string): MarketItem[] {
    if (product) value = value.filter(record => record.product == product);
    if (category) value = value.filter(record => record.category == category);
    return value;
  }
}
