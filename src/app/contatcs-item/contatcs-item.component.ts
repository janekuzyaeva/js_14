import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { People } from '../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  form : FormGroup;
  
  @Input() p : People;
  @Output() onDelete: EventEmitter<People> = new EventEmitter<People>();
  @Output() onSave: EventEmitter<People> = new EventEmitter<People>();

  edit = false;
  name = "";
  surname = "";
  telephone = "";
  id = 0;
  public myModel = "";
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.name = this.p.name;
    this.surname = this.p.surname; 
    this.telephone = this.p.telephone;
    this.myModel = this.p.telephone;
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      surname: new FormControl(this.surname, [Validators.required, Validators.minLength(1)]),
      telephone: new FormControl(this.telephone, [Validators.required, Validators.minLength(11)])
    });
  }

  deletePeople(id) {
    this.onDelete.emit(this.p);
  }

  editPeople(p : People) {
    this.edit = true;
  }

  async savePeople(id) {
    const formData = {...this.form.value}
      const People : People = {
        name: formData.name,
        surname: formData.surname,
        telephone: formData.telephone,
        id: id,
      }
      this.edit = false;
      try {
        let res = await this.peopleService.editHuman(People);
        this.onSave.emit(People);
      } catch(e){
        console.error(e);
      }
  }
}
