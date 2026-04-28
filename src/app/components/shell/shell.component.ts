import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  imports: [],
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
