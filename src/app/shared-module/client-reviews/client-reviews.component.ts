import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { Feedback } from '../models/feedback.model';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.css']
})
export class ClientReviewsComponent implements OnInit {

  constructor(
    private cService: CommonService, public reviewService: ReviewService, private modalService: NgbModal) { }

  feedBackList: Array<Feedback>
  allfeedBackList: Array<Feedback>
  inProgress: boolean
  ngOnInit() {
    this.feedBackList = new Array<Feedback>();
    this.allfeedBackList = new Array<Feedback>();
    this.getReviews();
  }

  getReviews() {
    this.inProgress = true;
    this.reviewService.getFeedbackList().subscribe(async response => {
      this.inProgress = false;
      if (response.isSuccess) {
        this.feedBackList = response.data;
        this.allfeedBackList = response.data;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.feedBackList && this.feedBackList.length > 0) {
        this.feedBackList.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.feedBackList && this.feedBackList.length > 0) {
        this.feedBackList.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(client: Feedback, event) {
    if (event.target.checked) {
      client.isSelected = true;
    } else {
      client.isSelected = false;
    }

    if (this.feedBackList.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.feedBackList.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover these Reviews!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.reviewService.deleteMultipleReviews(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getReviews();
            if (response.isSuccess) {
              this.cService.getToaster('Reviews deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        }
      });
  }

  currentSelected: Feedback;
  viewClient(content, client: Feedback) {
    this.currentSelected = new Feedback();
    this.currentSelected = client;
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // --------------------------------Filtering and printing  ------------------------------------

  showFilter: boolean = false;
  filterType: string = "";
  filterValue: any = null;

  hideShowFilter() {
    this.showFilter = !this.showFilter;
    this.filterValue = null;
    this.filterType = '';
  }

  getFilteredDataList() {
    this.feedBackList = new Array<Feedback>();
    if (this.filterType != '') {
      if (this.filterType == 'mobile') {
        this.feedBackList = this.allfeedBackList.filter(p => p.clientMobile == this.filterValue);
      } else if (this.filterType == 'review') {
        this.feedBackList = this.allfeedBackList.filter(p => p.review.toLowerCase().includes(this.filterValue.toLowerCase()));
      } else if (this.filterType == 'name') {
        this.feedBackList = this.allfeedBackList.filter(p => p.client_name.toLowerCase().includes(this.filterValue.toLowerCase()));
      } else if (this.filterType == 'rating') {
        this.feedBackList = this.allfeedBackList.filter(p => p.rating == this.filterValue);
      }
    }
  }

  resetFilter() {
    this.feedBackList = this.allfeedBackList;
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
