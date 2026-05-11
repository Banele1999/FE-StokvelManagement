import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  // private api = inject(ApiService);
  // private auth = inject(AuthService);

  // member = signal<Member | null>(null);
  // fullName = "";
  // phone = "";
  // idNumber = "";
  // monthlyContribution = 0;

  // loading = signal(false);
  // success = signal<string | null>(null);
  // error = signal<string | null>(null);

  // ngOnInit(): void {
  //   this.api.getMe().subscribe((res) => {
  //     this.member.set(res.member);
  //     this.fullName = res.member.fullName;
  //     this.phone = res.member.phone ?? "";
  //     this.idNumber = res.member.idNumber ?? "";
  //     this.monthlyContribution = res.member.monthlyContribution ?? 0;
  //   });
  // }

  // save(): void {
  //   this.loading.set(true);
  //   this.success.set(null);
  //   this.error.set(null);
  //   this.api
  //     .updateMe({
  //       fullName: this.fullName,
  //       phone: this.phone,
  //       idNumber: this.idNumber,
  //       monthlyContribution: Number(this.monthlyContribution) || 0,
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         this.loading.set(false);
  //         this.member.set(res.member);
  //         this.auth.setMember(res.member);
  //         this.success.set("Profile updated.");
  //       },
  //       error: (err) => {
  //         this.loading.set(false);
  //         this.error.set(err?.error?.error || "Failed to update profile");
  //       },
  //     });
  // }
}
