import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers'
import { NgxEchartsModule } from 'ngx-echarts';

echarts.use([
  GaugeChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    NgxEchartsModule.forRoot({
      echarts: () => Promise.resolve(echarts)
    }).providers!
  ]
};
