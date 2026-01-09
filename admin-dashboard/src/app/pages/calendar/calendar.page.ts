import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FullCalendarModule, FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import flatpickr from "flatpickr";

interface EventDetail {
  title: string;
  date: string;
  time: string;
  location: string;
  organization: string;
  attendees: number;
}

interface UpcomingEvent {
  title: string;
  dateTime: string;
  location: string;
  organization: string;
  attendees: number;
}

@Component({
  selector: "app-calendar-page",
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: "./calendar.page.html",
  styleUrl: "./calendar.page.css",
})
export class CalendarPage implements OnInit, AfterViewInit {
  @ViewChild("fullCalendar") fullCalendarComponent!: FullCalendarComponent;
  @ViewChild("dateInput") dateInputRef!: ElementRef<HTMLInputElement>;
  private flatpickrInstance: flatpickr.Instance | null = null;

  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  currentEvent: EventDetail | null = null;

  // ✅ silme için id
  currentEventId: string | null = null;

  showAddEventModal = false;

  // Tooltip sabitleme referansları
  private baseClientX = 0;
  private baseClientY = 0;
  private baseScrollX = 0;
  private baseScrollY = 0;

  // ✅ tooltip’e geçerken kapanmasın
  private isHoveringTooltip = false;
  private hideTooltipTimer: any = null;

  newEvent = {
    title: "",
    date: "",
    time: "",
    location: "",
    organization: "",
    attendees: 0,
  };

  eventColors = [
    { bg: "#8b5cf6", border: "#8b5cf6" },
    { bg: "#ec4899", border: "#ec4899" },
    { bg: "#f97316", border: "#f97316" },
    { bg: "#3b82f6", border: "#3b82f6" },
    { bg: "#10b981", border: "#10b981" },
    { bg: "#f59e0b", border: "#f59e0b" },
  ];

  ngOnInit() {
    this.calendarOptions.events = this.events;
    this.loadEventsFromStorage();
  }

  ngAfterViewInit() {}

  // Tooltip scroll’da sabit kalsın
  @HostListener("window:scroll")
  onWindowScroll() {
    if (!this.tooltipVisible) return;

    const dx = window.scrollX - this.baseScrollX;
    const dy = window.scrollY - this.baseScrollY;

    this.tooltipX = this.baseClientX - dx;
    this.tooltipY = this.baseClientY - dy;
  }

  onTooltipEnter() {
    this.isHoveringTooltip = true;
    if (this.hideTooltipTimer) {
      clearTimeout(this.hideTooltipTimer);
      this.hideTooltipTimer = null;
    }
  }

  onTooltipLeave() {
    this.isHoveringTooltip = false;
    this.hideTooltipWithDelay();
  }

