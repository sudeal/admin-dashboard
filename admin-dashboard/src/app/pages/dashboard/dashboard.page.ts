import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { DashboardStatsService } from "./dashboard-stats.service";
import { StatCard } from "../../shared/models/stat-card.model";
import { StatCardsComponent } from "../../shared/models/components/stat-cards/stat-cards.component";
import { SalesDetail } from "./sales-detail.model";


import { Chart } from "chart.js/auto";

@Component({
  selector: "app-dashboard-page",
  standalone: true,
  imports: [CommonModule, StatCardsComponent, TranslateModule],
  templateUrl: "./dashboard.page.html",
  styleUrl: "./dashboard.page.css",
})
export class DashboardPage implements OnInit, OnDestroy {
  stats$!: Observable<StatCard[]>;
  salesDetails$!: Observable<SalesDetail[]>;

  private dealsChartInstance: Chart | null = null;

  
  @ViewChild("dealsChart")
  set dealsChartRef(ref: ElementRef<HTMLCanvasElement> | undefined) {
    if (!ref) return;

    
    this.dealsChartInstance?.destroy();

    const ctx = ref.nativeElement.getContext("2d");
    if (!ctx) return;

    this.dealsChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "USD",
            data: [29.1, 29.3, 29.0, 29.6, 29.9, 30.2, 30.0, 30.4, 30.7, 30.5, 30.8, 31.0],
            tension: 0.35,
            pointRadius: 3,
            borderWidth: 2,
            fill: true,
          },
          {
            label: "EUR",
            data: [31.8, 31.6, 31.9, 32.2, 32.4, 32.1, 32.7, 32.9, 33.0, 33.2, 33.4, 33.3],
            tension: 0.35,
            pointRadius: 3,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            grid: { display: false },
          },
          y: {
            grid: { display: true },
          },
        },
      },
    });
  }

  constructor(
    private statsService: DashboardStatsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.stats$ = this.statsService.getStats();
    this.salesDetails$ = this.statsService.getSalesDetails();
  }

  ngOnDestroy() {
    this.dealsChartInstance?.destroy();
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
    // Eğer status translation key formatında geliyorsa (ts.orderStatuses gibi), düzelt
    if (status.includes('orderStatuses') || status.startsWith('ts.')) {
      // "ts.orderStatuses" veya "ts.orderStatuses." gibi değerleri düzelt
      // Bu değerler muhtemelen "On Hold" veya "In Transit" olmalı
      const statusFixMap: { [key: string]: string } = {
        'ts.orderStatuses': 'On Hold',
        'ts.orderStatuses.': 'In Transit',
        'orderStatuses': 'On Hold',
        'orderStatuses.': 'In Transit',
      };
      
      const normalizedKey = status.trim();
      if (statusFixMap[normalizedKey]) {
        status = statusFixMap[normalizedKey];
      }
    }
    
    // Status'ü translation key formatına çevir (camelCase)
    // "On Hold" -> "onHold", "In Transit" -> "inTransit", "Completed" -> "completed"
    let statusKey = '';
    if (status === 'On Hold') {
      statusKey = 'onHold';
    } else if (status === 'In Transit') {
      statusKey = 'inTransit';
    } else {
      // Diğer status'ler için lowercase ve boşlukları kaldır
      statusKey = status.toLowerCase().replace(/\s+/g, "");
    }
    
    // Translation'ı al
    const translated = this.translate.instant(`orderLists.orderStatuses.${statusKey}`);
    
    // Eğer translation bulunamazsa orijinal status'ü döndür
    if (translated && translated !== `orderLists.orderStatuses.${statusKey}`) {
      return translated;
    }
    
    return status;
  }

  translateProduct(productName: string): string {
    const brandNames = ["Apple Watch Series 4", "Samsung A50", "Galaxy"];
    if (brandNames.includes(productName)) return productName;

    const productMap: { [key: string]: string } = {
      Headphone: "dashboard.products.headphone",
      "Women's Dress": "dashboard.products.womensDress",
      Jewelry: "dashboard.products.jewelry",
      Laptop: "dashboard.products.laptop",
    };

    const translationKey = productMap[productName];
    if (translationKey) return this.translate.instant(translationKey);

    return productName;
  }
}
