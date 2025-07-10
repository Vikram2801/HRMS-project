import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';

declare var bootstrap: any;

@Component({
  selector: 'app-settings',
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, ImageCropperComponent,],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  updateForm!: FormGroup
  toastr = inject(ToastrService)
  user: any;
  auth = inject(AuthService)
  submitted: boolean = false;
  common = inject(CommonService);
  file?: File;
  isBrowser: boolean = false;
  selectedFile: any;
  photoModal: any;
  croppedImage: any = '';
  imageChangedEvent: any = null;
  savedImage: any;
  isModalOpen: boolean = false;
  employees: any[] = [];
  totalEmployees: any;
  currentPage: any;
  employeeId: any
  limit: any;
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.user = this.auth.getUser()
    this.employeeId = this.user.organizationId || ''
    // if (this.employeeId) {
    //   this.getEmployee()

    // }

    this.updateForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName || '', Validators.required),
      lastName: new FormControl(this.user?.lastName || '', Validators.required),
      email: new FormControl(this.user?.email || '', [Validators.required, Validators.email]),
      designation: new FormControl(this.user?.role || ''),
      reportingTo: new FormControl('')

    })
  }
  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {
      const modalEl = document.getElementById('photoModal');
      if (modalEl) {
        this.photoModal = new bootstrap.Modal(modalEl);
        this.photoModal.hide();
      } else {
        console.error('Photo modal element not found');
      }
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.selectedFile = input.files[0];
    this.imageChangedEvent = event;
    this.photoModal.show();
    this.cdr.detectChanges();
    this.openModal();

    console.log('file', this.selectedFile)
  }
  triggerFile() {
    const fileInput = document.getElementById(
      'fileInput'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = event.base64;
    } else {
      console.warn('No base64 returned');
      this.croppedImage = event.objectUrl || '';
    }
  }
  imageLoaded(image: LoadedImage) { }
  cropperReady() { }
  loadImageFailed() { }
  saveImage() {
    this.savedImage = this.croppedImage;
    this.cdr.detectChanges();
    this.closeModal();

  }
  base64ToBlob(base64: string, contentType: string = 'image/png'): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  cancelImage() {
    this.savedImage = null;
  }
  openModal() {
    if (this.photoModal) {
      this.isModalOpen = true;
      this.photoModal.show();
      this.cdr.detectChanges();
    }
  }

  closeModal() {
    if (this.photoModal) {
      this.isModalOpen = false;
      this.photoModal.hide();
      this.imageChangedEvent = null;
      this.croppedImage = '';
      this.cdr.detectChanges();
    }
  }
  onSave() {
    if (this.updateForm.invalid) {
      this.submitted = true;
    } else {
      const formData = new FormData();
      formData.append('firstName', this.updateForm.get('firstName')?.value);
      formData.append('lastName', this.updateForm.get('lastName')?.value);
      formData.append('reportingTo', this.updateForm.get('reportingTo')?.value || '');
      if (this.savedImage) {
        const imageBlob = this.base64ToBlob(this.savedImage);
        const fileName = this.selectedFile?.name || 'profile.png';
        formData.append('employeePhoto', imageBlob, fileName);
      }
      this.common.updateProfile(formData).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success('Profile updated successfully!');
          this.getEmployee()
          console.log('update successfully', res.data)
        }

      })
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
    this.common.getEmployees(this.employeeId, query).subscribe({
      next: (res: any) => {


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

}
