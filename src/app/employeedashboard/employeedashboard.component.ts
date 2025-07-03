import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmployeedetailsComponent } from '../employeedetails/employeedetails.component';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
declare var bootstrap: any;
@Component({
  selector: 'app-employeedashboard',
  imports: [MatTabsModule, CommonModule, MatPaginatorModule, EmployeedetailsComponent, MatProgressSpinnerModule],
  templateUrl: './employeedashboard.component.html',
  styleUrl: './employeedashboard.component.scss'
})
export class EmployeedashboardComponent implements OnInit {
  constructor(private commonService: CommonService, private auth: AuthService) { }
  employees: any[] = [];
  totalEmployees: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  isLoading: Boolean = false;
  totalPages: number = 0;
  employeeId: string = '';
  isModal: boolean = false;
  user: any;
  userId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.isLoading = true;
    this.user = this.auth.getUser();
    this.employeeId = this.user.organizationId || '';

    if (this.employeeId) {
      this.getEmployee();
      // this.isLoading = false

    }

  }
  getEmployee() {
    const query = {
      page: this.currentPage.toString(),
      limit: this.limit.toString(),
      sortOrder: 'desc',
      sortBy: 'createdAt',
      keyword: '',
      firstName: '',
      lastName: '',
      employeeId: '',
      role: '',
      dateOfJoining: ''
    };
    this.commonService.getEmployees(this.employeeId, query).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this.employees = res.employees;
        this.totalEmployees = res.totalEmployees;
        this.currentPage = res.currentPage;
        console.log('Employees:', this.employees);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }
  OnPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getEmployee();
  }
  openModal(employee: any) {
    this.isLoading = true
    this.isModal = true;
    this.userId = employee._id; // pass selected employeeId to child
    setTimeout(() => {
      this.isLoading = false
      const modalEl = document.getElementById('employeeModal');

      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);

        modal.show();

        modalEl.addEventListener('hidden.bs.modal', () => {
          this.isModal = false;

        }, { once: true });
      }
    }, 0);
  }

}
