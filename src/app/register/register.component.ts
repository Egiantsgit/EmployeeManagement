import { Component } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  personalEnable = false;
  educationEnable = true;
  immigrationEnable = true;
  workExperienceEnable = true;
  selectedIndex = 0;
  addForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.addForm = this._fb.group({
      itemRows: this._fb.array([])
    });
    this.addForm.setControl('itemRows', this._fb.array([]));
    this.addWorkExp();
  }

  addWorkExp() {
    const control = <FormArray>this.addForm.controls['itemRows'];
    control.push(this.initItemRows());
  }

  initItemRows() {
    return this._fb.group({
        itemname: ['']
    });
  }

  removeWorkExp(index: number) {
    const control = <FormArray>this.addForm.controls['itemRows'];
    control.removeAt(index);
  }

  back(input) {
    if (input === 4) {
      this.workExperienceEnable = true;
      this.immigrationEnable = false;
      this.selectedIndex = 2;
    } else if (input === 3) {
      this.immigrationEnable = true;
      this.educationEnable = false;
      this.selectedIndex = 1;
    } if (input === 2) {
      this.educationEnable = true;
      this.personalEnable = false;
      this.selectedIndex = 0;
    }
  }

  public saveRegister(userObject, input) {
    if (input === 1) {
      this.personalEnable = true;
      this.educationEnable = false;
      this.selectedIndex = 1;
    }
    if (input === 2) {
      this.educationEnable = true;
      this.immigrationEnable = false;
      this.selectedIndex = 2;
    }
    if (input === 3) {
      this.immigrationEnable = true;
      this.workExperienceEnable = false;
      this.selectedIndex = 3;
    }
  }
}
