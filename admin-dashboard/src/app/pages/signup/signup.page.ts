import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-signup-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./signup.page.html",
  styleUrl: "./signup.page.css",
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  showErrorModal = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  // Getter methods for easy access to form controls
  get email() {
    return this.signupForm.get("email");
  }

  get username() {
    return this.signupForm.get("username");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get acceptTerms() {
    return this.signupForm.get("acceptTerms");
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.signupForm.markAllAsTouched();
      return;
    }

    // Form is valid, proceed with signup
    this.router.navigateByUrl("/login");
  }

  closeModal() {
    this.showErrorModal = false;
  }

  // Helper method to check if field has error
  hasError(controlName: string, errorType: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
}
