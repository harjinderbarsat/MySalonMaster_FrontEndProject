import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
declare var require: any
const data: any = require('../../shared/chartist.json');

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  constructor() { }
  workStation:string
  ngOnInit() {

    this.workStation='Branch 1';
  }

  lineArea: Chart = {
    type: 'Line',
    data: data['lineAreaDashboard'],
    options: {
        low: 0,
        showArea: true,
        fullWidth: true,
        onlyInteger: true,
        axisY: {
            low: 0,
            scaleMinSpace: 20,
        },
        axisX: {
            showGrid: false
        }
    }
  
};

}


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}