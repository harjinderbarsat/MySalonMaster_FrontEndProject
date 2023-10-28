import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { }
email:string
  ngOnInit() {
    this.email = this.activeRoute.snapshot.params.email;
  }

}
