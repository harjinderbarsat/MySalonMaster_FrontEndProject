import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/front-end/models/login.model'
import { ServiceAndCategoryServices } from '../../service/branch-categories.service';

@Component({
  selector: 'app-default-services',
  templateUrl: './default-services.component.html',
  styleUrls: ['./default-services.component.css']
})
export class DefaultServicesComponent implements OnInit {

  constructor(private cService: CommonService, private servicesService: ServiceAndCategoryServices) { }
  inProgress: boolean;
  currentUser: User;
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
  }

  loadDefaultCategoriesAndServices() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once start it will load list of default categories and services into your system.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Load it now!',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.servicesService.loadDefaultCategoriesAndServices().subscribe(async response => {
            this.inProgress = false;
            if (response.isSuccess) {
              this.cService.getToaster('Categories and services loaed succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        }
      });
  }
}
