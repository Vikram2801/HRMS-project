import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

declare var bootstrap: any;

@Component({
  selector: 'app-employee',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    ImageCropperComponent,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employeeForm!: FormGroup;
  submitted: Boolean = false;
  file: File | null = null;
  files: File | null = null;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  selectedBloodGroup: string = '';
  dob: Date | null = null;
  isModalOpen = false;
  married: string[] = ['single', 'Married'];
  imageChangedEvent: any = null;
  croppedBase64: string = '';
  croppedImage: any = '';
  currentStep: number = 1;
  uploadFileName: string | null = '';
  savedImage: any = '';
  isLoading: boolean = false;
  isBrowser: boolean;
  employeeStatuses: string[] = [
    'Active',
    'On Notice Period',
    'Resigned',
    'Terminated',
    'Exit',
    'Absconding',
    'On Leave',
    'Retired',
    'Contract Ended',
  ];
  countyData: any[] = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Greece', code: 'GR' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'North Korea', code: 'KP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syria', code: 'SY' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
  ];
  @ViewChild(ImageCropperComponent)
  imageCropper!: ImageCropperComponent;
  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  photoModal: any;
  exampleModal: any;

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

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      employeePhoto: new FormControl(''),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      bloodGroups: new FormControl('', Validators.required),
      personalEmailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w+]+([\.-]?\w+)\+?\d@[\w-]+(\.\w+){1,2}$/i),
      ]),
      personalPhoneNumber: new FormControl('', Validators.required),
      maritalStatus: new FormControl(''),
      panNumber: new FormControl(''),
      uanNumber: new FormControl(''),
      emergencyContactPerson: new FormControl(''),
      relationBy: new FormControl(''),
      emergencyPhoneNumber: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      employeeId: new FormControl(''),
      companyEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w+]+([\.-]?\w+)\+?\d@[\w-]+(\.\w+){1,2}$/i),
      ]),
      designation: new FormControl('', Validators.required),
      department: new FormControl(''),
      reportingTo: new FormControl(''),
      employeeStatus: new FormControl('', Validators.required),
      employeeType: new FormControl(''),
      workShift: new FormControl(''),
      dateOfJoining: new FormControl(''),
      bankName: new FormControl(''),
      bankCode: new FormControl(''),
      bankAccountNumber: new FormControl(''),
      pfAccountNumber: new FormControl(''),
      previousExperience: new FormArray([this.createExperience()]),
      documents: new FormArray([this.createDocument()]),
    });
  }

  get previousExperience(): FormArray {
    return this.employeeForm.get('previousExperience') as FormArray;
  }
  get documents(): FormArray {
    return this.employeeForm.get('documents') as FormArray;
  }

  createExperience(): FormGroup {
    return new FormGroup({
      organisation: new FormControl(''),
      designation: new FormControl(''),
      years: new FormControl(''),
      months: new FormControl(''),
    });
  }
  createDocument(): FormGroup {
    return new FormGroup({
      documenttype: new FormControl(''),
      documentName: new FormControl(''),
      file: new FormControl(null),
      uploadFileName: new FormControl(''),
    });
  }

  addExperience(): void {
    this.previousExperience.push(this.createExperience());
  }
  removeExperience(index: number): void {
    if (this.previousExperience.length > 1) {
      this.previousExperience.removeAt(index);
    }
  }
  addDocument(): void {
    this.documents.push(this.createDocument());
  }
  removeDocument(index: number): void {
    if (this.documents.length > 1) {
      this.documents.removeAt(index);
    }
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
  close() {
    const modalEl = document.getElementById('employeeModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  }

  onFileSelected(event: Event): void {
    if (!this.isBrowser) return;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.imageChangedEvent = event;
    this.photoModal.show();
    this.cdr.detectChanges();
    this.openModal();
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
    this.employeeForm.patchValue({ employeePhoto: this.savedImage });
    console.log('saveimage', this.savedImage);
    this.cdr.detectChanges();
    this.closeModal();
  }
  cancelImage() {
    this.savedImage = null;
  }

  triggerFileInput() {
    if (this.isBrowser) {
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      } else {
        console.error('File input with ID fileInput not found');
      }
    }
  }
  onFileUpload(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.documents.at(index).patchValue({
        file: file,
        uploadFileName: file.name,
      });
      this.cdr.detectChanges();
    }
  }
  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject('Blob to base64 conversion failed');
      reader.readAsDataURL(blob);
    });
  }

  removeFile(index: number): void {
    this.documents.at(index).patchValue({
      file: null,
      uploadFileName: '',
    });

    if (this.isBrowser) {
      const input = document.getElementById(
        `uploadInput${index}`
      ) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  }

  triggerFileupload(index: number): void {
    if (this.isBrowser) {
      const input = document.getElementById(
        `uploadInput${index}`
      ) as HTMLInputElement;
      if (input) {
        input?.click();
      }
    }
  }

  preStep() {
    if (this.currentStep > 1) this.currentStep--;
  }
  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }
  onsubmit() {
    this.isLoading = true;
    if (this.employeeForm.invalid) {
      this.submitted = true;
      this.isLoading = false;
      this.employeeForm.markAllAsTouched();
      this.currentStep = 1;
      return;
    }
  }
}
