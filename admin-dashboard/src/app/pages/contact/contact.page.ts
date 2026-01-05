import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-contact-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./contact.page.html",
  styleUrl: "./contact.page.css",
})
export class ContactPage implements OnInit {
  contactForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  genderOptions = [
    { value: 'male', label: 'contact.gender.male' },
    { value: 'female', label: 'contact.gender.female' },
    { value: 'other', label: 'contact.gender.other' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      photo: [null]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.contactForm.patchValue({ photo: this.selectedFile });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
}

