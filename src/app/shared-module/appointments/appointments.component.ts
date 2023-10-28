import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { AppointmentsModel, paymentStatus } from '../models/appointments.model';
import { AppointmentsService } from '../service/appointments.service';
import { User } from 'src/app/front-end/models/login.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EmployeeModel } from '../models/employee-model.model';
import { EmployeeService } from '../service/employee.service';
import { ClientService } from '../service/client.service';
import { ClientModel } from '../models/client.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-appointments-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  currentRoute: string;
  constructor(private router: Router, private datePipe: DatePipe, private clientService: ClientService, private employeeService: EmployeeService, private activeRoute: ActivatedRoute, private modalService: NgbModal, public cService: CommonService, public appointmentsService: AppointmentsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.prevUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  prevUrl: string;
  currentUrl: string;
  inProgress: boolean
  showFilter: boolean = false;
  appointmentsList: Array<AppointmentsModel>;
  currentUser: User
  @Input() appointmentType: string
  appointmentFilter: AppointmentsModel
  appointmentTypeDisplayName: string
  appointmentDateTime: NgbDateStruct;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  MyTitle: string = "Appointment's List";



  ngOnInit() {
    this.appointmentsList = new Array<AppointmentsModel>();
    this.appointmentFilter = new AppointmentsModel();
    this.appointmentFilter.status = this.appointmentType;

    if (this.appointmentType == 'in-progress') {
      this.appointmentTypeDisplayName = 'In Progress';
    } else if (this.appointmentType == 'upcoming') {
      this.appointmentTypeDisplayName = 'Upcoming';
    } else if (this.appointmentType == 'completed') {
      this.appointmentTypeDisplayName = 'Historic';
    }

    this.appointmentFilter.hours = '';
    this.appointmentFilter.customerId = 0;
    this.appointmentFilter.assignToId = 0;

    this.getAppointmentsList();
    this.getEmployeeList();
    this.getClientsList();
    this.currentUser = this.cService.getUserProfile();

    setInterval(() => {
      //this.getListWithTimer();
    }, 3000);

  }

  getListWithTimer() {
    if (this.currentUrl.indexOf('upcoming-appointments') >= 0 || this.currentUrl.indexOf('in-progress-appointments') >= 0 || this.currentUrl.indexOf('in-progress-appointments') >= 0) {
      this.getAppointmentsList(false);
    }
  }

  getAppointmentsList(showLoader = true) {
    if (showLoader)
      this.inProgress = true;
    if (this.appointmentDateTime != null && this.appointmentDateTime != undefined) {
      this.appointmentFilter.dateAndTime = this.datePipe.transform(new Date(this.appointmentDateTime.year, (this.appointmentDateTime.month - 1), this.appointmentDateTime.day), 'yyyy-MM-dd');
    }
    if (this.endDate != null && this.endDate != undefined) {
      this.appointmentFilter.endDate = this.datePipe.transform(new Date(this.endDate.year, (this.endDate.month - 1), this.endDate.day), 'yyyy-MM-dd');
    }
    if (this.startDate != null && this.startDate != undefined) {
      this.appointmentFilter.startDate = this.datePipe.transform(new Date(this.startDate.year, (this.startDate.month - 1), this.startDate.day), 'yyyy-MM-dd');
    }
    this.appointmentFilter.status = this.appointmentType;

    this.appointmentsService.getAppointmentsListByfilter(this.appointmentFilter).subscribe(async response => {
      this.appointmentsList = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  resetFilter() {
    this.appointmentFilter = new AppointmentsModel();
    this.appointmentFilter.startDate = null;
    this.appointmentFilter.endDate = null;
    this.appointmentFilter.dateAndTime = null;

    this.appointmentDateTime = null;
    this.startDate = null;
    this.endDate = null;
    this.getAppointmentsList();
  }

  hideShowFilter() {
    this.showFilter = !this.showFilter;
  }

  deleteAppointment(appointment: AppointmentsModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this appointments!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.appointmentsService.deleteAppointment(appointment.id).subscribe(async response => {
            this.inProgress = false;
            this.getAppointmentsList();
            if (response.isSuccess) {
              this.cService.getToaster('Appointment deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  selectedAppointment: AppointmentsModel
  viewDetail(content, appointment: AppointmentsModel) {
    this.selectedAppointment = new AppointmentsModel();
    this.selectedAppointment = appointment;
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  addEditAppointment(appointmentId: number) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/appointment-manage/" + appointmentId;
  }

  updatedAppointment: AppointmentsModel
  appointmentStatusUpdatePopUp(content, appointment: AppointmentsModel, status: string) {
    this.updatedAppointment = new AppointmentsModel();
    this.updatedAppointment = Object.assign(this.updatedAppointment, appointment);
    this.updatedAppointment.status = status;
    if (this.updatedAppointment.status == 'in-progress') {
      this.modalService.open(content, { size: "xs", backdrop: "static" });
    } else {

      Swal.fire({
        title: 'Are you sure?',
        text: 'Once this appointments will finish, cannot move into in progress!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'N0'
      })
        .then((willDelete) => {
          if (willDelete.value) {
            this.inProgress = true;
            this.appointmentStatusUpdate();
          }
        });
    }
  }

  appointmentStatusUpdate() {
    this.modalService.dismissAll();
    this.appointmentsService.updateAppointment(this.updatedAppointment).subscribe(async response => {
      if (response && response.isSuccess && response.data) {
        if (response.data.status == 'in-progress') {
          this.cService.getToaster('Appointment started succesfully', 'success', 'Success');
          this.getAppointmentsList();
        } else if (response.data.status == 'completed') {
          this.cService.getToaster('Appointment finished succesfully', 'success', 'Success');
          window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/payment/" + response.data.id + "/appointment";
        }
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  appointmentPayment(id) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/payment/" + id + "/appointment";
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
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.appointmentsList && this.appointmentsList.length > 0) {
        this.appointmentsList.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.appointmentsList && this.appointmentsList.length > 0) {
        this.appointmentsList.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(appointment: AppointmentsModel, event) {
    if (event.target.checked) {
      appointment.isSelected = true;
    } else {
      appointment.isSelected = false;
    }
    if (this.appointmentsList.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }

  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.appointmentsList.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this appointments!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.appointmentsService.deleteMultipleAppointment(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getAppointmentsList();
            if (response.isSuccess) {
              this.cService.getToaster('Appointments deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

   // --------------------------------Reporting and Printing ------------------------------------
   isPrintView: boolean = false;
   hideShowPrintView() {
     this.isPrintView = !this.isPrintView;
   }
 
   downloadXslx(): void {
     let element = document.getElementById('table-xsls');
     this.cService.download_XLSX(element, 'Clients List')
     this.isPrintView = false;
   }

}
