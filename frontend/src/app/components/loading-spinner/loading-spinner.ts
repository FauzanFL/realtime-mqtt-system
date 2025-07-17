import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Loading } from '../../services/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async" class="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)]">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 border-l-transparent"></div>
      <!-- <p class="text-white text-4xl">Loading...</p> -->
    </div>
  `,
  styles: `
    @keyframes spinner-animation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .animate-spin {
      animation: spinner-animation 1s linear infinite;
    }
  `
})
export class LoadingSpinner implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>;
  private loadingSubs!: Subscription;

  constructor(private loadingService: Loading) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;

    this.loadingSubs = this.isLoading$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
