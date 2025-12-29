import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { OrderListsService } from "./order-lists.service";
import { OrderRow } from "./order.model";
import { FormsModule } from "@angular/forms";
import flatpickr from "flatpickr";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-order-lists-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./order-lists.page.html",
  styleUrl: "./order-lists.page.css",
})
export class OrderListsPage implements OnInit, AfterViewInit {
  orders$!: Observable<OrderRow[]>;

  
  dateOpen = false;
  dateRange: [Date | null, Date | null] = [null, null];
  appliedLabel = "Date";
  flatpickrInstance: flatpickr.Instance | null = null;

 
  orderTypeOpen = false;
  orderTypes = ["Digital Product", "Computer", "Fashion", "Accessory", "Mobile"];
  selectedOrderTypes: string[] = [];
  orderTypeLabel = "Order Type";

  orderStatusOpen = false;
  orderStatuses = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"];
  selectedOrderStatuses: string[] = [];
  orderStatusLabel = "Order Status";

  @ViewChild("datePickerInput", { static: false }) datePickerInput!: ElementRef<HTMLInputElement>;

  constructor(private orderService: OrderListsService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  ngAfterViewInit() {
    
  }

  initFlatpickr() {
    if (!this.datePickerInput?.nativeElement) {
      console.error("DatePickerInput not found");
      return;
    }

    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
      this.flatpickrInstance = null;
    }

    const wrapperElement = this.datePickerInput.nativeElement.parentElement;
    if (!wrapperElement) {
      console.error("Wrapper element not found");
      return;
    }

    try {
      this.flatpickrInstance = flatpickr(this.datePickerInput.nativeElement, {
        mode: "range",
        dateFormat: "Y-m-d",
        allowInput: false,
        clickOpens: false,
        inline: true,
        appendTo: wrapperElement,
        static: true,
        onChange: (selectedDates, dateStr) => {
          if (selectedDates.length === 2) {
            this.dateRange = [selectedDates[0], selectedDates[1]];
            this.updateLabel();
          } else if (selectedDates.length === 1) {
            this.dateRange = [selectedDates[0], null];
          } else {
            this.dateRange = [null, null];
          }
        },
      });
      
      console.log("Flatpickr initialized:", this.flatpickrInstance);
    } catch (error) {
      console.error("Error initializing flatpickr:", error);
    }
  }

  trackById(_: number, item: OrderRow) {
    return item.id;
  }

  toggleDate() {
    this.dateOpen = !this.dateOpen;
    if (this.dateOpen) {
      
      setTimeout(() => {
        if (this.datePickerInput?.nativeElement) {
         
          setTimeout(() => {
            if (!this.flatpickrInstance) {
              this.initFlatpickr();
            } else {
              
              this.flatpickrInstance.open();
            }
          }, 50);
        }
      }, 100);
    } else {
      
      if (this.flatpickrInstance) {
        this.flatpickrInstance.destroy();
        this.flatpickrInstance = null;
      }
    }
  }

  closeDate() {
    this.dateOpen = false;
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
      this.flatpickrInstance = null;
    }
  }

  updateLabel() {
    if (this.dateRange[0] && this.dateRange[1]) {
      const start = this.formatDate(this.dateRange[0]);
      const end = this.formatDate(this.dateRange[1]);
      this.appliedLabel = `${start} → ${end}`;
    } else if (this.dateRange[0]) {
      this.appliedLabel = this.formatDate(this.dateRange[0]);
    } else {
      this.appliedLabel = "Date";
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  applyDate() {
    this.updateLabel();
    this.closeDate();
  }

  clearDate() {
    this.dateRange = [null, null];
    this.appliedLabel = "Date";
    if (this.flatpickrInstance) {
      this.flatpickrInstance.clear();
    }
  }

  
  toggleOrderType() {
    this.orderTypeOpen = !this.orderTypeOpen;
  }

  closeOrderType() {
    this.orderTypeOpen = false;
  }

  toggleOrderTypeSelection(type: string) {
    const index = this.selectedOrderTypes.indexOf(type);
    if (index > -1) {
      this.selectedOrderTypes.splice(index, 1);
    } else {
      this.selectedOrderTypes.push(type);
    }
  }

  applyOrderType() {
    if (this.selectedOrderTypes.length > 0) {
      this.orderTypeLabel = this.selectedOrderTypes.join(", ");
    } else {
      this.orderTypeLabel = "Order Type";
    }
    this.closeOrderType();
  }

  clearOrderType() {
    this.selectedOrderTypes = [];
    this.orderTypeLabel = "Order Type";
  }

  toggleOrderStatus() {
    this.orderStatusOpen = !this.orderStatusOpen;
  }

  closeOrderStatus() {
    this.orderStatusOpen = false;
  }

  toggleOrderStatusSelection(status: string) {
    const index = this.selectedOrderStatuses.indexOf(status);
    if (index > -1) {
      this.selectedOrderStatuses.splice(index, 1);
    } else {
      this.selectedOrderStatuses.push(status);
    }
  }

  applyOrderStatus() {
    if (this.selectedOrderStatuses.length > 0) {
      this.orderStatusLabel = this.selectedOrderStatuses.join(", ");
    } else {
      this.orderStatusLabel = "Order Status";
    }
    this.closeOrderStatus();
  }

  clearOrderStatus() {
    this.selectedOrderStatuses = [];
    this.orderStatusLabel = "Order Status";
  }
}
