import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { DashboardStatsService } from "./dashboard-stats.service";
import { StatCard } from "../../shared/models/stat-card.model";
import { StatCardsComponent } from "../../shared/models/components/stat-cards/stat-cards.component";
import { SalesDetail } from "./sales-detail.model";

@Component({
  selector: "app-dashboard-page",
  standalone: true,
  imports: [CommonModule, StatCardsComponent, TranslateModule],
  templateUrl: "./dashboard.page.html",
  styleUrl: "./dashboard.page.css",
})
export class DashboardPage implements OnInit {
  stats$!: Observable<StatCard[]>;
  salesDetails$!: Observable<SalesDetail[]>;

  constructor(
    private statsService: DashboardStatsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.stats$ = this.statsService.getStats();
    this.salesDetails$ = this.statsService.getSalesDetails();
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  translateStatus(status: string): string {
    const statusKey = status.toLowerCase().replace(/\s+/g, '');
    return this.translate.instant(`orderLists.orderStatuses.${statusKey}`) || status;
  }

  translateProduct(productName: string): string {
    
    const brandNames = ['Apple Watch Series 4', 'Samsung A50', 'Galaxy'];
    if (brandNames.includes(productName)) {
      return productName;
    }

    
    const productMap: { [key: string]: string } = {
      'Headphone': 'dashboard.products.headphone',
      "Women's Dress": 'dashboard.products.womensDress',
      'Jewelry': 'dashboard.products.jewelry',
      'Laptop': 'dashboard.products.laptop'
    };

    const translationKey = productMap[productName];
    if (translationKey) {
      return this.translate.instant(translationKey);
    }

    return productName;
  }
}
