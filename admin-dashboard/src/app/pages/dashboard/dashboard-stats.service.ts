import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map, switchMap } from "rxjs/operators";
import { StatCard } from "../../shared/models/stat-card.model";
import { SalesDetail } from "./sales-detail.model";
import { OrderListsService } from "../order-lists/order-lists.service";
import { ProductStockService } from "../product-stock/product-stock.service";

@Injectable({ providedIn: "root" })
export class DashboardStatsService {
  constructor(
    private orderService: OrderListsService,
    private productService: ProductStockService
  ) {}

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

  getSalesDetails(): Observable<SalesDetail[]> {
    return this.orderService.getOrders().pipe(
      switchMap((orders) => {
        return this.productService.getProducts().pipe(
          map((products) => {
            const salesDetails: SalesDetail[] = [];
            
            orders.forEach((order) => {
              order.items.forEach((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (product) {
                  salesDetails.push({
                    orderId: order.id,
                    customerName: order.name,
                    productName: product.name,
                    quantity: item.qty,
                    unitPrice: product.price,
                    total: product.price * item.qty,
                    date: order.date,
                    status: order.status,
                    payment: order.payment,
                  });
                }
              });
            });

            return salesDetails.slice(0, 10); // İlk 10 satış detayını göster
          })
        );
      }),
      delay(400)
    );
  }
}
