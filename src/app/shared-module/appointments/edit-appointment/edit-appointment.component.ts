import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from '../../models/appointments.model';
import { ClientModel } from '../../models/client.model';
import { EmployeeModel } from '../../models/employee-model.model';
import { ServiceCategoryModel, ServiceModel } from '../../models/servic.model';
import { AppointmentsService } from '../../service/appointments.service';
import { ServiceAndCategoryServices } from '../../service/branch-categories.service';
import { ClientService } from '../../service/client.service';
import { EmployeeService } from '../../service/employee.service';
import { User } from 'src/app/front-end/models/login.model';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  appointmentDateTime: NgbDateStruct;
  appointmentStartDateTime: NgbDateStruct;
  appointmentEndDateTime: NgbDateStruct;
  appointmentInfo: AppointmentsModel
  currentUser: User

  public appointmentForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private servicesService: ServiceAndCategoryServices, private employeeService: EmployeeService, private clientService: ClientService, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private appointmentService: AppointmentsService) { }

  ngOnInit() {
    this.inProgress = true;
    this.appointmentInfo = new AppointmentsModel();
    this.currentUser = this.cService.getUserProfile();

    this.id = this.activeRoute.snapshot.params.id;
    if (this.id == 0) {
      this.isEditMode = false;
      this.getClientsList();
    } else {
      this.isEditMode = true;
      this.getAppointment(this.id)
    }

    this.appointmentForm = this.fb.group({
      customerId: ['', ''],
      servicesId: ['', ''],
      dateAndTime: ['', ''],
      startDate: ['', ''],
      EndDate: ['', ''],
      status: ['', ''],
      payment: ['', ''],
      assignToId: ['', ''],
    });
  }

  getAppointment(appointmentId: number) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe(async response => {
      this.appointmentInfo = response.data[0];

      var addedDate = new Date(this.appointmentInfo.dateAndTime);
      this.appointmentDateTime = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());

      var addedDate = new Date(this.appointmentInfo.startedAt);
      this.appointmentStartDateTime = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());

      var addedDate = new Date(this.appointmentInfo.completedAt);
      this.appointmentEndDateTime = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
      this.getClientsList();

    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  clients: Array<ClientModel>
  getClientsList() {
    this.clients = new Array<ClientModel>();
    this.clientService.getClientList().subscribe(async response => {
      this.clients = response.data;
      this.getEmployeeList();
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  employeesList: Array<EmployeeModel>;
  getEmployeeList() {
    this.employeesList = new Array<EmployeeModel>();
    this.employeeService.getEmployeeList().subscribe(async response => {
      this.employeesList = response.data;
      this.getServicesList()
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  services: Array<ServiceModel>
  getServicesList() {
    this.services = new Array<ServiceModel>();
    this.servicesService.getServiceList().subscribe(async response => {
      this.services = response.data;
      this.inProgress = false;
      this.getCategoriesList();
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  categories: Array<ServiceCategoryModel>
  getCategoriesList() {
    this.categories = new Array<ServiceCategoryModel>();
    this.servicesService.getCategoryList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.categories = response.data;
        this.categories.forEach(l => {
          let filterServices = this.services.filter(p => p.categoryId == l.id);
          if (this.appointmentInfo && this.appointmentInfo.servicesIds && this.appointmentInfo.servicesIds.length > 0) {
            filterServices.forEach(element => {
              this.appointmentInfo.servicesIds.forEach(sId => {
                if (sId == element.id)
                  element.isSelected = true;
              });

            });
          }
          l.services = new Array<ServiceModel>();
          l.services = filterServices;
        })

      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveAppointment() {
    this.inProgress = true;

    if (this.appointmentDateTime != null && this.appointmentDateTime != undefined) {
      this.appointmentInfo.dateAndTime = this.datePipe.transform(new Date(this.appointmentDateTime.year, (this.appointmentDateTime.month - 1), this.appointmentDateTime.day), 'yyyy-MM-dd');
    }
    if (this.appointmentStartDateTime != null && this.appointmentStartDateTime != undefined) {
      this.appointmentInfo.startedAt = this.datePipe.transform(new Date(this.appointmentStartDateTime.year, (this.appointmentStartDateTime.month - 1), this.appointmentStartDateTime.day), 'yyyy-MM-dd');
    }
    if (this.appointmentEndDateTime != null && this.appointmentEndDateTime != undefined) {
      this.appointmentInfo.completedAt = this.datePipe.transform(new Date(this.appointmentEndDateTime.year, (this.appointmentEndDateTime.month - 1), this.appointmentEndDateTime.day), 'yyyy-MM-dd');
    }

    this.appointmentInfo.servicesIds = [];
    this.appointmentInfo.totalAmount = 0;
    this.categories.forEach(p => {
      p.services.forEach(k => {
        if (k.isSelected) {
          this.appointmentInfo.servicesIds.push(k.id);
          const price = this.services.find(ser => ser.id == k.id);
          this.appointmentInfo.totalAmount = Number(this.appointmentInfo.totalAmount) + Number((price ? price.price : 0));
        }
      });
    });

    if (this.isEditMode) {
      this.appointmentService.updateAppointment(this.appointmentInfo).subscribe(async response => {
        this.cService.getToaster('Appointment updated succesfully', 'success', 'Success');

        if (this.appointmentInfo.status == 'upcoming') {
          window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/upcoming-appointments";

        } else if (this.appointmentInfo.status == 'in-progress') {
          window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/in-progress-appointments";

        } else if (this.appointmentInfo.status == 'completed') {
          window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/historic-appointments";
        }

        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.appointmentService.saveAppointment(this.appointmentInfo).subscribe(async response => {
        this.cService.getToaster('Appointment saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/appointments/inProgress";


        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  editClient(id: number) {
    localStorage.setItem("appointmentURL", window.location.href);
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/manage-clients/" + id;
  }


  onSelectDeselect(serviceModel: ServiceModel) {
    serviceModel.isSelected = !serviceModel.isSelected;
  }

  back(){
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/upcoming-appointments";

  }

}
