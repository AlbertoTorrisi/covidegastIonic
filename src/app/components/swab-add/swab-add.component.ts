import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalAddSwabComponent } from '../modals/modal-add-swab/modal-add-swab.component';

@Component({
  selector: 'app-swab-add',
  templateUrl: './swab-add.component.html',
  styleUrls: ['./swab-add.component.scss'],
})
export class SwabAddComponent implements OnInit {


  constructor(private modalController: ModalController, private router:Router) { }

  ngOnInit() {}

  async openAddSwabModal() {
    const modal = await this.modalController.create({
      component: ModalAddSwabComponent,
     
      
    });
     await modal.present();
 
     const {data: newSwab, role} = await modal.onWillDismiss();
     if(this.router.navigateByUrl('/notFound')){
       this.router.navigateByUrl('/tabs/tab2');
     }
      console.log(newSwab)
  }
}
