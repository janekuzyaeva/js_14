import { Pipe, PipeTransform } from '@angular/core';
import { People } from '../app.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(people: People[], search : string = ""): People[] {
    if (!search.trim()) {
      return people
    }

    return people.filter(p => {
      return p.name.includes(search) || p.surname.includes(search)
    })
  }

}
