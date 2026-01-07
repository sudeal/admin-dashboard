import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Chart, ChartConfiguration, ChartData, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: "app-charts-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./charts.page.html",
  styleUrl: "./charts.page.css",
})
export class ChartsPage implements AfterViewInit, OnDestroy {
  @ViewChild("barChart", { static: false })
  barChartRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild("pie1", { static: false }) pie1Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("pie2", { static: false }) pie2Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("pie3", { static: false }) pie3Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("pie4", { static: false }) pie4Ref!: ElementRef<HTMLCanvasElement>;

  @ViewChild("donut1", { static: false })
  donut1Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("donut2", { static: false })
  donut2Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("donut3", { static: false })
  donut3Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild("donut4", { static: false })
  donut4Ref!: ElementRef<HTMLCanvasElement>;

  private barChart?: Chart;
  private pieCharts: Chart[] = [];
  private donutCharts: Chart[] = [];

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createPieCharts();
    this.createDonutCharts();
  }

  ngOnDestroy(): void {
    this.barChart?.destroy();
    this.pieCharts.forEach((c) => c.destroy());
    this.donutCharts.forEach((c) => c.destroy());
  }

  private createBarChart(): void {
    const ctx = this.barChartRef.nativeElement.getContext("2d");
    if (!ctx) return;

    const labels = ["1", "2", "3", "4", "5", "6", "7"];

    const data: ChartData<"bar"> = {
      labels,
      datasets: [
        {
          label: "Group A",
          data: [60, 25, 50, 20, 55, 35, 45],
          borderRadius: 10,
          barThickness: 10,
          backgroundColor: "rgba(59, 130, 246, 0.95)",
        },
        {
          label: "Group B",
          data: [35, 10, 20, 15, 25, 30, 40],
          borderRadius: 10,
          barThickness: 10,
          backgroundColor: "rgba(45, 212, 191, 0.9)",
        },
        {
          label: "Group C",
          data: [30, 40, 55, 45, 70, 50, 60],
          borderRadius: 10,
          barThickness: 10,
          backgroundColor: "rgba(249, 115, 22, 0.92)",
        },
        {
          label: "Group D",
          data: [20, 18, 22, 15, 28, 26, 34],
          borderRadius: 10,
          barThickness: 10,
          backgroundColor: "rgba(236, 72, 153, 0.9)",
        },
      ],
    };

    const config: ChartConfiguration<"bar"> = {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        layout: { padding: { top: 8, left: 8, right: 8, bottom: 8 } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
            beginAtZero: true,
            suggestedMax: 80,
          },
        },
      },
    };

    this.barChart?.destroy();
    this.barChart = new Chart(ctx, config);
  }

  // ✅ Pie (içi dolu)
  private createPieCharts(): void {
    this.pieCharts.forEach((c) => c.destroy());
    this.pieCharts = [];

    const pies = [
      { value: 25, color: "rgba(59, 130, 246, 0.95)" }, // mavi
      { value: 25, color: "rgba(168, 85, 247, 0.92)" }, // mor
      { value: 35, color: "rgba(249, 115, 22, 0.92)" }, // turuncu
      { value: 30, color: "rgba(59, 130, 246, 0.75)" }, // açık mavi
    ];

    const targets = [
      this.pie1Ref.nativeElement,
      this.pie2Ref.nativeElement,
      this.pie3Ref.nativeElement,
      this.pie4Ref.nativeElement,
    ];

    pies.forEach((p, idx) => {
      const ctx = targets[idx].getContext("2d");
      if (!ctx) return;

      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Filled", "Empty"],
          datasets: [
            {
              data: [p.value, 100 - p.value],
              backgroundColor: [p.color, "rgba(226, 232, 240, 0.85)"],
              borderWidth: 0,
              hoverOffset: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${value}%`;
                }
              }
            },
          },
        },
      });

      this.pieCharts.push(chart);
    });
  }

  // ✅ Donut
  private createDonutCharts(): void {
    this.donutCharts.forEach((c) => c.destroy());
    this.donutCharts = [];

    const donuts = [
      {
        data: [55, 45],
        colors: [
          "rgba(20, 184, 166, 0.95)",
          "rgba(226, 232, 240, 0.9)",
        ],
      },
      {
        data: [45, 20, 35],
        colors: [
          "rgba(59, 130, 246, 0.95)",
          "rgba(251, 146, 60, 0.95)",
          "rgba(226, 232, 240, 0.9)",
        ],
      },
      {
        data: [25, 20, 55],
        colors: [
          "rgba(250, 204, 21, 0.95)",
          "rgba(59, 130, 246, 0.95)",
          "rgba(20, 184, 166, 0.95)",
        ],
      },
      {
        data: [15, 20, 25, 40],
        colors: [
          "rgba(251, 146, 60, 0.95)",
          "rgba(59, 130, 246, 0.95)",
          "rgba(250, 204, 21, 0.95)",
          "rgba(20, 184, 166, 0.95)",
        ],
      },
    ];

    const targets = [
      this.donut1Ref.nativeElement,
      this.donut2Ref.nativeElement,
      this.donut3Ref.nativeElement,
      this.donut4Ref.nativeElement,
    ];

    donuts.forEach((d, idx) => {
      const ctx = targets[idx].getContext("2d");
      if (!ctx) return;

      const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: d.data.map((_, i) => `Slice ${i + 1}`),
          datasets: [
            {
              data: d.data,
              backgroundColor: d.colors,
              borderWidth: 0,
              hoverOffset: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            },
          },
        },
      });

      this.donutCharts.push(chart);
    });
  }
}
