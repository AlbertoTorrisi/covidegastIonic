import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(public auth: AuthenticationService, private router: Router) {}
  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
