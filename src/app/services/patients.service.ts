import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../interface/patient';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  url: string = `https://covid19-tracker-server.herokuapp.com/patients/`;
  active: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAllPatients = async () =>
    this.httpClient.get<Patient[]>(this.url).toPromise();

  getPatient = async (id: string) =>
    this.httpClient
      .get<Patient>(
        `https://covid19-tracker-server.herokuapp.com/patients/${id}`
      )
      .toPromise();

  addPatient = async (
    name: string,
    email: string,
    dob: string,
    fiscal_code: string,
    address: string,
    phone: string,
    hasCovid: number
  ) =>
    this.httpClient
      .post(this.url, {
        name,
        email,
        dob,
        fiscal_code,
        address,
        phone,
        hasCovid,
      })
      .toPromise();

  updatePatient = async (
    id: number,
    address: string,
    email: string,
    phone: number,
    hasCovid: number
  ) =>
    this.httpClient
      .put(`https://covid19-tracker-server.herokuapp.com/patients/${id}`, {
        address,
        email,
        phone,
        hasCovid,
      })
      .toPromise();

  deletePatient = async (id: number) =>
    this.httpClient
      .delete<Patient>(
        `https://covid19-tracker-server.herokuapp.com/patients/${id}`
      )
      .toPromise();
}
