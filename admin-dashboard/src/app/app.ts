import { Component, signal, OnInit } from "@angular/core";
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  ActivatedRoute,
} from "@angular/router";
import { filter } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { Title } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "./shared/services/language.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  protected readonly title = signal("admin-dashboard");

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSrv: Title,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const pageTitle = this.getDeepestTitle(this.activatedRoute);
        this.titleSrv.setTitle(pageTitle ? pageTitle : "AdminDashboard");
      });
  }

  ngOnInit() {
    // Varsayılan dili ayarla
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('app-language') || 'en';
    this.translate.use(savedLang);
  }

  private getDeepestTitle(route: ActivatedRoute): string | null {
    let current: ActivatedRoute | null = route;
    while (current?.firstChild) current = current.firstChild;
    return current?.snapshot.data?.["title"] ?? null;
  }
}
