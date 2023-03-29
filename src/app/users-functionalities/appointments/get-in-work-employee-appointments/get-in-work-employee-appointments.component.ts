import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-get-in-work-employee-appointments',
  templateUrl: './get-in-work-employee-appointments.component.html',
  styleUrls: ['./get-in-work-employee-appointments.component.css']
})
export class GetInWorkEmployeeAppointmentsComponent implements OnInit {
  employeeAppointmentsInWork$: any;
  displayedColumns: string[] = ['#', 'customerName', 'startDate', 'endDate', 'hairServices', 'price', 'cancel'];
  currentDate: any; // ??? string

  constructor
  (
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    private datePipe: DatePipe
  )
  {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    console.log("today= ", this.currentDate);
  }

  ngOnInit(): void {
    let employeeId = String(localStorage.getItem('id'));

    this.hairdresserService.getInWorkAppointmentsByEmployeeId(employeeId)
    .subscribe({
      next: (res) =>  {
        console.log("res= ", res);
        this.employeeAppointmentsInWork$ = res;
      },
      error: (e) => {
        console.log("e= ", e);
        if (typeof e.error == "object") {
          this.popUpMessagesService.showPopUpMessage(e.error.Message, "OK", "error");
        } else {
          this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error");
        }
      },
    });
  }

  checkIfStartDateIsToday(appointmentStartDate: Date): string {
    console.log("appointmentStartDate= ", appointmentStartDate);
    const appointmentStartDateFormatted = this.datePipe.transform(appointmentStartDate, 'dd/MM/yyyy');
    console.log("appointmentStartDateFormatted= ", appointmentStartDateFormatted);
    if (appointmentStartDateFormatted === this.currentDate) return 'green-text';
    return '';
  }

  checkIfAppointmentIsInWork(appointmentStartDate: Date) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    /* Example:
    current date: 3/10/2022 10:00:00
    appointment start date 1: 4/10/2022 07:00:00 => CAN'T CANCEL
    appointment start date 2: 4/10/2022 10:30:00 => CAN CANCEL
    */
    if (moment(appointmentStartDate).isAfter(currentDate)) return true;
    return false;
  }

  cancelInWorkAppointment(appointmentId: number) {
    this.hairdresserService.deleteAppointmentById(appointmentId)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to cancel appointment!", "OK", "error"),
      complete: () => this.popUpMessagesService.showPopUpMessage("Appointments successfully canceled!", "OK", "success"),
    });
  }
}
