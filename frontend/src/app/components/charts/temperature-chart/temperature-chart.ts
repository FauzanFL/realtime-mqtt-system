import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-temperature-chart',
  standalone: true, // Pastikan ini adalah komponen standalone
  imports: [NgxEchartsModule], // Impor NgxEchartsModule
  template: `
    <!-- Kontainer chart dengan ukuran tetap -->
    <div echarts [options]="chartOption" class="chart-container shadow-lg rounded-lg bg-white p-2"></div>
  `,
  styles: [`
    /* Gunakan kelas CSS kustom daripada langsung Tailwind di template untuk kontrol lebih */
    .chart-container {
      width: 120px;   /* Lebar tetap untuk termometer */
      height: 350px;  /* Tinggi tetap untuk termometer */
      margin: 20px auto; /* Pusatkan secara horizontal */
      /* Gaya Tailwind yang Anda inginkan bisa diterapkan di sini atau di template */
      /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); */
      /* border-radius: 0.5rem; */
      /* background-color: #fff; */
      /* padding: 0.5rem; */

      /* Penting: Pastikan ini tidak ditimpa oleh CSS lain */
      display: block; /* Memastikan div mengambil lebar dan tinggi yang ditentukan */
      position: relative; /* Jika ada elemen absolut di dalamnya */
      overflow: hidden; /* Mencegah konten meluap jika ada kustomisasi ekstrem */
    }
  `]
})
export class TemperatureChart implements OnInit, OnChanges {
  @Input() temperatureValue!: number; // Nilai suhu yang akan ditampilkan
  @Input() unit: string = '°C'; // Satuan suhu, default °C
  @Input() minTemp!: number; // Nilai suhu minimum untuk skala
  @Input() maxTemp!: number; // Nilai suhu maksimum untuk skala
  @Input() chartTitle: string = 'Suhu Saat Ini'; // Judul chart

  chartOption: EChartsOption = {}; // Objek untuk konfigurasi ECharts

  constructor() { }

  ngOnInit(): void {
    // Panggil updateChartOptions saat komponen diinisialisasi
    this.updateChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Panggil updateChartOptions setiap kali input berubah
    if (changes['temperatureValue'] || changes['unit'] || changes['minTemp'] || changes['maxTemp'] || changes['chartTitle']) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions(): void {
    // Pastikan nilai suhu berada dalam rentang min dan max
    const value = Math.max(this.minTemp, Math.min(this.maxTemp, this.temperatureValue));

    this.chartOption = {
      title: {
        text: this.chartTitle,
        left: 'center',
        top: '5%', // Sesuaikan posisi judul agar tidak terlalu dekat dengan chart
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}' + this.unit // Menampilkan satuan di tooltip
      },
      series: [
        {
          type: 'gauge',
          min: this.minTemp, // Skala minimum
          max: this.maxTemp, // Skala maksimum
          center: ['50%', '70%'], // Geser pusat ke bawah untuk membuat ruang di atas dan bawah
          radius: '85%', // Ukuran chart secara keseluruhan, sedikit lebih kecil dari 90%
          startAngle: 180, // Sudut awal (untuk vertikal dari bawah)
          endAngle: 0,     // Sudut akhir (untuk vertikal ke atas)
          splitNumber: (this.maxTemp - this.minTemp) / 10, // Jumlah interval skala besar (misal setiap 10 derajat)

          // Opsi untuk Garis Sumbu (badan termometer)
          axisLine: {
            lineStyle: {
              width: 18, // Ketebalan kolom merkuri
              color: [ // Warna gradient sesuai suhu
                [0.3, '#3366CC'], // Biru untuk dingin (0-30% dari rentang)
                [0.6, '#FF9900'], // Oranye untuk sedang (30-60% dari rentang)
                [1, '#CC0000']   // Merah untuk panas (60-100% dari rentang)
              ],
              cap: 'butt' // Sangat penting: membuat ujung garis rata, bukan bulat
            }
          },
          // Opsi untuk Tanda Centang Sumbu (garis skala kecil)
          axisTick: {
            show: true,
            splitNumber: 5, // Jumlah tick kecil antar setiap splitNumber
            lineStyle: {
              color: '#999',
              width: 1
            },
            length: 8 // Panjang tick
          },
          // Opsi untuk Label Sumbu (nilai suhu di samping skala)
          axisLabel: {
            formatter: '{value}' + this.unit, // Menampilkan satuan di label
            distance: 12, // Jarak label dari garis sumbu
            color: '#666',
            fontSize: 11
          },
          // Opsi untuk Garis Pembagi (garis skala besar)
          splitLine: {
            show: true,
            length: 15, // Panjang garis pembagi utama
            lineStyle: {
              color: '#999',
              width: 2
            }
          },
          // Opsi untuk Indikator Penunjuk (merkuri/cairan)
          pointer: {
            show: true,
            length: '75%', // Panjang penunjuk relatif terhadap radius
            width: 8,       // Ketebalan penunjuk
            itemStyle: {
              color: 'red' // Warna penunjuk (bisa diatur manual)
            }
          },
          // Gaya jarum penunjuk (untuk efek "bola" di pangkal)
          anchor: {
            show: true,
            showAbove: true,
            size: 15, // Ukuran "bola" di pangkal
            itemStyle: {
              color: '#CC0000' // Warna bola pangkal
            }
          },
          // Opsi untuk Detail (nilai numerik di bagian bawah termometer)
          detail: {
            formatter: '{value}' + this.unit, // Menampilkan satuan di detail
            fontSize: 30,
            offsetCenter: [0, '100%'], // Posisikan di bawah badan termometer
            color: '#333',
            fontWeight: 'bold'
          },
          // Data suhu saat ini
          data: [{
            value: value,
            name: 'Suhu'
          }],
          animationDuration: 800,
          animationDurationUpdate: 500,
          animationEasing: 'linear'
        }
      ]
    };
  }
}
