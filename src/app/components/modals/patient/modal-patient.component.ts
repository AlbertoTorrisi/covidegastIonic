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
  blurName: boolean;
  blurAddress: boolean;
  blurDob: boolean;
  blurEmail: boolean;
  blurPhone: boolean;
  blurFiscalCode: boolean;

  formPatient: FormGroup;

  constructor(builder: FormBuilder, private modalCtrl: ModalController) {
    this.formPatient = builder.group(
      this.editPatient
        ? {
            address: [this.address, Validators.required],
            phone: [this.phone, Validators.required],
            email: [
              this.email,
              Validators.compose([Validators.required, Validators.email]),
            ],
            hasCovid: this.hasCovid,
          }
        : {
            name: [
              this.name,
              Validators.compose([
                Validators.required,
                Validators.minLength(4),
              ]),
            ],
            fiscalCode: [
              this.fiscalCode,
              Validators.compose([
                Validators.required,
                Validators.pattern(
                  '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'
                ),
              ]),
            ],
            address: [this.address, Validators.required],
            dob: [this.dob, Validators.required],
            phone: [this.phone, Validators.required],
            email: [
              this.email,
              Validators.compose([Validators.required, Validators.email]),
            ],
            hasCovid: this.hasCovid,
          }
    );
  }

  blurInput = (formName) => {
    if (formName === 'name') this.blurName = true;
    if (formName === 'address') this.blurAddress = true;
    if (formName === 'dob') this.blurDob = true;
    if (formName === 'email') this.blurEmail = true;
    if (formName === 'fiscalCode') this.blurFiscalCode = true;
    if (formName === 'phone') this.blurPhone = true;
  };

  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  };

  onSave() {
    this.modalCtrl.dismiss(this.formPatient, this.editPatient ? 'edit' : 'add');
  }

  ngOnInit() {}
}
