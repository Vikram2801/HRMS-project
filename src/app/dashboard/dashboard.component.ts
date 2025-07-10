import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, CommonModule, HighchartsChartComponent,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentTime = new Date();
  employees: any[] = [];
  totalEmployees: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  employeeId: string = '';
  userName: string = '';
  user: any;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  totalCount: number = 0;
  total: number = 0;  // Example value, replace with dynamic data
  totalabsent: number = 0;
  Absent: any;
  upcomingHolidays: any[] = [];

  constructor(private auth: AuthService, private common: CommonService) { };
  // holidays = [
  //   { day: 'Wednesday', date: new Date('2025-01-01'), name: 'New Year' },
  //   { day: 'Tuesday', date: new Date('2025-01-14'), name: 'Makar Sankranthi (Pongal)' },
  //   { day: 'Friday', date: new Date('2025-04-18'), name: 'Good Friday' },
  //   { day: 'Thursday', date: new Date('2025-05-01'), name: 'May Day' },
  //   { day: 'Friday', date: new Date('2025-08-15'), name: 'Independence Day' },
  //   { day: 'Wednesday', date: new Date('2025-08-27'), name: 'Ganesh Chaturthi' },
  //   { day: 'Wednesday', date: new Date('2025-10-01'), name: 'Ayudha Puja' },
  //   { day: 'Thursday', date: new Date('2025-10-02'), name: 'Gandhi Jayanthi' },
  //   { day: 'Monday', date: new Date('2025-10-20'), name: 'Naraka Chaturdashi' },
  //   { day: 'Thursday', date: new Date('2025-12-25'), name: 'Christmas' }
  // ];


  ngOnInit() {
    const today = new Date()
    this.user = this.auth.getUser();
    this.employeeId = this.user.organizationId || '';
    // this.upcomingHolidays = this.holidays.filter((holiday) => holiday.date > today).sort((a, b) => a.date.getTime() - b.date.getTime());
    this.holiday();
    this.monthlyAttendanceStats();


  }
  chartOptions: Highcharts.Options = {
    title: { text: '' },
    credits: {
      enabled: false
    },
    xAxis: {
      title: { text: '' },
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'Today'],
      visible: true,
      labels: {
        enabled: true,
        style: {
          // color: '#767676'
          fontSize: '12px'
        }
      },
      lineWidth: 0,

    },
    yAxis: {
      visible: false,
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        groupPadding: 0.1, // Adjust spacing between groups
        pointPadding: 0.1 // Adjust padding within each group
      }
    },
    series: [{
      type: 'column',
      name: 'Attendance (%)',
      data: [
        { y: 70, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 22, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 68, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 80, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 89, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 74, dataLabels: { enabled: true, format: '{y}%' } },
        { y: 93, dataLabels: { enabled: true, format: '{y}%' } }
      ],

      color: '#004CDF',
      dataLabels: {
        enabled: true,
        inside: false, // Keep labels outside the bars
        align: 'center',
        verticalAlign: 'top',
        crop: false,
        overflow: 'allow',
        y: -25,
        style: {
          // color: '#767676',
          fontSize: '12px',
          fill: 'none',
          // fontWeight: '100',
          fontFamily: "poppins-regular",
        }
      }
    }]
  }
  holiday() {
    this.common.upComingHolidays().subscribe((res: any) => {
      this.upcomingHolidays = res.data
    })
  }
  monthlyAttendanceStats() {
    this.common.monthlyAttendanceState().subscribe((res: any) => {
      if (res.success) {
        this.total = res.presentPercentage;
        this.totalabsent = res.absentPercentage;
        this.totalCount = res.totalPresentsForTheMonth;
        const categories = res.chartData.map((item: any) => item.day);
        const data = res.chartData.map((item: any) => ({
          y: item.percentage, dataLabels: { enabled: true, format: '{y}%' }

        }));
        this.chartOptions = {
          ...this.chartOptions,
          xAxis: {
            ...(this.chartOptions.xAxis as Highcharts.XAxisOptions),
            categories
          },
          series: [{
            type: 'column',
            name: 'Attendance (%)',
            data,
            color: '#004CDF',
            dataLabels: {
              enabled: true,
              inside: false,
              align: 'center',
              verticalAlign: 'top',
              crop: false,
              overflow: 'allow',
              y: -25,
              style: {
                fontSize: '12px',
                color: '#000',
                fontFamily: 'Poppins'
              }
            }
          }]
        };

        this.updateFlag = true;
      }
    });
  }




}