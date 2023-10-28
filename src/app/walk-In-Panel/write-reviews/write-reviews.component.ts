import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { ClientModel } from 'src/app/shared-module/models/client.model';
import { Feedback } from 'src/app/shared-module/models/feedback.model';
import { AppointmentsService } from 'src/app/shared-module/service/appointments.service';
import { ClientService } from 'src/app/shared-module/service/client.service';
import { ReviewService } from 'src/app/shared-module/service/review.service';
@Component({
  selector: 'app-write-reviews',
  templateUrl: './write-reviews.component.html',
  styleUrls: ['./write-reviews.component.css']
})
export class WriteReviewsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public cService: CommonService, private cookieService: CookieService, private clientService: ClientService,
    public appointmentsService: AppointmentsService, public reviewService: ReviewService) { }
  inProgress: boolean
  public searchForm: FormGroup;
  public reviewForm: FormGroup;
  phone: string = ''
  comment: string;
  feedBack: Feedback

  newClient: ClientModel;
  isSerchingDone: boolean;
  appointmentsList: Array<AppointmentsModel>;
  ngOnInit() {
    this.searchForm = this.fb.group({
      mobile: ['', [Validators.required]],
    });
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
    this.isTheUserSearched = false;
    this.appointmentSelected = false;
    this.inProgress = false;
    this.isSerchingDone = false;
    this.newClient = new ClientModel();
    this.appointmentsList = new Array<AppointmentsModel>();
    this.feedBack = new Feedback();
    setTimeout(function () { this.backToHome() }, 2000);

  }
  isTheUserSearched: boolean
  appointmentSelected: boolean;


  selectAppointment(appointment: AppointmentsModel) {
    this.feedBack.appointmentId = appointment.id;
    this.appointmentSelected = true;
  }

  raiting(r) {
    this.feedBack.rating = r;
  }

  search() {
    if (!this.phone || this.phone === '') {
      this.cService.getToaster('Kindly enter your mobile number', 'warning', 'Mobile Number Not Found');
      return;
    }
    if (this.phone.length === 10) {
      this.inProgress = true;
      this.clientService.getClientByMobile(this.phone).subscribe(async response => {
        if (response && response.data) {
          this.newClient = response.data;
          this.getAppointmentsList(this.newClient.mobile);
          this.isTheUserSearched = true;
        } else {
          this.cService.getToaster('Kindly Register yourself', 'info', 'Your Details Not Found');
        }
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
      this.isSerchingDone = true;
    } else {
      this.cService.getToaster('Kindly enter correct mobile number', 'warning', 'Mobile Number Incorrect');
    }
  }

  getAppointmentsList(mobile) {
    this.inProgress = true;
    this.appointmentsService.getAppointmentsByMobileForFeedback(mobile).subscribe(async response => {
      if (response.isSuccess == true) {
        this.appointmentsList = response.data;
      }
      if (!this.appointmentsList || (this.appointmentsList && this.appointmentsList.length <= 0)) {
        this.isTheUserSearched = false;
        this.cService.getToaster('You have not taken any service yet to add a review for.', 'error', 'Error');
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  addReview() {
    this.inProgress = true;
    this.feedBack.client_id = this.newClient.id;
    this.feedBack.review = this.comment;
    this.reviewService.saveFeedback(this.feedBack).subscribe(async response => {
      this.cService.getToaster('Your review has been Added Succssfully', 'success', 'Done!')
      window.location.href = window.location.origin + "/#/walkIn/bookAppointment";
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  backToHome() {
    window.location.href = window.location.origin + "/#/walkIn/bookAppointment";
  }
}
