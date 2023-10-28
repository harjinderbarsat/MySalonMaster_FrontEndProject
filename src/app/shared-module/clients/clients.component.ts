import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../service/client.service';
import { User } from 'src/app/front-end/models/login.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from '../service/appointments.service';
import { AppointmentsModel } from '../models/appointments.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-branch-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

  clients: Array<ClientModel>
  allClients: Array<ClientModel>
  constructor(public appointmentsService: AppointmentsService, private modalService: NgbModal, public cService: CommonService, private clientService: ClientService
    , private router: Router) {
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
  currentUser: User;
  appointmentFilter: AppointmentsModel;
  appointmentsList: Array<AppointmentsModel>;

  ngOnInit() {
    this.inProgress = false;
    this.clients = new Array<ClientModel>();
    this.appointmentsList = new Array<AppointmentsModel>();
    this.appointmentFilter = new AppointmentsModel();
    this.getClientsList();
    this.currentUser = this.cService.getUserProfile();

    setInterval(() => {
      //this.getListWithTimer();
    }, 3000)
  }



  // getListWithTimer() {
  //   if (this.currentUrl.indexOf('customer') >= 0) {
  //     this.getClientsList(false);
  //   }
  // }

  getClientsList(showLoader = true) {
    if (showLoader)
      this.inProgress = true;
    this.clientService.getClientList().subscribe(async response => {
      this.allClients = response.data;
      this.clients = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteClient(client: ClientModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this client!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.clientService.deleteClient(client.id).subscribe(async response => {
            this.inProgress = false;
            this.getClientsList();
            if (response.isSuccess) {
              this.cService.getToaster('Client deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  addClient(id: number) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/manage-clients/" + id;
  }

  currentSelected: ClientModel;
  viewClient(content, client: ClientModel) {
    this.currentSelected = new ClientModel();
    this.currentSelected = client;
    this.modalService.open(content, { size: "xl", backdrop: "static" });
    this.getAppointmentsList(this.currentSelected.id)
  }

  loadAppointments: boolean = false;
  getAppointmentsList(id) {
    this.loadAppointments = true;
    this.appointmentFilter.customerId = id;
    this.appointmentsService.getAppointmentsListByfilter(this.appointmentFilter).subscribe(async response => {
      this.appointmentsList = response.data;
      this.loadAppointments = false;
    }, async error => {
      this.loadAppointments = false;
      this.cService.getToaster('Application error', 'error', 'Error');
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
      if (this.clients && this.clients.length > 0) {
        this.clients.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.clients && this.clients.length > 0) {
        this.clients.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(client: ClientModel, event) {
    if (event.target.checked) {
      client.isSelected = true;
    } else {
      client.isSelected = false;
    }

    if (this.clients.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.clients.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover these Clients!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.clientService.deleteMultipleClients(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getClientsList();
            if (response.isSuccess) {
              this.cService.getToaster('Clients deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  // --------------------------------Filtering  ------------------------------------

  showFilter: boolean = false;
  filterType: string = "";
  filterValue: any = null;

  hideShowFilter() {
    this.showFilter = !this.showFilter;
    this.filterValue = null;
    this.filterType = '';
  }

  getFilteredDataList() {
    this.clients = new Array<ClientModel>();
    if (this.filterType != '') {
      if (this.filterType == 'mobile') {
        this.clients = this.allClients.filter(p => p.mobile == this.filterValue);
      } else if (this.filterType == 'email') {
        this.clients = this.allClients.filter(p => p.email.toLowerCase() == this.filterValue.toLowerCase());
      } else if (this.filterType == 'name') {
        this.clients = this.allClients.filter(p => p.name.toLowerCase().includes(this.filterValue.toLowerCase()));
      }
    }
  }

  resetFilter() {
    this.clients = this.allClients;
    this.filterValue = null;
    this.filterType = '';
    this.showFilter = false;
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
