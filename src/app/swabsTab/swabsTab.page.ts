import { PatientsService } from './../services/patients.service';
import { ModalSwabComponent } from '../components/modals/swab/modal-swab.component';
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { PickerController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Swab, SwabCalendar } from 'src/app/interface/list-of-swabs';
import { SwabsService } from 'src/app/services/swabs.service';
import { Patient } from '../interface/patient';
@Component({
  selector: 'app-swabsTab',
  templateUrl: 'swabsTab.page.html',
  styleUrls: ['swabsTab.page.scss'],
})
export class SwabsTabPage {
  @Input() daysPicker: string[];
  swabs: any;
  patients: Patient[];
  startDate: string;
  endDate: string;
  swabToUpdate: Swab;
  errorDateBefore = false;
  searchDaysArr = [];
  public daysSelected: string[] = [];
  public daysSelectedContent: any[] = [];

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private swabService: SwabsService,
    private patientsService: PatientsService
  ) {}
  async ngOnInit() {
    this.swabs = await this.swabService.allSwabsByDate(new Date(), new Date());
    this.patients = await this.patientsService.getAllPatients();
    this.daysSelected = Object.keys(this.swabs);
  }
  searchByDate(event) {
    let searchStart = this.startDate.substring(0, 10);
    let searchEnd = this.endDate.substring(0, 10);
    if (!moment(this.endDate).isBefore(this.startDate)) {
      this.errorDateBefore = false;
      this.searchDaysArr.length = 0;
      this.searchDaysArr.push(searchStart, searchEnd);
    } else {
      this.errorDateBefore = true;
    }
  }

  async openModalSwab(swab, editSwab) {
    const modal = await this.modalController.create({
      component: ModalSwabComponent,
      componentProps: {
        type: swab?.type,
        date: swab?.date.split(' ')[0],
        time: swab?.date.split(' ')[1],
        team_id: swab?.team_id,
        patient_id: swab?.patient_id,
        positive_res: swab?.positive_res,
        done: swab?.done,
        patients: this.patients,
      },
    });
    await modal.present();

    const { data: swabModified, role } = await modal.onWillDismiss();
    console.log(swab);
    if (role === 'saved') {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Saved successfly!',
        buttons: ['Close'],
      });
      console.log(swabModified.value);
      const res = editSwab
        ? this.swabService.updateSwab(
            swab.swab_id,
            swabModified.value.team_id,
            swabModified.value.date +
              ' ' +
              swabModified.value.time.substring(0, 5),
            swabModified.value.type,
            swabModified.value.patient_id,
            Number(swabModified.value.done),
            Number(swabModified.value.positive_res)
          )
        : this.swabService.addSwab(
            swabModified.value.team_id,
            swabModified.value.date.split('T')[0] +
              ' ' +
              swabModified.value.time.split('T')[1].substring(0, 5),
            swabModified.value.type,
            swabModified.value.patient_id,
            Number(swabModified.value.done),
            Number(swabModified.value.positive_res)
          );
      res && (await alert.present());
    } else if (role === 'delete') {
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'Do you want to delete this swab?',
        buttons: [
          {
            text: 'Delete',
            role: 'delete',
            cssClass: 'secondary',
            handler: async () => {
              await this.swabService.deleteSwab(swab.swab_id);
              this.swabs[swab.date.substring(0, 10)] = this.swabs[
                swab.date.substring(0, 10)
              ].filter((item) => item !== swab);
            },
          },
          'Cancel',
        ],
      });

      await alert.present();
    }
  }

  async ngOnChanges() {
    // prende le date per il searchByDate !NON FUNGE, o meglio chiama l'onchange insieme all'oninit
    if (this.swabs) {
      this.swabs = await this.swabService.allSwabsByDate(
        this.daysPicker[0],
        this.daysPicker[1]
      );
      this.swabs = Object.entries(this.swabs);
    }
  }
}
