import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { DocumentsModel } from '../models/documents-model.model';
import { DocumentService } from '../service/document-service.service';
import {DocumentType } from '../models/documents-model.model';

@Component({
  selector: 'manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.css']
})
export class ManageDocumentsComponent implements OnInit {

  constructor(public cService: CommonService, public modalService: NgbModal, public documentService: DocumentService) { }

  ngOnInit() {
  }

  // ------------------------------------------------------------Company Documents -----------------------------------
  updatingDocuments: boolean;
  selectedDocumentsUrl: string;
  currentSelectedDocTypeName: string;
  nameOfCurrentSelectedFile: string;
  currentSelectedFile: any;
  ifDocumentSelected: boolean = false;
  currentLoadedDocs: Array<DocumentsModel>;
  ifTheDocAvailable: boolean;

  @Input() id;
  @Input() currentSelectedDocType: string;
  @Input() isDocumentViewMode: boolean;
  @Input() canUploadMutiDocumnets: boolean;

  openSelectDocumentModal(content) {
    this.nameOfCurrentSelectedFile = '';
    this.getFileNameFromType();
    this.getUploadDocument();
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }

  onSelectCompanyDoc(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    if (event.target.files && event.target.files[0]) {
      this.currentSelectedFile = event.target.files[0];
      this.nameOfCurrentSelectedFile = event.target.files[0].name;
      this.ifDocumentSelected = true;
    }
  }

  saveDocument() {
    this.updatingDocuments = true;
    this.ifDocumentSelected = false;
    this.documentService.saveDocument(this.currentSelectedFile, this.currentSelectedDocType).subscribe(async response => {
      this.updatingDocuments = false;
      if (response != null && response.isSuccess === true) {
        this.cService.getToaster('Document Uploaded Successfully', 'Success', "Success");
        this.getUploadDocument();
      } else {
        this.cService.getToaster('Error in upload Document', 'Error', "Error");
      }
    }, async error => {
      this.updatingDocuments = true;
      this.cService.getToaster('Error in upload Document', 'Error', "Error");
    });
  }

  getUploadDocument() {
    this.updatingDocuments = true;
    this.ifTheDocAvailable = false;
    this.currentLoadedDocs = new Array<DocumentsModel>();
    this.nameOfCurrentSelectedFile = '';

    this.documentService.getDocument(this.id).subscribe(async response => {
      this.updatingDocuments = false;
      if (response != null && response.isSuccess === true) {
        this.currentLoadedDocs = response.data;
        if (this.currentLoadedDocs != undefined && this.currentLoadedDocs != null && this.currentLoadedDocs.length > 0) {
          this.ifTheDocAvailable = true;
          this.currentLoadedDocs.forEach(p => {
            if (p.file.match('.png') || p.file.match('.jpg') || p.file.match('.JPG')) {
              p.docType = 'Image';
            } else if (p.file.match('.pdf') || p.file.match('.PDF')) {
              p.docType = 'pdf';
            }
          });
        } else {
          this.ifTheDocAvailable = false;
        }
      } else {
        this.cService.getToaster('load document failed', 'Error', "Error");
        this.ifTheDocAvailable = false;
      }
    }, async error => {
      this.updatingDocuments = false;
      this.ifTheDocAvailable = false;
      this.cService.getToaster('load document failed', 'Error', "Error");
    });
  }

  updateUploadedDocument(documentId: number) {
    this.updatingDocuments = true;
    this.documentService.updateDocument(this.currentSelectedFile, this.id).subscribe(async response => {
      this.updatingDocuments = false;
      if (response != null && response.isSuccess === true) {
        this.modalService.dismissAll();
        this.cService.getToaster('Document updated successfully', 'Success', "Success");
      } else {
        this.cService.getToaster('Error in update Document', 'Error', "Error");
      }
    }, async error => {
      this.updatingDocuments = true;
      this.cService.getToaster('Error in update Document', 'Error', "Error");
    });
  }

  deleteUploadedDocument(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this document!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.updatingDocuments = true;
          this.documentService.deleteDocument(id).subscribe(async response => {
            this.updatingDocuments = false;
            if (response != null && response.isSuccess === true) {
              this.cService.getToaster('Document deleted successfully', 'Success', "Success");
              this.getUploadDocument();
            } else {
              this.cService.getToaster('Error in deleted document', 'Error', "Error");
            }
          }, async error => {
            this.updatingDocuments = true;
            this.cService.getToaster('Error in deleted document', 'Error', "Error");
          });
        }
      });
  }

  fileName: string;
  downloadDoc(url: string) {
    this.updatingDocuments = true;
    this.fileName = url.replace("https://api.trackingsolution.ca/storage/app/public/", "");
    this.documentService.downloadDocs(this.fileName).subscribe(async response => {
      this.updatingDocuments = false;
      let downloadURL = window.URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.fileName;
      link.click();
    }, async error => {
      this.updatingDocuments = false;

      this.cService.getToaster('Download failed!', 'error', 'Error');
    });
  }

  getFileNameFromType() {
    this.currentSelectedDocTypeName = this.currentSelectedDocType ? this.currentSelectedDocType.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toUpperCase() : '';
  }

  closeModal() {
    this.modalService.dismissAll()
  }

}
