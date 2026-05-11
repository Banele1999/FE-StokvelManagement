import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  imports: [],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  // private api = inject(ApiService);

  // amount = 0;
  // method = "eft";
  // reference = "";
  // paidAt = new Date().toISOString().slice(0, 10);
  // note = "";
  // proofFile: File | null = null;

  // loading = signal(false);
  // listLoading = signal(true);
  // error = signal<string | null>(null);
  // success = signal<string | null>(null);
  // payments = signal<Payment[]>([]);

  // ngOnInit(): void {
  //   this.refresh();
  // }

  // refresh(): void {
  //   this.listLoading.set(true);
  //   this.api.listPayments().subscribe({
  //     next: (res) => {
  //       this.payments.set(res.payments);
  //       this.listLoading.set(false);
  //     },
  //     error: () => this.listLoading.set(false),
  //   });
  // }

  // onFile(ev: Event): void {
  //   const input = ev.target as HTMLInputElement;
  //   this.proofFile = input.files && input.files.length > 0 ? input.files[0]! : null;
  // }

  // submit(): void {
  //   if (!this.amount || this.amount <= 0) return;
  //   const form = new FormData();
  //   form.append("amount", String(this.amount));
  //   form.append("method", this.method);
  //   form.append("reference", this.reference);
  //   form.append("paidAt", this.paidAt);
  //   form.append("note", this.note);
  //   if (this.proofFile) form.append("proof", this.proofFile);

  //   this.loading.set(true);
  //   this.error.set(null);
  //   this.success.set(null);
  //   this.api.createPayment(form).subscribe({
  //     next: () => {
  //       this.loading.set(false);
  //       this.success.set("Payment submitted. It will be verified by the treasurer shortly.");
  //       this.amount = 0;
  //       this.reference = "";
  //       this.note = "";
  //       this.proofFile = null;
  //       (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.value &&
  //         ((document.querySelector('input[type="file"]') as HTMLInputElement).value = "");
  //       this.refresh();
  //     },
  //     error: (err) => {
  //       this.loading.set(false);
  //       this.error.set(err?.error?.error || "Failed to submit payment");
  //     },
  //   });
  // }
}
