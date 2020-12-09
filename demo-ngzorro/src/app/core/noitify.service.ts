import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NoitifyService {

  constructor(
    private notification: NzNotificationService
  ) { }
  // tslint:disable-next-line:typedef
  success(title, content) {
    this.notification.create('success', title, content);
  }
  // tslint:disable-next-line:typedef
  warning(title, content) {
    this.notification.create('warning', title, content);
  }
  // tslint:disable-next-line:typedef
  error(title, content) {
    this.notification.create('error', title, content);
  }
  // tslint:disable-next-line:typedef
  info(title, content) {
    this.notification.create('info', title, content);
  }
}
