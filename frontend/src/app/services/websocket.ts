import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { RealtimeMessage } from '../models/data.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Websocket implements OnDestroy {
  private websocket!: WebSocket;

  private messageSubject: Subject<RealtimeMessage> = new Subject<RealtimeMessage>();
  public messages$: Observable<RealtimeMessage> = this.messageSubject.asObservable();

  private connectionStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isConnected: Observable<boolean> = this.connectionStatusSubject.asObservable();

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;

  private readonly WEBSOCKET_URL = environment.websocketUrl

  constructor() {
    this.connect()
  }

  private connect(): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      console.warn('Websocket: Connection already open');
      return;
    }

    console.log('Websocket: Connecting...');
    this.websocket = new WebSocket(this.WEBSOCKET_URL);

    this.websocket.onopen = (event) => {
      console.log('Websocket: Connection open!');
      this.reconnectAttempts = 0;
      this.connectionStatusSubject.next(true);
    }

    this.websocket.onmessage = (event) => {
      try {
        const data: RealtimeMessage = JSON.parse(event.data);
        this.messageSubject.next(data);
      } catch(e) {
        console.error('Websocket: Failed to parse JSON data');
      }
    }

    this.websocket.onerror = (event) => {
      console.error('Websocket: Error: ', event);
      this.connectionStatusSubject.next(false);
    }

    this.websocket.onclose = (event) => {
      console.log(`Websocket: Connection closed: ${event}`);
      this.connectionStatusSubject.next(false);

      if (event.wasClean) {
        console.log(`Websocket: Connection closed with code: ${event.code}`);
      } else {
        console.error(`Websocket: Connection closed unexpectedly. Reconnecting...`);
        this.handleReconnect();
      }
    } 
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Websocket: Reconnect attempt (${this.reconnectAttempts}) in ${this.reconnectInterval / 1000} second...`);
      
      timer(this.reconnectInterval).subscribe(() => {
        this.connect();
      });
    } else {
      console.error('Websocket: Max attempt reached. Cannot reconnect');
    }
  }

  closeConnection(): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.close(1000, 'Client disconnected');
      this.connectionStatusSubject.next(false);
    }
  }

  ngOnDestroy(): void {
    this.closeConnection();
    this.messageSubject.complete();
    this.connectionStatusSubject.complete();
  }
}
