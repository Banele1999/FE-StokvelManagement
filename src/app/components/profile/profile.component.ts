import { Component, OnInit, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { Member } from "../../models/types";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="row">
      <div class="col-lg-7">
        <div class="card p-3 p-md-4">
          <h5 class="mb-3"><i class="bi bi-person-circle me-2 text-brand"></i>My profile</h5>

          @if (success()) {
            <div class="alert alert-success py-2">{{ success() }}</div>
          }
          @if (error()) {
            <div class="alert alert-danger py-2">{{ error() }}</div>
          }

          <form (ngSubmit)="save()" #f="ngForm">
            <div class="mb-3">
              <label class="form-label">Full name</label>
              <input type="text" class="form-control" name="fullName" [(ngModel)]="fullName" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" [value]="member()?.email" disabled />
            </div>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" name="phone" [(ngModel)]="phone" />
              </div>
              <div class="col-sm-6 mb-3">
                <label class="form-label">ID number</label>
                <input type="text" class="form-control" name="idNumber" [(ngModel)]="idNumber" />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Monthly contribution (R)</label>
              <input
                type="number"
                min="0"
                class="form-control"
                name="monthlyContribution"
                [(ngModel)]="monthlyContribution"
              />
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="loading() || f.invalid">
              @if (loading()) {
                <span class="spinner-border spinner-border-sm me-2"></span>
              }
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  member = signal<Member | null>(null);
  fullName = "";
  phone = "";
  idNumber = "";
  monthlyContribution = 0;

  loading = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.api.getMe().subscribe((res) => {
      this.member.set(res.member);
      this.fullName = res.member.fullName;
      this.phone = res.member.phone ?? "";
      this.idNumber = res.member.idNumber ?? "";
      this.monthlyContribution = res.member.monthlyContribution ?? 0;
    });
  }

  save(): void {
    this.loading.set(true);
    this.success.set(null);
    this.error.set(null);
    this.api
      .updateMe({
        fullName: this.fullName,
        phone: this.phone,
        idNumber: this.idNumber,
        monthlyContribution: Number(this.monthlyContribution) || 0,
      })
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.member.set(res.member);
          this.auth.setMember(res.member);
          this.success.set("Profile updated.");
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.error || "Failed to update profile");
        },
      });
  }
}
