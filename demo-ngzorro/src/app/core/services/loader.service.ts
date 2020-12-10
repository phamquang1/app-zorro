import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { SpinnerComponent } from 'src/app/share/spinner/spinner.component';
// import { OverlayRef } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  overlayRef: OverlayRef;
  constructor(
    private overlay: Overlay,
  ) { }
  // tslint:disable-next-line:typedef
  open() {
    if (this.overlayRef) {
      return this.overlayRef;
    }

    const positionStrategy: GlobalPositionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(SpinnerComponent);
    overlayRef.attach(portal);
    this.overlayRef = overlayRef;
    return this.overlayRef;
  }

  // tslint:disable-next-line:typedef
  close() {
    if (this.overlayRef !== null) {
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
  }
}
