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
  swabs: any;
  patients: Patient[];
  startDate: string;
  endDate: string;
  swabToUpdate: Swab;
  errorDateBefore = false;
  todaySwabsShown = false;
  public daysSelected: string[] = [];

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
  async showTodaySwabs(){
    this.swabs = await this.swabService.allSwabsByDate(moment().format('YYYY-MM-DD'), moment().add(1,'day').format('YYYY-MM-DD'))
    this.daysSelected = Object.keys(this.swabs);

  }
  async toggleSwabShown(){
    this.todaySwabsShown = !this.todaySwabsShown;
    this.todaySwabsShown ? this.showTodaySwabs() :this.searchByDate()
  }
  async searchByDate() {
    let searchStart = this.startDate?.substring(0, 10);
    let searchEnd = this.endDate?.substring(0, 10);
    this.errorDateBefore = moment(this.endDate).isBefore(this.startDate);
    if (!this.errorDateBefore) {
      this.swabs = await this.swabService.allSwabsByDate(
        searchStart,
        searchEnd
      );
      this.daysSelected = Object.keys(this.swabs);
    }
  }

  async openModalSwab(swab, editSwab) {
    console.log(swab);
    const modal = await this.modalController.create({
      component: ModalSwabComponent,
      componentProps: {
        editSwab,
        type: swab?.type,
        date: swab?.date.split(' ')[0],
        time: swab?.date.split(' ')[1],
        team_id: swab?.team_id,
        patient_id: swab?.patient_id,
        positive_res: swab?.positive_res,
        done: swab?.done,
        patients: this.patients,
        phone: swab?.phone,
      },
    });
    await modal.present();

    const { data: swabModified, role } = await modal.onWillDismiss();
    if (role === 'saved') {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Saved successfly!',
        buttons: ['Close'],
      });
      let dateToPush = editSwab
        ? swabModified.value.date +
          ' ' +
          swabModified.value.time.substring(0, 5)
        : swabModified.value.date.split('T')[0] +
          ' ' +
          swabModified.value.time.split('T')[1].substring(0, 5);
      const swabFinal: [any, string, string, string, number, number] = [
        swabModified.value.team_id,
        dateToPush,
        swabModified.value.type,
        swabModified.value.patient_id,
        Number(swabModified.value.done),
        Number(swabModified.value.positive_res),
      ];
      const res = editSwab
        ? this.swabService.updateSwab(swab.swab_id, ...swabFinal)
        : this.swabService.addSwab(...swabFinal);
      res && (await alert.present());
      dateToPush = dateToPush.substring(0, 10);

      const index =
        editSwab &&
        this.swabs[dateToPush].findIndex(
          ({ swab_id }) => swab.swab_id === swab_id
        );
      const patientInfo = this.patients.find(
        (patient) => patient.patient_id == Number(swabFinal[3])
      );
      editSwab
        ? (this.swabs[dateToPush][index] = {
            swab_id: swab.swab_id,
            team_id: swabFinal[0],
            date: swabFinal[1],
            type: swabFinal[2],
            done: swabFinal[4],
            positive_res: swabFinal[5],
            patient_id: patientInfo.patient_id,
            address: patientInfo.address,
            phone: patientInfo.phone,
            name: patientInfo.name,
          })
        : this.swabs[dateToPush] &&
          this.swabs[dateToPush].push({
            ...swabFinal,
            team_id: swabFinal[0],
            date: swabFinal[1],
            type: swabFinal[2],
            done: swabFinal[4],
            positive_res: swabFinal[5],
            address: patientInfo.address,
            phone: patientInfo.phone,
            name: patientInfo.name,
          });
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
}
