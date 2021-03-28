import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddSwabComponent } from '../modals/modal-add-swab/modal-add-swab.component';

@Component({
  selector: 'app-swab-add',
  templateUrl: './swab-add.component.html',
  styleUrls: ['./swab-add.component.scss'],
})
export class SwabAddComponent implements OnInit {


  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalAddSwabComponent,
    });
     await modal.present();
 
     const {data: newSwab, role} = await modal.onWillDismiss();

  }
}
