import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-swab',
  templateUrl: './modal-edit-swab.component.html',
  styleUrls: ['./modal-edit-swab.component.scss'],
})
export class ModalEditSwabComponent implements OnInit {

  @Input() team_id:number;
  @Input() date:string;
  @Input() type:string;
  @Input() done:number;
  @Input() positive_res:number;  
  @Input() phone:string;
  @Input() address:string;
  
  str=JSON.stringify;
  formSwab: FormGroup;
  
  constructor(builder:FormBuilder, private modalCtrl: ModalController) {
    this.formSwab= builder.group({
      team_id:  ["", Validators.required],
      date:  ["", Validators.required],
      type:  ["", Validators.required],
      done:  ["", Validators.required],
      positive_res:  ["", Validators.required],
      phone:   ["", Validators.required],
      address:   ["", Validators.required],  
    })
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

  dismissModal=()=>{
    this.modalCtrl.dismiss(null, 'cancel')
 }
  onSave(){
   this.modalCtrl.dismiss(this.formSwab, 'saved')
  }
}
