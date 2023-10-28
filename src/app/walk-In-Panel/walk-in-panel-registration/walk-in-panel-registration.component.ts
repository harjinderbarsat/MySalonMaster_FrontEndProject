import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { ClientModel } from 'src/app/shared-module/models/client.model';
import { ClientService } from 'src/app/shared-module/service/client.service';

@Component({
  selector: 'app-walk-in-panel-registration',
  templateUrl: './walk-in-panel-registration.component.html',
  styleUrls: ['./walk-in-panel-registration.component.css']
})
export class WalkInPanelRegistrationComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private clientService: ClientService) { }
  public searchForm: FormGroup;
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  inProgress: boolean
  newClient: ClientModel
  isSerchingDone: boolean
  isUserExist: boolean
  ngbDateOfBirth: NgbDateStruct;
  type: string;
  searchSubmit: boolean = false;
  nextSubmit: boolean = false;

  ngOnInit() {
    this.inProgress = false;
    this.isSerchingDone = false;
    this.isUserExist = false;
    this.newClient = new ClientModel();
    this.newClient.territory = 'QLD';
    this.type = this.activeRoute.snapshot.params.type;
    localStorage.removeItem('currentSelectedStatus');
    localStorage.setItem('currentSelectedStatus', JSON.stringify(this.type));
    this.searchForm = this.fb.group({
      mobile: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      fName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      lName: ["", [Validators.pattern('^[a-zA-Z ]*$')]],
      mailId: ["", [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$')]],
      postcode: ["", [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]+$')]],
      suburb: ["", ''],
      branch: ["", ''],
      street_number: ["", ''],
      street_name: ["", [Validators.pattern('^[a-zA-Z ]*$')]],
      territory: ["", ''],
      add: ["", ''],
    });
  }

  get searchFormAlias() { return this.searchForm.controls; }

  BackToHome() {
    window.location.href = window.location.origin + "/#login";
  }

  BackToSearch() {
    this.isSerchingDone = false;
    this.isUserExist = false;
    this.newClient = new ClientModel();
  }

  searchClient() {
    this.searchSubmit = true;
    if (this.searchForm.valid) {
      if (!this.newClient.mobile || this.newClient.mobile === '') {
        this.cService.getToaster('Kindly enter your mobile number', 'warning', 'Mobile Number Not Found');
        return;
      }
      if (this.newClient.mobile.length === 10) {
        this.inProgress = true;
        this.isUserExist = false;
        this.clientService.getClientByMobile(this.newClient.mobile).subscribe(async response => {
          if (response && response.data) {
            this.newClient = response.data;
            this.newClient.territory = 'QLD';
            var addedDate = new Date(this.newClient.date_of_birth);
            this.ngbDateOfBirth = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
          } else {
            this.isInfoUpdate = true;
            this.cService.getToaster('Kindly Register yourself', 'info', 'Your Details Not Found');
          }
          this.isSerchingDone = true;

          this.inProgress = false;
        }, async error => {
          this.inProgress = false;
          this.cService.getToaster('Application error', 'error', 'Error');
        });
        this.isSerchingDone = true;

      } else {
        this.cService.getToaster('Kindly enter correct mobile number', 'warning', 'Mobile Number Incorrect');
      }
    }

  }

  appointmentModel: AppointmentsModel;
  isInfoUpdate: boolean = false;
  chooseService() {
    if ((!this.newClient.firstname || (this.newClient.firstname && this.newClient.firstname.length <= 0))  
    ) {
      this.cService.getToaster('First Name  is mendatory.', 'error', 'Error');
    }
    else {
      this.nextSubmit = true;
      if (this.searchForm.valid) {
        this.appointmentModel = new AppointmentsModel();
        if (this.isInfoUpdate) {
          this.inProgress = true;
          if (this.ngbDateOfBirth != null && this.ngbDateOfBirth != undefined) {
            this.newClient.date_of_birth = this.datePipe.transform(new Date(this.ngbDateOfBirth.year, (this.ngbDateOfBirth.month - 1), this.ngbDateOfBirth.day), 'yyyy-MM-dd');
          }
          if (this.newClient.id) {
            this.clientService.updateClient(this.newClient).subscribe(async response => {
              if (response && response.data) {
                //this.cService.getToaster('Client updated succesfully', 'success', 'Success');
                this.appointmentModel.customerId = response.data.id;
                this.cService.setCurrentSelectAppointment(this.appointmentModel);
                window.location.href = window.location.origin + "/#/walkIn/selectServices";
              }
              else{
                this.cService.getToaster(response.message, 'error', 'Error');
              }
              this.inProgress = false;
            }, async error => {
              this.inProgress = false;
              this.cService.getToaster('Application error', 'error', 'Error');
            });
          } else {
            this.clientService.saveClient(this.newClient).subscribe(async response => {
              if (response && response.data) {
                this.cService.getToaster('Client saved succesfully', 'success', 'Success');
                this.appointmentModel.customerId = response.data.id;
                this.cService.setCurrentSelectAppointment(this.appointmentModel);
                window.location.href = window.location.origin + "/#/walkIn/selectServices";
                
              }
              else{
                this.cService.getToaster(response.message, 'error', 'Error');
              }
              this.inProgress = false;
            }, async error => {
              this.inProgress = false;
              this.cService.getToaster('Application error', 'error', 'Error');
            });
          }
        } else {
          this.appointmentModel.customerId = this.newClient.id;
          this.cService.setCurrentSelectAppointment(this.appointmentModel);
          window.location.href = window.location.origin + "/#/walkIn/selectServices";
        }
      }
    }
  }

  ifAnyChangeOccured() {
    this.isInfoUpdate = true;
  }

  back() {
    window.location.reload();
  }

}
