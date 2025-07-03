import { Component, inject, input, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employeedetails',
  imports: [CommonModule, DatePipe, MatSelectModule, FormsModule, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.scss'

})
export class EmployeedetailsComponent {
  @Input() empId: string = '';
  @Input() orgId: string = '';
  employeeDetails: any = {};
  isLoading: boolean = false;
  department: string[] = ['Information Technology', 'Human Resources', 'Finance', 'Management'];
  designation: string[] = ['Accountant', 'Analyst', 'Consultant', 'Developer', 'HR', 'Manager', 'Trainee']

  commonService = inject(CommonService);
  ngOnInit() {
    this.isLoading = true;
    console.log('Employee ID:', this.empId);
    console.log('Organization ID:', this.orgId);
    if (this.empId && this.orgId) {
      this.getEmployeeDetails(this.orgId, this.empId);
    }
  }
  getEmployeeDetails(orgId: string, empId: string) {
    this.commonService.getEmployeeById(orgId, empId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.isLoading = false;
          this.employeeDetails = res.employees;
          console.log('Employee Details:', this.employeeDetails);
          console.log('Employee details fetched successfully');
        }
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
      }
    });
  }
}
