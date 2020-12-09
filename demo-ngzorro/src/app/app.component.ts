import { AfterViewInit, Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  isCollapsed = false;
  loading = false;
  constructor(private router: Router) {
    this.loading = true;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd || event instanceof NavigationCancel
      ) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        console.log('event', event);
      }
    });
  }
}
