import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from '../models/appointments.model';
import { AppointmentsService } from '../service/appointments.service';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { startOfDay, endOfDay, subDays, isSameDay, isSameMonth, addDays, endOfMonth, addHours, } from 'date-fns';
import { differenceInMinutes, startOfHour } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import Swal from 'sweetalert2';
import { User } from 'src/app/front-end/models/login.model';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#c6d2b9',
    secondary: '#c6d2b9',
  },
  blue: {
    primary: '#80f3c1',
    secondary: '#80f3c1',
  },
  yellow: {
    primary: '#f38084',
    secondary: '#f38084',
  },
  green: {
    primary: '#dfe58e',
    secondary: '#dfe58e',
  },
};
@Component({
  selector: 'app-branch-weeklschdule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weeklschdule.component.html',
  styleUrls: ['./weeklschdule.component.css']
})
export class WeeklschduleComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private modalService: NgbModal, public cService: CommonService, private datePipe: DatePipe, private appointmentsService: AppointmentsService) { }
  // dates: Array<string> = ["2022-02-25 00:00:00", "2022-02-26 00:00:00", "2022-02-27 00:00:00", "2022-02-28 00:00:00",
  //   "2022-03-01 00:00:00", "2022-03-02 00:00:00", "2022-03-03 00:00:00"];
  // dateArray = [];
  // rowsArray: Array<string> = ['9.00 am', '9.15 am', '9.30 am', '9.45 am',
  //   '10.00 am', '10.15 am', '10.30 am', '10.45 am',
  //   '11.00 am', '11.15 am', '11.30 am', '11.45 am',
  //   '12.00 pm', '12.15 pm', '12.30 pm', '12.45 pm',
  //   '1.00 pm', '1.15 pm', '1.30 pm', '1.45 pm',
  //   '2.00 pm', '2.15 pm', '2.30 pm', '2.45 pm',
  //   '3.00 pm', '3.15 pm', '3.30 pm', '3.45 pm',
  //   '4.00 pm', '4.15 pm', '4.30 pm', '4.45 pm',
  // ];
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  finalData = [];
  inProgress: boolean
  appointmentsList: Array<AppointmentsModel> = new Array<AppointmentsModel>();
  currentUser: User
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.getAppointmentsList();

   
  }

  ngAfterViewInit() {
    this.scrollToCurrentView();
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  getAppointmentsList() {
    this.inProgress = true;
    let appointmentFilter = new AppointmentsModel();
    this.appointmentsList = new Array<AppointmentsModel>();
    this.finalData = [];
    // this.dateArray = [];
    this.appointmentsService.getAppointmentsListByfilter(appointmentFilter).subscribe(async response => {
      this.inProgress = false;
      if (response && response.data && response.data.length > 0) {
        response.data.forEach(appointment => {
          this.appointmentsList.push(appointment);
          let newDate = new Date(appointment.dateAndTime);

          let time = this.timeReplacement(appointment.hours);
          let hours = Number(time.substring(0, 2));
          let mintue = Number(time.substring(3, 5));
          newDate.setHours(hours);
          newDate.setMinutes(mintue);

          if (appointment.status == "upcoming") {
            this.events.push({
              id: appointment.id,
              start: subDays(newDate, 0),
              title: appointment.hours + '- ' + appointment.customer_name + ' has booked appointment for : ' + appointment.services_name,
              color: { ...colors.blue },
              allDay: false,
            })
          } else if (appointment.status == "completed") {
            this.events.push({
              id: appointment.id,
              start: subDays(newDate, 0),
              title: 'Completed appointment at ' + appointment.hours + '- ' + appointment.customer_name,
              color: { ...colors.green },
              allDay: false,
            })
          } else if (appointment.status == "online") {
            this.events.push({
              id: appointment.id,
              start: subDays(newDate, 0),
              title: appointment.hours + '- ' + appointment.customer_name + ' has online booked appointment for : ' + appointment.services_name,
              color: { ...colors.red },
              allDay: false,
            })
          }else {
            this.events.push({
              id: appointment.id,
              start: subDays(newDate, 0),
              title: 'In progress appointment for ' + appointment.customer_name,
              color: { ...colors.yellow },
              allDay: false,
            })
          }
          this.refresh.next();
        })
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  timeReplacement(hours: string): string {
    hours = hours.replace('9.00 am', '09.00');
    hours = hours.replace('9.15 am', '09.15');
    hours = hours.replace('9.30 am', '09.30');
    hours = hours.replace('9.45 am', '09.45');

    hours = hours.replace('10.00 am', '10.00');
    hours = hours.replace('10.15 am', '10.15');
    hours = hours.replace('10.30 am', '10.30');
    hours = hours.replace('10.45 am', '10.45');

    hours = hours.replace('11.00 am', '11.00');
    hours = hours.replace('11.15 am', '11.15');
    hours = hours.replace('11.30 am', '11.30');
    hours = hours.replace('11.45 am', '11.45');

    hours = hours.replace('12.00 am', '12.00');
    hours = hours.replace('12.15 pm', '12.15');
    hours = hours.replace('12.30 pm', '12.30');
    hours = hours.replace('12.45 pm', '12.45');

    hours = hours.replace('1.00 pm', '01.00');
    hours = hours.replace('1.15 pm', '01.15');
    hours = hours.replace('1.30 pm', '01.30');
    hours = hours.replace('1.45 pm', '01.45');

    hours = hours.replace('2.00 pm', '02.00');
    hours = hours.replace('2.25 pm', '02.25');
    hours = hours.replace('2.30 pm', '02.30');
    hours = hours.replace('2.45 pm', '02.45');

    hours = hours.replace('3.00 pm', '03.00');
    hours = hours.replace('3.35 pm', '03.35');
    hours = hours.replace('3.30 pm', '03.30');
    hours = hours.replace('3.45 pm', '03.45');

    hours = hours.replace('4.00 pm', '04.00');
    hours = hours.replace('4.45 pm', '04.45');
    hours = hours.replace('4.40 pm', '04.40');
    hours = hours.replace('4.45 pm', '04.45');
    hours = hours.replace('5.00 pm', '05.00');
    return hours;
  }

  events: CalendarEvent[] = [];

  // getDatesBetween(
  //   startDate: Date,
  //   endDate: Date,
  //   includeEndDate?: boolean
  // ) {
  //   const dates = [];
  //   const currentDate = startDate;
  //   while (currentDate < endDate) {
  //     this.datePipe.transform(startDate, 'yyyy-MM-dd')
  //     dates.push(this.datePipe.transform(new Date(currentDate), 'yyyy-MM-dd 00:00:00'));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   if (includeEndDate) dates.push(endDate);
  //   return dates;
  // };
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.setView(CalendarView.Day)
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  selectedAppointment: AppointmentsModel
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.selectedAppointment = new AppointmentsModel();
    this.selectedAppointment = this.appointmentsList.find(p => p.id == event.id);
    this.modalService.open(this.modalContent, { size: 'lg' });
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

  closeModal() {
    this.modalService.dismissAll();
  }
  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop = 1060;
    }
  }

}
