import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-motion-detected',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col justify-center items-center p-2 gap-2">
      <ng-container class="w-32 max-h-32 flex justify-center items-center" *ngIf="motionDetected; else noMotion">
        <svg 
          class="w-20 h-32 text-blue-500 py-1"
          version="1.0" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 757.000000 1280.000000"
          preserveAspectRatio="xMidYMid meet">
          <g 
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="#3b82f6"
            stroke="none"
          >
          <path d="M4084 12786 c-416 -68 -756 -378 -860 -785 -125 -485 105 -988 553 -1210 165 -82 277 -106 478 -105 139 1 173 4 257 27 363 97 649 374 752 728 75 260 51 520 -69 764 -139 281 -387 483 -690 561 -123 31 -301 40 -421 20z"/>
          <path d="M3765 10455 c-149 -24 -309 -86 -443 -172 -74 -46 -2133 -1715 -2202 -1783 -60 -59 -99 -121 -124 -197 -22 -70 -474 -2108 -482 -2173 -8 -72 15 -180 56 -260 87 -172 293 -278 483 -249 91 14 195 68 266 140 91 91 122 163 177 409 55 250 351 1598 356 1623 2 13 738 620 745 614 1 -1 -254 -1134 -567 -2518 l-568 -2516 -685 -1150 c-377 -633 -697 -1177 -710 -1209 -91 -218 -88 -412 9 -613 38 -78 60 -108 132 -181 99 -99 186 -152 304 -187 250 -72 497 -13 689 164 33 31 80 84 103 117 81 114 1517 2546 1576 2669 l59 122 178 823 c97 452 180 821 184 820 12 -6 1529 -1669 1529 -1677 0 -16 459 -2425 476 -2496 58 -253 250 -466 488 -541 330 -104 696 50 852 358 71 140 93 324 60 499 -8 41 -45 233 -81 425 -36 192 -115 608 -175 924 -60 316 -139 733 -175 925 -65 345 -95 462 -134 526 -11 18 -442 532 -958 1142 -516 609 -937 1114 -936 1120 8 44 475 2093 478 2096 2 2 96 -181 208 -406 158 -315 215 -420 251 -460 57 -63 1612 -1139 1711 -1184 189 -85 399 -46 539 100 173 182 179 463 13 647 -31 35 -269 204 -785 560 l-740 509 -145 290 c-643 1278 -931 1841 -966 1888 -257 349 -656 525 -1046 462z"/>
          </g>
        </svg>
      </ng-container>
      <ng-template class="w-32 max-h-32 flex justify-center items-center" #noMotion>
        <svg 
          class="w-32 h-32 text-gray-500"
          version="1.0" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 900.000000 899.000000"
          preserveAspectRatio="xMidYMid meet">
          <g 
            transform="translate(0.000000,899.000000) scale(0.100000,-0.100000)"
            fill="#6b7280"
            stroke="none">
            <path d="M4417 8710 c-247 -30 -449 -177 -561 -410 l-41 -85 0 -200 0 -200 46
            -95 c84 -172 175 -268 327 -342 115 -56 168 -68 303 -68 145 0 204 11 298 55
            160 76 271 182 351 336 50 96 60 158 56 349 -3 128 -6 152 -29 208 -127 309
            -428 490 -750 452z"/>
            <path d="M3800 7160 c-279 -10 -377 -37 -541 -146 -191 -127 -356 -372 -379
            -564 -32 -260 -32 -2359 -1 -2476 15 -57 80 -127 149 -161 48 -24 69 -28 138
            -28 73 0 88 4 149 35 84 43 130 101 145 181 6 33 11 451 12 1053 l3 1000 68 0
            67 1 0 -2270 c0 -2129 4 -2992 15 -3179 6 -100 29 -149 104 -218 71 -66 156
            -109 230 -115 75 -7 194 12 258 42 65 30 142 105 180 176 l28 54 3 1623 3
            1622 69 0 69 0 4 -1587 c5 -1651 5 -1660 47 -1743 25 -50 102 -116 170 -149
            51 -24 65 -26 190 -26 126 0 139 2 192 27 62 29 151 106 174 149 16 31 31 156
            38 324 3 66 6 1278 6 2693 l0 2572 68 0 69 0 6 -1046 5 -1047 29 -41 c137
            -194 452 -173 543 37 22 49 24 72 31 352 10 352 8 1635 -2 1910 -6 158 -12
            206 -33 282 -46 168 -119 286 -259 420 -141 135 -300 213 -479 234 -106 12
            -1297 19 -1568 9z"/>
          </g>
        </svg>
      </ng-template>
      <p
        [ngClass]="{'text-blue-500': motionDetected, 'text-gray-500': !motionDetected}"
        class="text-xl font-bold"
      >
        {{motionDetected ? 'Motion Detected' : 'No Motion'}}
      </p>
    </div>
  `,
  styles: ``
})
export class MotionDetected {
  @Input() motionDetected: boolean = false;

}
