import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert404',
  templateUrl: './alert404.component.html',
  styleUrls: ['./alert404.component.scss'],
})
export class Alert404Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  notFoundToPatient() {
    console.log('ciao');
    this.router.navigateByUrl('/tabs/tab1');
  }

  from404toPatient() {
    this.router.navigateByUrl('/tabs/patients');
  }
  from404toSwab() {
    this.router.navigateByUrl('/tabs/swabsTab');
  }
}
