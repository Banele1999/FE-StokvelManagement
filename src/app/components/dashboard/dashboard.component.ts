import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
[x: string]: any;
  // private api = inject(ApiService);
  // auth = inject(AuthService);
  // notifs = inject(NotificationsService);

  // member = signal<Member | null>(null);
  // stats = signal<MemberStats | null>(null);
  // recent = signal<Payment[]>([]);
  // loading = signal(true);

  // ngOnInit(): void {
  //   this.api.getMe().subscribe({
  //     next: (res) => {
  //       this.member.set(res.member);
  //       this.auth.setMember(res.member);
  //       this.stats.set(res.stats);
  //     },
  //   });
  //   this.api.listPayments().subscribe({
  //     next: (res) => {
  //       this.recent.set(res.payments.slice(0, 5));
  //       this.loading.set(false);
  //     },
  //     error: () => this.loading.set(false),
  //   });
  // }

  // openNotifs(): void {
  //   this.notifs.refresh();
  //   this.notifs.open();
  // }
}
