import { DestroyRef, Injectable, NgZone } from "@angular/core";
import posthog from "posthog-js";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PosthogService {
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {
    this.initPostHog();
  }
  private initPostHog() {
    this.ngZone.runOutsideAngular(() => {
      posthog.init('phc_9F6WCTkAw7GWePFAYIhqRBoGjeuBSG98uonAR2uVxnS', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-01-30',
      });
    });
  }
}
