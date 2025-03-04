import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[], searchTerm:string): any[] {
    return products.filter((product)=> product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
