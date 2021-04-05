import { Component, EventEmitter, Output } from '@angular/core';
import { PickerController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  startDate: string;
  endDate: string;
  errorDateBefore = false;
  searchDaysArr = [];
  constructor() {}

  searchByDate(event) {
    let searchStart = this.startDate.substring(0, 10);
    let searchEnd = this.endDate.substring(0, 10);
    // console.log('searcstart', searchStart);
    // console.log('searchEnd', searchEnd);
    if (!moment(this.endDate).isBefore(this.startDate)) {
      this.errorDateBefore = false;
      this.searchDaysArr.length = 0;
      this.searchDaysArr.push(searchStart, searchEnd);

      console.log('searchDaysArr', this.searchDaysArr);
    } else {
      console.log('la data di fine è precedente alla data di inizio');
      this.errorDateBefore = true;
    }
  }
}
