import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Hawk System';
  constructor(private cService: CommonService) {
  }

  ngOnInit() {
    this.cService.setAPIUrl()
  }

}
