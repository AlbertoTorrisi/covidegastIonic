import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-patient',
  templateUrl: './modal-edit-patient.component.html',
  styleUrls: ['./modal-edit-patient.component.scss'],
})
export class ModalEditPatientComponent implements OnInit {
  @Input() name: string;
  @Input() surname: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() email: string;
  @Input() hasCovid: boolean;
  @Input() fiscal_code: string;
  @Input() id: number;

  formPatient: FormGroup;

  constructor(builder: FormBuilder, private modalCtrl: ModalController) {
    this.formPatient = builder.group({
      address: [this.address, Validators.required],
      phone: [this.phone, Validators.required],
      email: [this.email, Validators.required],
      hasCovid: this.hasCovid,
    });
  }

  deletePatient() {
    this.modalCtrl.dismiss(this.id, 'deletePatient');
    console.log(this.id);
  }

  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  };

  onSave() {
    this.modalCtrl.dismiss(this.formPatient, 'saved');
  }

  ngOnInit() {}
}
