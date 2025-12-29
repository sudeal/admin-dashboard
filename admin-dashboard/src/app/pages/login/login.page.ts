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

  constructor(private router: Router) {}

  onSubmit() {
    
    this.router.navigateByUrl("/dashboard");
  }
}
