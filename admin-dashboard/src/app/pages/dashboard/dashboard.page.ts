import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { DashboardStatsService } from "./dashboard-stats.service";
import { StatCard } from "../../shared/models/stat-card.model";
import { StatCardsComponent } from "../../shared/models/components/stat-cards/stat-cards.component";

@Component({
  selector: "app-dashboard-page",
  standalone: true,
  imports: [CommonModule, StatCardsComponent],
  templateUrl: "./dashboard.page.html",
  styleUrl: "./dashboard.page.css",
})
export class DashboardPage implements OnInit {
  stats$!: Observable<StatCard[]>;

  constructor(private statsService: DashboardStatsService) {}

  ngOnInit() {
    this.stats$ = this.statsService.getStats();
  }
}
