import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { People } from '../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from '../shared/people.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  form : FormGroup;
  @Output() onAdd: EventEmitter<People> = new EventEmitter<People>()

  name = "";
  surname = "";
  telephone = "";
  disabled = true;
  i = 0;
  public myModel = '';
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      surname: new FormControl(this.surname, [Validators.required, Validators.minLength(1)]),
      telephone: new FormControl(this.telephone, [Validators.required, Validators.minLength(11)])
    });
  }

  async submit() {
    const formData = {...this.form.value}
    this.form.reset()
    const People : People = {
      name: formData.name,
      surname: formData.surname,
      telephone: formData.telephone,
    }
    this.disabled = false;
    try {
      let res = await this.peopleService.addHuman(People);
      this.onAdd.emit(People);
    } catch(e){
      console.error(e);
    }
  }

}
