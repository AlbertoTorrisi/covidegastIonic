import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentAuthTokenValue() {
    return localStorage.getItem('token');
  }
  logIn = (token: string) => {
    console.log('token');
    localStorage.setItem('token', token);
  };

  logOut = () => localStorage.removeItem('token');
}
