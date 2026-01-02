import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.page.html",
  styleUrl: "./login.page.css",
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  showErrorModal = false;
  showPasswordErrorModal = false;
  forgotPasswordMode = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });

    
    this.resetPasswordForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get("newPassword");
    const confirmPassword = control.get("confirmPassword");

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  
  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  get remember() {
    return this.loginForm.get("remember");
  }

  get newPassword() {
    return this.resetPasswordForm.get("newPassword");
  }

  get confirmPassword() {
    return this.resetPasswordForm.get("confirmPassword");
  }

  onSubmit() {
    if (this.loginForm.invalid) {
     
      this.loginForm.markAllAsTouched();
      return;
    }

    
    this.router.navigateByUrl("/dashboard");
  }

  closeModal() {
    this.showErrorModal = false;
  }

  closePasswordErrorModal() {
    this.showPasswordErrorModal = false;
  }

  onForgetPassword() {
    this.forgotPasswordMode = true;
    
    this.resetPasswordForm.reset();
  }

  onSubmitNewPassword() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      
      if (this.resetPasswordForm.errors?.["passwordMismatch"]) {
        this.showPasswordErrorModal = true;
      }
      return;
    }

    
    this.forgotPasswordMode = false;
    this.resetPasswordForm.reset();
  }

  
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

 
  hasResetError(controlName: string, errorType: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  
  hasPasswordMismatch(): boolean {
    return !!(this.resetPasswordForm.errors?.["passwordMismatch"] && 
             this.resetPasswordForm.get("confirmPassword")?.touched);
  }
}
