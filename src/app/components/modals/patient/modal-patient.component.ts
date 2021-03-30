import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-patient',
  templateUrl: './modal-patient.component.html',
  styleUrls: ['./modal-patient.component.scss'],
})
export class ModalPatientComponent implements OnInit {
  @Input() name?: string;
  @Input() fiscalCode?: string;
  @Input() address?: string;
  @Input() phone?: string;
  @Input() email?: string;
  @Input() dob?: string;
  @Input() hasCovid?: boolean;
  @Input() editPatient: boolean;
  formPatient: FormGroup;

  constructor(builder: FormBuilder, private modalCtrl: ModalController) {
    this.formPatient = builder.group(
      this.editPatient
        ? {
            address: [this.address, Validators.required],
            phone: [this.phone, Validators.required],
            email: [this.email, Validators.required],
            hasCovid: this.hasCovid,
          }
        : {
            name: [this.name, Validators.required],
            fiscalCode: [this.fiscalCode, Validators.required],
            address: [this.address, Validators.required],
            dob: [this.dob, Validators.required],
            phone: [this.phone, Validators.required],
            email: [this.email, Validators.required],
            hasCovid: this.hasCovid,
          }
    );
  }

  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  };

  onSave() {
    this.modalCtrl.dismiss(this.formPatient, this.editPatient ? 'edit' : 'add');
  }

  ngOnInit() {}
}
