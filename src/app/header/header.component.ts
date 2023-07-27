import { Component, OnInit } from '@angular/core';
import { HairDresserService } from '../services/hairdresser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUserInfo!: any;

  constructor(private hairdresserService: HairDresserService) {}

  ngOnInit(): void {
    let loggedInUserId = localStorage.getItem('id');
    console.log("loggedInUserId= ", loggedInUserId);
    if (loggedInUserId != null) {
      this.hairdresserService.getUserWithRoleById(loggedInUserId)
      .subscribe({
        next: (response) => {
          console.log("loggedInUserInfo= ", response);
          this.loggedInUserInfo = response;
        },
        error: (e) => console.log("Wrong id!")
      });
    }
  }

  assignCustomerRole() {
    console.log("user name=" + this.loggedInUserInfo.username)
    this.hairdresserService.assignRole(this.loggedInUserInfo.username, "customer")
    .subscribe({
      next: (response) => {
        console.log("response= ", response);
        window.location.reload();
      },
      error: (e) => console.log("error= " + e)
    });
  }

  logOutUser() {
    this.hairdresserService.logOutUser();
  }

}