import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit() {}

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
