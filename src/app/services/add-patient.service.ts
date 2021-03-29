import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
  /*

 BISOGNA UTILIZZARE UN SERVICE PER FAR AGGIORNARE LA LISTA DEGLI UTENTI DOPO AVER INSERITO L'UTENTE CORRETTAMENTE?
 Oppure mettiamo il bottone aggiungi paziente come component interno della lista e gestiamo tutto tramite event emitter?CONSIGLI?

  */
  public patient:any; 

  constructor() { }

  setPatient(patient:any) {
    console.log("service patient:",patient);
    this.patient=patient;
  }

  getPatient():any{
    return this.patient;
  }
}
