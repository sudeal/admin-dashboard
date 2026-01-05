import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  features: PricingFeature[];
  isPremium: boolean;
}

@Component({
  selector: "app-pricing-page",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./pricing.page.html",
  styleUrl: "./pricing.page.css",
})
export class PricingPage {
  plans: PricingPlan[] = [
    {
      name: "pricing.plans.basic",
      price: "14.99",
      isPremium: false,
      features: [
        { name: "pricing.features.freeSetup", included: true },
        { name: "pricing.features.bandwidthLimit", included: true },
        { name: "pricing.features.userConnection", included: true },
        { name: "pricing.features.analyticsReport", included: false },
        { name: "pricing.features.publicApiAccess", included: false },
        { name: "pricing.features.pluginsIntegration", included: false },
        { name: "pricing.features.customContentManagement", included: false },
      ],
    },
    {
      name: "pricing.plans.standard",
      price: "49.99",
      isPremium: false,
      features: [
        { name: "pricing.features.freeSetup", included: true },
        { name: "pricing.features.bandwidthLimit", included: true },
        { name: "pricing.features.userConnection", included: true },
        { name: "pricing.features.analyticsReport", included: true },
        { name: "pricing.features.publicApiAccess", included: true },
        { name: "pricing.features.pluginsIntegration", included: false },
        { name: "pricing.features.customContentManagement", included: false },
      ],
    },
    {
      name: "pricing.plans.premium",
      price: "89.99",
      isPremium: true,
      features: [
        { name: "pricing.features.freeSetup", included: true },
        { name: "pricing.features.bandwidthLimit", included: true },
        { name: "pricing.features.userConnection", included: true },
        { name: "pricing.features.analyticsReport", included: true },
        { name: "pricing.features.publicApiAccess", included: true },
        { name: "pricing.features.pluginsIntegration", included: true },
        { name: "pricing.features.customContentManagement", included: true },
      ],
    },
  ];
}

