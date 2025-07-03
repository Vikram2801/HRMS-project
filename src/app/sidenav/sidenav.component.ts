import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { AuthService } from '../services/auth.service';
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
  authService = inject(AuthService);

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
    setTimeout(() => {
      const modalEl = document.getElementById('exampleModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
        modalEl.addEventListener('hidden.bs.modal', () => {
          this.isModal = false;
        },
          { once: true }
        );
      }
    }, 0);
  }

  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

