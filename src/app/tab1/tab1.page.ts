import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @Input() patiendToAdd:any;
 
  constructor() {}

  emitPatientToAdd(patient){
    this.patiendToAdd=patient;
    console.log("eccolo l'event emittere", patient)

  }

}
