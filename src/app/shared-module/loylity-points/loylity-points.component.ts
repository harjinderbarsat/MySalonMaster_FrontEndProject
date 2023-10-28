import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../service/client.service';
import { User } from 'src/app/front-end/models/login.model';
@Component({
  selector: 'app-loylity-points',
  templateUrl: './loylity-points.component.html',
  styleUrls: ['./loylity-points.component.css']
})
export class LoylityPointsComponent implements OnInit {

  clients: Array<ClientModel>
  constructor(private cService: CommonService, private clientService: ClientService) { }
  inProgress: boolean
  currentUser: User

  ngOnInit() {
    this.inProgress = false;
    this.clients = new Array<ClientModel>();
    this.getClientsList();
    this.currentUser = this.cService.getUserProfile();
  }

  getClientsList() {
    this.inProgress = true;
    this.clientService.getClientList().subscribe(async response => {
      this.clients = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }
   
}
