import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../interface/list-of-patients';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  url: string = `https://covid19-tracker-server.herokuapp.com/patients/`;
  active: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  handleHttpErrors = (err: any) => {
    console.log(err);
    alert(err.error ? err.error : err.message);
    if (err.status === 401) {
      this.router.navigate(['login']);
    }
  };
  getAllPatients = async () =>
    this.httpClient
      .get<Patient[]>(this.url)
      .toPromise()
      .catch(this.handleHttpErrors);

  getPatient = async (id: string) =>
    this.httpClient
      .get<Patient>(
        `https://covid19-tracker-server.herokuapp.com/patients/${id}`
      )
      .toPromise()
      .catch(this.handleHttpErrors);

  addPatient = async (
    name: string,
    email: string,
    dob: string,
    fiscal_code: string,
    address: string,
    phone: string,
    hasCovid: number
  ) =>
    this.httpClient.post(this.url, {
      name,
      email,
      dob,
      fiscal_code,
      address,
      phone,
      hasCovid,
    });

  updatePatient = async (
    id: number,
    name: string,
    address: string,
    email: string,
    phone: number,
    hasCovid: number,
    dob: string,
    fiscal_code: string
  ) =>
    this.httpClient.put(
      `https://covid19-tracker-server.herokuapp.com/patients/${id}`,
      { name, address, email, phone, hasCovid, dob, fiscal_code }
    );

  deletePatient = async (id: number) =>
    this.httpClient.delete<Patient>(
      `https://covid19-tracker-server.herokuapp.com/patients/${id}`
    );
}