  private hideTooltipWithDelay() {
    if (this.hideTooltipTimer) clearTimeout(this.hideTooltipTimer);

    this.hideTooltipTimer = setTimeout(() => {
      // tooltip üstünde değilse kapat
      if (!this.isHoveringTooltip) {
        this.tooltipVisible = false;
        this.currentEvent = null;
        this.currentEventId = null;
      }
    }, 200); // ✅ hover’dan tooltip’e geçmeye yetecek süre
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  initFlatpickr() {
    if (this.dateInputRef?.nativeElement && !this.flatpickrInstance) {
      this.flatpickrInstance = flatpickr(this.dateInputRef.nativeElement, {
        dateFormat: "Y-m-d",
        defaultDate: this.newEvent.date || new Date(),
        onChange: (_selectedDates, dateStr) => {
          this.newEvent.date = dateStr;
        },
      });
    }
  }

  destroyFlatpickr() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
      this.flatpickrInstance = null;
    }
  }

  openAddEventModal() {
    this.showAddEventModal = true;
    const today = new Date();
    this.newEvent.date = today.toISOString().split("T")[0];
    this.newEvent.time = "09:00";

    setTimeout(() => this.initFlatpickr(), 0);
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
    this.destroyFlatpickr();
    this.resetForm();
  }

  resetForm() {
    this.newEvent = {
      title: "",
      date: "",
      time: "",
      location: "",
      organization: "",
      attendees: 0,
    };
  }

  addEvent() {
    if (!this.newEvent.title || !this.newEvent.date) {
      alert("Please fill in event title and date");
      return;
    }

    const colorIndex = Math.floor(Math.random() * this.eventColors.length);
    const color = this.eventColors[colorIndex];

    const timeStr = this.newEvent.time || "09:00";
    const [hours, minutes] = timeStr.split(":");
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    const hour12 = parseInt(hours) % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;

    const id = this.generateId();

    const newEvent: EventInput = {
      id,
      title: this.newEvent.title,
      start: this.newEvent.date,
      backgroundColor: color.bg,
      borderColor: color.border,
      extendedProps: {
        time: formattedTime,
        location: this.newEvent.location || "TBA",
        organization: this.newEvent.organization || "",
        attendees: this.newEvent.attendees || 0,
      },
    };

    this.events = [...this.events, newEvent];
    this.saveEventsToStorage();
    this.updateCalendarEvents();
    this.closeAddEventModal();
  }

  saveEventsToStorage() {
    localStorage.setItem("calendarEvents", JSON.stringify(this.events));
  }

  loadEventsFromStorage() {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) {
      try {
        const parsed: EventInput[] = JSON.parse(stored);
        // id yoksa ekle
        this.events = parsed.map((e) => ({ ...e, id: (e as any).id ?? this.generateId() }));
        this.saveEventsToStorage();
        this.updateCalendarEvents();
      } catch (e) {
        console.error("Error loading events:", e);
      }
    } else {
      this.saveEventsToStorage();
    }
  }

  updateCalendarEvents() {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.events],
    };

    const api = this.fullCalendarComponent?.getApi?.();
    if (api) {
      api.removeAllEvents();
      api.addEventSource([...this.events]);
    }
  }

  get upcomingEvents(): UpcomingEvent[] {
    return this.events.map((event, index) => {
      const startDate = event.start ? new Date(event.start as string) : new Date();
      const endDate = event.end ? new Date(event.end as string) : null;
      const extendedProps = (event.extendedProps as any) || {};

      let dateTime: string;
      if (index === 0) {
        dateTime = `Today ${extendedProps.time || ""}`;
      } else if (endDate) {
        const actualEndDate = new Date(endDate);
        actualEndDate.setDate(actualEndDate.getDate() - 1);
        const startDay = startDate.getDate();
        const endDay = actualEndDate.getDate();
        const month = startDate.toLocaleDateString("en-US", { month: "long" });
        const year = startDate.getFullYear();
        dateTime = `${startDay}-${endDay} ${month} ${year} at ${extendedProps.time || ""}`;
      } else {
        dateTime = `${startDate.getDate()} ${startDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })} at ${extendedProps.time || ""}`;
      }

      return {
        title: event.title as string,
        dateTime: dateTime.trim(),
        location: extendedProps.location || "TBA",
        organization: extendedProps.organization || "",
        attendees: extendedProps.attendees || 0,
      };
    });
  }

  // başlangıç eventleri
  events: EventInput[] = [
    {
      id: "seed-1",
      title: "Design Conference",
      start: "2026-01-08",
      end: "2026-01-09",
      backgroundColor: "#8b5cf6",
      borderColor: "#8b5cf6",
      extendedProps: {
        time: "07:19 AM",
        location: "56 Davion Mission Suite 157",
        organization: "Zillul Design Agency",
        attendees: 15,
      },
    },
    {
      id: "seed-2",
      title: "Weekend Festival",
      start: "2026-01-15",
      backgroundColor: "#ec4899",
      borderColor: "#ec4899",
      extendedProps: {
        time: "10:00 AM",
        location: "Central Park",
        organization: "Music Events Inc",
        attendees: 8,
      },
    },
    {
      id: "seed-3",
      title: "Glastonbury Festival",
      start: "2026-01-22",
      end: "2026-01-24",
      backgroundColor: "#f97316",
      borderColor: "#f97316",
      extendedProps: {
        time: "02:00 PM",
        location: "Festival Grounds",
        organization: "Glastonbury Events",
        attendees: 12,
      },
    },
    {
      id: "seed-4",
      title: "Glastonbury Festival",
      start: "2026-01-28",
      backgroundColor: "#3b82f6",
      borderColor: "#3b82f6",
      extendedProps: {
        time: "09:30 AM",
        location: "Convention Center",
        organization: "Glastonbury Events",
        attendees: 20,
      },
    },
  ];

  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: "today",
      center: "prev title next",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    buttonText: {
      today: "Today",
      month: "Month",
      week: "Week",
      day: "Day",
    },
    height: "100%",
    expandRows: true,
    events: [],
    initialDate: "2026-01-01",
    dayMaxEvents: true,

    eventMouseEnter: (info) => {
      const event = info.event;
      const extendedProps = event.extendedProps as any;

      this.currentEventId = event.id || null;

      const startDate = event.start ? new Date(event.start) : new Date();
      const endDate = event.end ? new Date(event.end) : null;

      let formattedDate: string;
      if (endDate) {
        const actualEndDate = new Date(endDate);
        actualEndDate.setDate(actualEndDate.getDate() - 1);
        formattedDate = `${startDate.toLocaleDateString("en-US", { month: "long" })} ${startDate.getDate()}-${actualEndDate.getDate()}, ${startDate.getFullYear()}`;
      } else {
        formattedDate = startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      this.currentEvent = {
        title: event.title,
        date: formattedDate,
        time: extendedProps.time || "All Day",
        location: extendedProps.location || "TBA",
        organization: extendedProps.organization || "",
        attendees: extendedProps.attendees || 0,
      };

      // tooltip sabit referansı
      const x = info.jsEvent.clientX;
      const y = info.jsEvent.clientY;

      this.baseClientX = x;
      this.baseClientY = y;
      this.baseScrollX = window.scrollX;
      this.baseScrollY = window.scrollY;

      const tooltipWidth = 320;
      const tooltipHeight = 300;
      const offset = 12;

      let tx = x + offset;
      let ty = y + offset;

      if (tx + tooltipWidth + 10 > window.innerWidth) tx = x - tooltipWidth - offset;
      if (ty + tooltipHeight + 10 > window.innerHeight) ty = y - tooltipHeight - offset;

      this.tooltipX = tx;
      this.tooltipY = ty;
      this.tooltipVisible = true;
    },

    eventMouseLeave: () => {
      // ✅ hemen kapatma, tooltip’e geçme şansı ver
      this.hideTooltipWithDelay();
    },
  };

  deleteEvent(ev?: MouseEvent) {
    // ✅ tooltip kapanma/leave olaylarını engelle
    ev?.stopPropagation();
    ev?.preventDefault();

    if (!this.currentEventId) return;

    const id = this.currentEventId;

    // 1) array’den sil
    this.events = this.events.filter((e) => (e as any).id !== id);

    // 2) storage
    this.saveEventsToStorage();

    // 3) calendar api’den de kaldır (en garanti)
    const api = this.fullCalendarComponent?.getApi?.();
    if (api) {
      const fcEvent = api.getEventById(id);
      fcEvent?.remove();
    }

    // 4) yeniden kaynakla (sol kart da update)
    this.updateCalendarEvents();

    // 5) tooltip kapat
    this.tooltipVisible = false;
    this.currentEvent = null;
    this.currentEventId = null;
  }
}
