import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { StatCard } from "../../../models/stat-card.model";

@Component({
  selector: "app-stat-cards",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./stat-cards.component.html",
  styleUrl: "./stat-cards.component.css",
})
export class StatCardsComponent {
  @Input() title: string | null = null;   
  @Input() cards: StatCard[] = [];
  @Input() loading = false;
}
