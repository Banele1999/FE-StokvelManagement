import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NotificationsModalComponent } from "../notifications-modal/notifications-modal.component";
import { ChatboxComponent } from "../chatbox/chatbox.component";

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NotificationsModalComponent, ChatboxComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  // auth = inject(AuthService);
  // notifs = inject(NotificationsService);
  // private router = inject(Router);

  // ngOnInit(): void {
  //   this.notifs.refresh();
  //   setInterval(() => this.notifs.refresh(), 30_000);
  // }

  // openNotifs(): void {
  //   this.notifs.refresh();
  //   this.notifs.open();
  // }

  // logout(): void {
  //   this.auth.logout();
  //   this.router.navigate(["/login"]);
  // }
}
