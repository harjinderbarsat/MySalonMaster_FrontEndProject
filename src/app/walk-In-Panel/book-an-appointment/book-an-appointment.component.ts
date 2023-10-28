import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.css']
})
export class BookAnAppointmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  bookAnAppointment() {
    window.location.href = window.location.origin + "/#/walkIn/clientRegistration/offline";

  }

  checkIn() {
    window.location.href = window.location.origin + "/#/walkIn/checkIn";

  }

  writeReview() {
    window.location.href = window.location.origin + "/#/walkIn/writeReview";

  }

}
