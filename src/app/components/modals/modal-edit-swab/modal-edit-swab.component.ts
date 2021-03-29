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
  

  formSwab: FormGroup;
  
  constructor(builder:FormBuilder, private modalCtrl: ModalController) {
    this.formSwab= builder.group({
      team_id:  [,],
      date:  [,],
      type:  [,],
      done:  [,],
      positive_res:  [,],
      phone:   [,],
      address:   [,],  
    })
   }

  ngOnInit() {}

  dismissModal=()=>{
    this.modalCtrl.dismiss(null, 'cancel')
 }
  onSave(){
    this.modalCtrl.dismiss(this.formSwab, 'saved')
  }
}
