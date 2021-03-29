import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-swab',
  templateUrl: './modal-add-swab.component.html',
  styleUrls: ['./modal-add-swab.component.scss'],
})
export class ModalAddSwabComponent implements OnInit {

  pickerDate:any;
  formSwab:FormGroup;
  constructor(private builder:FormBuilder,private modalCtrl:ModalController) {
    this.formSwab= builder.group({
      team_id:  ["",],
      date:  [,],
      time:  [,],
      type:  ["",],
      patients:["",],
      done:  [,],
      positive_res:  [,],
    })
   }


  dismissModal=()=>{
    this.modalCtrl.dismiss(null, 'cancel')
 }
 
  onSave(){
    this.modalCtrl.dismiss(this.formSwab, 'saved')
  }
  ngOnInit() {}

}
