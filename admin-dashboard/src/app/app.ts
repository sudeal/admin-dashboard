import { Component, signal } from "@angular/core";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";
import { CommonModule } from "@angular/common";

import { AdminSidebarComponent } from "./layout/sidebar/admin-sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent, HeaderComponent, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("admin-dashboard");


  sidebarCollapsed = signal(false);

  
  isAuthPage = signal(false);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthPage.set(
          this.router.url.startsWith("/login") ||
          this.router.url.startsWith("/signup")
        );
      });
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }
}
