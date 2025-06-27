import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
declare var bootstrap: any;
@Component({
  selector: 'app-sidenav',
  imports: [
    RouterLinkActive,
    RouterLink,
    CommonModule,
    RouterOutlet,
    EmployeeComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  isButton = false;
  isDrop = false;
  isModal = false;
  isDropdownOpen: boolean = false;
  isAddNewOpen: boolean = false;
  router = inject(Router);

  toggleAddNew() {
    this.isAddNewOpen = !this.isAddNewOpen;
  }

  toggleMenu() {
    this.isButton = !this.isButton;
  }
  mobileDrop() {
    this.isDrop = !this.isDrop;
  }
  openModal() {
    this.isModal = true;
  }
  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; 
  }
}
