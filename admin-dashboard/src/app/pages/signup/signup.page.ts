import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-signup-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./signup.page.html",
  styleUrl: "./signup.page.css",
})
export class SignupPage {
  email = "";
  username = "";
  password = "";
  acceptTerms = false;
  showErrorModal = false;

  constructor(private router: Router) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    if (!this.isValidEmail(this.email)) {
      this.showErrorModal = true;
      return;
    }

   
    this.router.navigateByUrl("/login");
  }

  closeModal() {
    this.showErrorModal = false;
  }
}
