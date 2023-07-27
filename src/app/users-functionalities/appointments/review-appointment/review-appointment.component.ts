import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-appointment',
  templateUrl: './review-appointment.component.html',
  styleUrls: ['./review-appointment.component.css']
})
export class ReviewAppointmentComponent implements OnInit {
  public appointmentId!: number;

  public formAppointmentReview = new FormGroup({
    rating: new FormControl(0, Validators.required),
    comments: new FormControl('', Validators.required),
  });

  public hoveredStars: number = 0;
  public selectedStars: number = 0;

  constructor
  (
    private hairdresserService: HairDresserService,
    private route: ActivatedRoute,
    private popUpMessagesService: PopUpMessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Get the id of the appointment from the route
    // Method 1:
    this.route.paramMap.subscribe(params => {
      this.appointmentId = Number(params.get('appointmentId'));
    });
    // Method 2:
    //console.log(Number(this.route.snapshot.paramMap.get('appointmentId')));
  }

  get formAppointmentReviewGetter () { return this.formAppointmentReview.controls; }

  createAppointmentReview() {
    let userInputReview = this.formAppointmentReview.value;
    console.log("userInputReview= ", userInputReview);

    this.hairdresserService.reviewAppointment(this.appointmentId, userInputReview)
    .subscribe({
      next: (result) => this.popUpMessagesService.showPopUpMessage("Appointment successfully reviewed!", "OK", "success"),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to review the appointment!", "OK", "error"),
      complete: () => this.router.navigate(['profile/customer/appointment/finished'])
    });
  }

  onStarClicked(star: number) {
    console.log('Clicked star number:', star);
    // Save the value of the star so when the user clicks on a star and takes the mouse off, the gold-stars will remain.
    this.selectedStars = star;
    // Save the value in the form because I couldn't save it dirrectly from HTML.
    this.formAppointmentReview.patchValue({ rating: star });
  }
}