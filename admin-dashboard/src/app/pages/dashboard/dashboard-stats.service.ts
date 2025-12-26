import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { StatCard } from "../../shared/models/stat-card.model";

@Injectable({ providedIn: "root" })
export class DashboardStatsService {
  getStats(): Observable<StatCard[]> {
    return of<StatCard[]>([
      {
        title: "Total User",
        value: "40,689",
        description: "8.5% Up from yesterday",
        trend: "up",
        icon: "bi-people",
        tone: "purple",
      },
      {
        title: "Total Order",
        value: "10293",
        description: "1.3% Up from past week",
        trend: "up",
        icon: "bi-box-seam",
        tone: "yellow",
      },
      {
        title: "Total Sales",
        value: "$89,000",
        description: "4.3% Down from yesterday",
        trend: "down",
        icon: "bi-graph-up",
        tone: "green",
      },
      {
        title: "Total Pending",
        value: "2040",
        description: "1.8% Up from yesterday",
        trend: "up",
        icon: "bi-clock",
        tone: "orange",
      },
    ]).pipe(delay(400));
  }
}
