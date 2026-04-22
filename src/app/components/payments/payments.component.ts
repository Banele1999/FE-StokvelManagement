import { Component, OnInit, inject, signal } from "@angular/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Payment } from "../../models/types";

@Component({
  selector: "app-payments",
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule],
  template: `
    <div class="row g-4">
      <div class="col-lg-5">
        <div class="card p-3 p-md-4">
          <h5 class="mb-3">
            <i class="bi bi-cloud-upload text-brand me-2"></i>Record a payment
          </h5>
          <p class="text-muted small">
            Capture the details of a contribution and attach your proof of payment.
          </p>

          @if (success()) {
            <div class="alert alert-success py-2">{{ success() }}</div>
          }
          @if (error()) {
            <div class="alert alert-danger py-2">{{ error() }}</div>
          }

          <form (ngSubmit)="submit()" #f="ngForm">
            <div class="mb-3">
              <label class="form-label">Amount (R)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                class="form-control"
                name="amount"
                [(ngModel)]="amount"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Payment method</label>
              <select class="form-select" name="method" [(ngModel)]="method">
                <option value="eft">EFT / Bank transfer</option>
                <option value="cash">Cash</option>
                <option value="transfer">Instant transfer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Reference</label>
              <input
                type="text"
                class="form-control"
                name="reference"
                [(ngModel)]="reference"
                placeholder="e.g. May-2026"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Payment date</label>
              <input
                type="date"
                class="form-control"
                name="paidAt"
                [(ngModel)]="paidAt"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Proof of payment</label>
              <input
                type="file"
                class="form-control"
                (change)="onFile($event)"
                accept="image/*,application/pdf"
              />
              <div class="form-text">Max 5MB — PDF or image.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Note <span class="text-muted">(optional)</span></label>
              <textarea
                class="form-control"
                rows="2"
                name="note"
                [(ngModel)]="note"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              [disabled]="loading() || f.invalid"
            >
              @if (loading()) {
                <span class="spinner-border spinner-border-sm me-2"></span>
              }
              Submit payment
            </button>
          </form>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="card p-3 p-md-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Payment history</h5>
            <button class="btn btn-sm btn-outline-primary" (click)="refresh()" [disabled]="listLoading()">
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          @if (listLoading()) {
            <div class="text-center py-4">
              <div class="spinner-border text-success"></div>
            </div>
          } @else if (payments().length === 0) {
            <p class="text-muted mb-0">You have no payments on record yet.</p>
          } @else {
            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="text-muted small">
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Proof</th>
                  </tr>
                </thead>
                <tbody>
                  @for (p of payments(); track p.id) {
                    <tr>
                      <td>{{ p.paidAt | date: "mediumDate" }}</td>
                      <td class="fw-semibold">{{ p.amount | currency: "ZAR":"R " }}</td>
                      <td class="text-capitalize">{{ p.method }}</td>
                      <td class="text-muted">{{ p.reference || "—" }}</td>
                      <td>
                        <span
                          class="badge"
                          [class.bg-success]="p.status === 'verified'"
                          [class.bg-warning]="p.status === 'pending'"
                          [class.text-dark]="p.status === 'pending'"
                          [class.bg-danger]="p.status === 'rejected'"
                          >{{ p.status }}</span
                        >
                      </td>
                      <td>
                        @if (p.hasProof) {
                          <a
                            [href]="'/api/payments/' + p.id + '/proof'"
                            target="_blank"
                            class="small"
                            >View</a
                          >
                        } @else {
                          <span class="text-muted small">—</span>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PaymentsComponent implements OnInit {
  private api = inject(ApiService);

  amount = 0;
  method = "eft";
  reference = "";
  paidAt = new Date().toISOString().slice(0, 10);
  note = "";
  proofFile: File | null = null;

  loading = signal(false);
  listLoading = signal(true);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  payments = signal<Payment[]>([]);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.listLoading.set(true);
    this.api.listPayments().subscribe({
      next: (res) => {
        this.payments.set(res.payments);
        this.listLoading.set(false);
      },
      error: () => this.listLoading.set(false),
    });
  }

  onFile(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.proofFile = input.files && input.files.length > 0 ? input.files[0]! : null;
  }

  submit(): void {
    if (!this.amount || this.amount <= 0) return;
    const form = new FormData();
    form.append("amount", String(this.amount));
    form.append("method", this.method);
    form.append("reference", this.reference);
    form.append("paidAt", this.paidAt);
    form.append("note", this.note);
    if (this.proofFile) form.append("proof", this.proofFile);

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);
    this.api.createPayment(form).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set("Payment submitted. It will be verified by the treasurer shortly.");
        this.amount = 0;
        this.reference = "";
        this.note = "";
        this.proofFile = null;
        (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.value &&
          ((document.querySelector('input[type="file"]') as HTMLInputElement).value = "");
        this.refresh();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error || "Failed to submit payment");
      },
    });
  }
}
