import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  auth = inject(AuthService);
  common = inject(CommonService)
  user: any
  limit: number = 10;
  notification: any[] = []
  page: number = 1;
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true

    this.user = this.auth.getUser()
    this.getNotification()

  }
  getNotification() {
    const params = {
      limit: this.limit,
      page: this.page,
      isRead: true
    }
    this.common.nofications(params).subscribe((res: any) => {
      if (res) {
        this.isLoading = false
        this.notification = res.data;
        console.log('data', this.notification)
      }

    })



  }

}
