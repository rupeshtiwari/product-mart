import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { Router } from "@angular/router";
import { User } from "../../core/user";
import { Subscription } from "rxjs";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.findMe().subscribe(user => (this.user = user));

    this.userSubscription = this.authService.user.subscribe(
      user => (this.user = user)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
