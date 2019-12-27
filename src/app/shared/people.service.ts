import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from '../app.component';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  addHuman(people: People) {
    return this.http.post<People[]>('http://localhost:3000/contacts', people).toPromise();
  }


  getAllPeople() {
    return this.http.get<People[]>('http://localhost:3000/contacts').pipe(delay(800)).toPromise();
  }

  deleteHuman(p: People) {
    return this.http.delete<void>(`http://localhost:3000/contacts/${p.id}`).toPromise();
  }

  editHuman(p) {
    return this.http.put<People[]>(`http://localhost:3000/contacts/${p.id}`, {
      name: p.name,
      surname: p.surname,
      telephone: p.telephone
    }).toPromise()
  }
}
