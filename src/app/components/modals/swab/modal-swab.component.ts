import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
=======
import { fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> 36b1ba2840d03a990b2ad5015b10431aed5ce2c4
import { ModalController } from '@ionic/angular';
import { Swab } from 'src/app/interface/list-of-swabs';
import { Patient } from 'src/app/interface/patient';

@Component({
  selector: 'app-modal-swab',
  templateUrl: './modal-swab.component.html',
  styleUrls: ['./modal-swab.component.scss'],
})
export class ModalSwabComponent implements OnInit {
  @Input() type?: string;
  @Input() date?: string;
  @Input() team_id?: number;
  @Input() done?: string;
  @Input() positive_res?: string;
  @Input() patient_id?: number;
  @Input() time?: string;
  @Input() patients: Patient[];
  formSwab: FormGroup;
  @Input() phone: string;
  @Input() editSwab: boolean;
  blurTeamId: boolean=false;
  blurDate:boolean=false;
  blurTime:boolean=false;
  blurType:boolean=false;
  blurPatientId:boolean=false;
  filter: string;
  hidePatientList: boolean = false;
  patient_name: string = '';
  str = JSON.stringify;
  
  constructor(builder: FormBuilder, private modalCtrl: ModalController) {
    this.formSwab = builder.group({
      team_id: [this.team_id, Validators.required],
      date: [this.date, Validators.required],
      time: [this.time, Validators.required],
      type: [this.type, Validators.required],
      done: this.done,
      positive_res: this.positive_res,
      patient_id: [this.patient_id, Validators.required],
    });
  }

  blurInput = (formName) => {
    if (formName === 'team_id') this.blurTeamId = true;
    if (formName === 'date') this.blurDate = true;
    if (formName === 'time') this.blurTime = true;
    if (formName === 'type') this.blurType = true;
    if (formName === 'patient_id') this.blurPatientId = true;
  };
   
  public findInvalidControls() {
    const invalid = [];
    const controls = this.formSwab.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  ngOnInit() {
    this.editSwab && this.selectPatientID(this.patient_id);
  }
  handleSearch(e) {
    this.filter = e.target.value;
  }
  selectPatientID(id) {
    this.patient_id = id;
    this.patient_name = this.patients.find(
      ({ patient_id }) => patient_id === id
    ).name;
    this.hidePatientList = true;
  }
  hidePatients() {
    this.hidePatientList = true;
  }
  showPatients() {
    this.hidePatientList = false;
  }
  filterPatient = (patient) =>
    patient.name.toLowerCase().indexOf(this.filter?.toLowerCase()) > -1 ||
    patient.fiscal_code.indexOf(this.filter?.toUpperCase()) > -1;

  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  };
  onSave() {
    this.modalCtrl.dismiss(this.formSwab, 'saved');
  }
  onDelete() {
    this.modalCtrl.dismiss(this.formSwab, 'delete');
  }
}
