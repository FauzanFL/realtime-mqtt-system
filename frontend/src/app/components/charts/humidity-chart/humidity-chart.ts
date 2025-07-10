import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';

import * as echarts from 'echarts/core';
import 'echarts-liquidfill';

@Component({
  selector: 'app-humidity-chart',
  standalone: true,
  imports: [],
  template: `
    <div #chartContainer class="h-48 w-48"></div>
  `,
  styles: ``
})
export class HumidityChart implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() humidityValue: number = 0.0;

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private myChart: echarts.ECharts | undefined;

  chartOption: EChartsOption = {}

  ngOnInit(): void {
    this.updateChartOptions();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.myChart && changes['humidityValue']) {
      this.updateChartOptions();
    }
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = undefined;
    }
  }

  private initializeChart(): void {
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.myChart = echarts.init(this.chartContainer.nativeElement);
      this.updateChartOptions();
    } else {
      console.error('Chart container element not found!');
    }
  }

  private updateChartOptions(): void {
    if (!this.myChart) {
      return;
    }
    // Pastikan nilai berada dalam rentang 0.0 hingga 1.0
    const value = this.humidityValue / 100;

    const option: echarts.EChartsCoreOption = {
      series: [
        {
          type: 'liquidFill',
          data: [value, value*0.8],
          name: 'LiquidFill Series',
          color: ['#00BFFF', '#4682B4'],
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: '#156ACF',
              borderWidth: 5,
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.25)'
            }
          },
          backgroundStyle: {
            color: '#E0FFFF'
          },
          label: {
            formatter: (param: any) => {
              return (param.value * 100).toFixed(0) + '%';
            },
            textStyle: {
              color: 'rgba(25, 137, 243, 1)',
              fontSize: 40,
              fontWeight: 'bold'
            },
            position: ['50%', '50%']
          },
          radius: '80%',
          amplitude: 8,
          waveAnimation: true,
          animationDuration: 1000,
          animationDurationUpdate: 1000,
        }
      ]
    };

    this.myChart.setOption(option);
  }
}
