import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-temperature-chart',
  standalone: true, // Pastikan ini adalah komponen standalone
  imports: [NgxEchartsModule], // Impor NgxEchartsModule
  template: `
    <div echarts [options]="chartOption" class="shadow-lg rounded-lg w-28 h-48 bg-white p-1"></div>
  `
})
export class TemperatureChart implements OnInit, OnChanges {
  @Input() temperatureValue!: number; 
  @Input() unit: string = '°C';
  @Input() minTemp!: number;
  @Input() maxTemp!: number;

  chartOption: EChartsOption = {}; 

  constructor() { }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temperatureValue'] || changes['unit'] || changes['minTemp'] || changes['maxTemp'] || changes['chartTitle']) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions(): void {
    // Pastikan nilai suhu berada dalam rentang min dan max
    const value = Math.max(this.minTemp, Math.min(this.maxTemp, this.temperatureValue));

    let barColor: string | echarts.graphic.LinearGradient;

    if (value < (this.minTemp + (this.maxTemp - this.minTemp) * 0.3)) { 
      barColor = '#3366CC';
    } else if (value < (this.minTemp + (this.maxTemp - this.minTemp) * 0.7)) { 
      barColor = '#FF9900';
    } else {
      barColor = '#CC0000'; 
    }

    this.chartOption = {
      // title: {
      //   text: "Now",
      //   left: 'center',
      //   top: '5%',
      //   textStyle: {
      //     color: '#333',
      //     fontSize: 16
      //   }
      // },
      tooltip: {
        formatter: '{b} : {c}' + this.unit,
        position: 'right'
      },
      grid: {
        top: '20%',
        bottom: '20%'
      },
      xAxis: {
        type: 'category',
        data: ['Temperature'],
        show: false,
      },
      yAxis: {
        type: 'value',
        min: this.minTemp,
        max: this.maxTemp,
        axisLabel: {
          formatter: '{value}' + this.unit,
          fontSize: 11
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#eee'
          }
        }
      },
      series: [
        {
          type: 'bar',
          name: 'Temperature',
          data: [value],
          barWidth: '50%',
          itemStyle: {
            color: barColor,
            borderRadius: [5, 5, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}' + this.unit,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333'
          },
          animationDuration: 800,
          animationEasing: 'linear',
        }
      ]
    };
  }
}
