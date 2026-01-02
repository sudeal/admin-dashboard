import { Component, signal } from "@angular/core";
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  ActivatedRoute,
} from "@angular/router";
import { filter } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { Title } from "@angular/platform-browser";

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

 
  sidebarCollapsed = signal(this.loadSidebarState());

  isAuthPage = signal(false);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSrv: Title
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        this.isAuthPage.set(
          url.startsWith("/login") ||
            url.startsWith("/signup") ||
            url.startsWith("/404notfound") ||
            (!url.startsWith("/dashboard") &&
              !url.startsWith("/products") &&
              !url.startsWith("/product-stock") &&
              !url.startsWith("/order-lists") &&
              !url.startsWith("/order-details") &&
              !url.startsWith("/inbox") &&
              !url.startsWith("/favorites") &&
              !url.startsWith("/todo-list") &&
              url !== "/" &&
              url !== "")
        );
        

        
        const pageTitle = this.getDeepestTitle(this.activatedRoute);
        this.titleSrv.setTitle(pageTitle ? pageTitle : "AdminDashboard");
      });
  }

  private getDeepestTitle(route: ActivatedRoute): string | null {
    let current: ActivatedRoute | null = route;
    while (current?.firstChild) current = current.firstChild;
    return current?.snapshot.data?.["title"] ?? null;
  }

  private loadSidebarState(): boolean {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  }

  private saveSidebarState(collapsed: boolean): void {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => {
      const newValue = !v;
      this.saveSidebarState(newValue);
      return newValue;
    });
  }
}
