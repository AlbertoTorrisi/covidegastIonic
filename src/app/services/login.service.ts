import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = `https://covid19-tracker-server.herokuapp.com/users/login`;
  active: any;
  constructor(private httpClient: HttpClient) {}
  login = (username: string, password: string) => {
    try {
      return this.httpClient.post<HttpResponse<any>>(
        this.url,
        {
          username,
          password,
        },
        { observe: 'response' }
      );
    } catch (error) {
      console.log(error);
    }
  };
}
