import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ClientModel } from '../../models/client.model';
import { ClientService } from '../../service/client.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/front-end/models/login.model';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css']
})
export class ManageClientComponent implements OnInit {
  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public clientForm: FormGroup;
  clientInfo: ClientModel;
  ngbDateOfBirth: NgbDateStruct;
  currentUser: User;
  backURL: string = '';

  constructor(private activeRoute: ActivatedRoute, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.backURL = localStorage.getItem("appointmentURL") ? localStorage.getItem("appointmentURL") : "";
    localStorage.setItem("appointmentURL", "");
    this.inProgress = false;
    this.clientInfo = new ClientModel();
    this.clientInfo.territory = 'QLD';

    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date_of_birth: ['', ''],
      mobile: ['', [Validators.required]],
      postcode: ["", [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]+$')]],
      suburb: ["", ''],
      branch: ["", ''],
      street_number: ["", ''],
      street_name: ["", [Validators.pattern('^[a-zA-Z ]*$')]],
      territory: ["", ''],
      add: ["", ''],
    });
    this.id = this.activeRoute.snapshot.params.id;


    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getClient(this.id)
    }
    this.currentUser = this.cService.getUserProfile();

  }

  getClient(client_id: number) {
    this.clientService.getClientById(client_id).subscribe(async response => {
      this.clientInfo = response.data;
      var addedDate = new Date(this.clientInfo.dateOfBirth);
      this.ngbDateOfBirth = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveClient() {

    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    this.inProgress = true;

    if (this.ngbDateOfBirth != null && this.ngbDateOfBirth != undefined) {
      this.clientInfo.dateOfBirth = this.datePipe.transform(new Date(this.ngbDateOfBirth.year, (this.ngbDateOfBirth.month - 1), this.ngbDateOfBirth.day), 'yyyy-MM-dd');
    }

    if (this.isEditMode) {
      this.clientService.updateClient(this.clientInfo).subscribe(async response => {
        this.cService.getToaster('Client updated succesfully', 'success', 'Success');
        if (this.backURL && this.backURL.length > 0) {
          window.location.href = this.backURL;
        }
        else
          window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/customer";
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.clientService.saveClient(this.clientInfo).subscribe(async response => {
        this.cService.getToaster('Client saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/customer";


        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

}
