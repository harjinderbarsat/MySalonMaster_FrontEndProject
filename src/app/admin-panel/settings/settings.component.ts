import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: User
  constructor(private cService: CommonService) { }

  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
  }

}
