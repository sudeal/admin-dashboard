import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-not-found-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./not-found.page.html",
  styleUrl: "./not-found.page.css",
})
export class NotFoundPage {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }
}

