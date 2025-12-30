import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./login.page.html",
  styleUrl: "./login.page.css",
})
export class LoginPage {
  email = "";
  password = "";
  remember = true;
  showErrorModal = false;
  showPasswordErrorModal = false;
  forgotPasswordMode = false;
  newPassword = "";
  confirmPassword = "";

  constructor(private router: Router) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return this.email.trim() !== "" && this.password.trim() !== "";
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showErrorModal = true;
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
  }

  onSubmitNewPassword() {
    
    if (this.email.trim() === "" || !this.isValidEmail(this.email)) {
      this.showPasswordErrorModal = true;
      return;
    }

    
    if (this.newPassword !== this.confirmPassword) {
      this.showPasswordErrorModal = true;
      return;
    }

  
    this.forgotPasswordMode = false;
    this.newPassword = "";
    this.confirmPassword = "";
  }

  isNewPasswordFormValid(): boolean {
    return this.newPassword.trim() !== "" && this.confirmPassword.trim() !== "";
  }
}
