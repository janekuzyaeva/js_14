import { Component } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from './shared/people.service';

export interface People {
  name: string
  surname: string
  telephone: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contactsBook';

  search = "";
  people: People[] = [];
  loading = false;
  
  constructor(private peopleService: PeopleService) {}

  async ngOnInit() {
    this.loading = true;
    console.log(this.loading);
    try {
      let res = await this.peopleService.getAllPeople();
      this.people = res;
    } catch(e){
      console.error(e);
    }
    this.loading = false;
    console.log(this.loading);
  }



  updatePeople(p: People) {
    if (this.people.length == 0) {
      p.id = 1;
    } else p.id = this.people[this.people.length-1].id + 1 ;
    this.people.push(p);
  }

  async deletePeople(p: People) {
    try {
      let res = await this.peopleService.deleteHuman(p);
      let index = this.people.findIndex((el)=>el.id==p.id)
      this.people.splice(index, 1);
    } catch(e){
      console.error(e);
    }
  }

  savePeople(p: People) {
    let index = this.people.findIndex((el)=>el.id==p.id)
    this.people.splice(index, 1, p);
  }
}
