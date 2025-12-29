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

  constructor(private router: Router) {}

  onSubmit() {
    // şimdilik fake signup -> login sayfasına dön
    this.router.navigateByUrl("/login");
  }
}
