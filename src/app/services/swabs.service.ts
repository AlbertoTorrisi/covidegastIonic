import { SwabCalendar } from './../interface/list-of-swabs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Swab } from '../interface/list-of-swabs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SwabsService {
  url: string = 'https://covid19-tracker-server.herokuapp.com/swabs';

  constructor(private httpClient: HttpClient, private router: Router) {}
  handleHttpErrors = (err: any) => {
    alert(err.error ? err.error : 'Error');
    if (err.status === 401) {
      this.router.navigate(['login']);
    }
  };

  allSwabs = () =>
    this.httpClient
      .get<SwabCalendar>(this.url)
      .toPromise()
      .catch(this.handleHttpErrors);

  allSwabsByDate = (dateStart: string, dateEnd: string) =>
    this.httpClient
      .get<SwabCalendar>(
        `${this.url}?startDate=${dateStart}&endDate=${dateEnd}`
      )
      .toPromise()
      .catch(this.handleHttpErrors);

  addSwab = (
    team_id: string,
    date: string,
    type: string,
    patient_id: string,
    done: number,
    positive_res: number
  ) =>
    this.httpClient.post(this.url, {
      team_id,
      date,
      type,
      patient_id,
      done,
      positive_res,
    });
  updateSwab = (
    swab_id: number,
    team_id: number,
    date: string,
    type: string,
    patient_id: string,
    done: number,
    positive_res: number
  ) =>
    this.httpClient.put(`${this.url}/${swab_id}`, {
      team_id,
      date,
      type,
      patient_id,
      done,
      positive_res,
    });
  deleteSwab = (swab_id: number) =>
    this.httpClient
      .delete(`${this.url}/${swab_id}`)
      .toPromise()
      .catch(this.handleHttpErrors);
}
