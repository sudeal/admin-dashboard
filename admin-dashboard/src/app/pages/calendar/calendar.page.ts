import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
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
  showAddEventModal = false;

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
  
  ngAfterViewInit() {
    // Flatpickr will be initialized when modal opens
  }
  
  initFlatpickr() {
    if (this.dateInputRef?.nativeElement && !this.flatpickrInstance) {
      this.flatpickrInstance = flatpickr(this.dateInputRef.nativeElement, {
        dateFormat: "Y-m-d",
        defaultDate: this.newEvent.date || new Date(),
        locale: {
          firstDayOfWeek: 0,
          weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          months: {
            shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          }
        } as any,
        onChange: (selectedDates, dateStr) => {
          this.newEvent.date = dateStr;
        }
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
    
    // Initialize flatpickr after view updates
    setTimeout(() => {
      this.initFlatpickr();
    }, 0);
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

    const newEvent: EventInput = {
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

    this.events.push(newEvent);
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
        const parsedEvents = JSON.parse(stored);
        this.events = parsedEvents;
        this.updateCalendarEvents();
      } catch (e) {
        console.error("Error loading events from storage:", e);
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

    if (this.fullCalendarComponent?.getApi()) {
      this.fullCalendarComponent.getApi().refetchEvents();
    }
  }

  get upcomingEvents(): UpcomingEvent[] {
    return this.events.map((event, index) => {
      const startDate = event.start ? new Date(event.start as string) : new Date();
      const endDate = event.end ? new Date(event.end as string) : null;
      const extendedProps = event.extendedProps as any;

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

      const organizationMap: { [key: string]: string } = {
        "Design Conference": "Meaghanberg",
        "Weekend Festival": "Sweden",
        "Glastonbury Festival": index === 2 ? "Turks and Caicos Islands" : "San Marino",
      };

      return {
        title: event.title as string,
        dateTime: dateTime.trim(),
        location: extendedProps.location || "TBA",
        organization: organizationMap[event.title as string] || extendedProps.organization || "",
        attendees: extendedProps.attendees || 0,
      };
    });
  }

  events: EventInput[] = [
    {
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

    // ✅ BOŞLUK KAPATMA (eklenen)
    height: "100%",
    //contentHeight: "auto",
    expandRows: true,

    events: [],
    initialDate: "2026-01-01",
    dayMaxEvents: true,
    weekends: true,
    editable: false,
    selectable: false,

    eventMouseEnter: (info) => {
      const event = info.event;
      const extendedProps = event.extendedProps as any;
      const startDate = event.start ? new Date(event.start) : new Date();
      const endDate = event.end ? new Date(event.end) : null;

      let formattedDate: string;
      if (endDate) {
        const actualEndDate = new Date(endDate);
        actualEndDate.setDate(actualEndDate.getDate() - 1);

        if (actualEndDate.getTime() !== startDate.getTime()) {
          const startDay = startDate.getDate();
          const endDay = actualEndDate.getDate();
          const month = startDate.toLocaleDateString("en-US", { month: "long" });
          const year = startDate.getFullYear();
          formattedDate = `${month} ${startDay}-${endDay}, ${year}`;
        } else {
          formattedDate = startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        }
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

      const x = info.jsEvent.clientX;
      const y = info.jsEvent.clientY;
      const tooltipWidth = 320;
      const tooltipHeight = 300;

      if (x + tooltipWidth + 20 > window.innerWidth) {
        this.tooltipX = x - tooltipWidth - 20;
      } else {
        this.tooltipX = x + 10;
      }

      if (y + tooltipHeight + 20 > window.innerHeight) {
        this.tooltipY = y - tooltipHeight - 20;
      } else {
        this.tooltipY = y + 10;
      }

      this.tooltipVisible = true;
    },

    eventMouseLeave: () => {
      this.tooltipVisible = false;
      this.currentEvent = null;
    },
  };
}
