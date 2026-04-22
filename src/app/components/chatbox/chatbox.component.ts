import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

@Component({
  selector: "app-chatbox",
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <button
      class="chatbox-fab"
      (click)="toggle()"
      [title]="open() ? 'Close chat' : 'Open chat'"
      aria-label="Chat assistant"
    >
      <i class="bi" [ngClass]="open() ? 'bi-x-lg' : 'bi-chat-dots-fill'" style="font-size:22px"></i>
    </button>

    @if (open()) {
      <div class="chatbox-panel">
        <div class="chatbox-header">
          <div>
            <div class="fw-semibold"><i class="bi bi-robot me-2"></i>Stokvel Assistant</div>
            <div class="small opacity-75">Ask about your account or the app</div>
          </div>
          <button class="btn btn-sm text-white" (click)="toggle()" aria-label="Close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="chatbox-body" #body>
          @for (m of messages(); track $index) {
            <div class="d-flex" [class.justify-content-end]="m.role === 'user'">
              <div class="chat-msg" [class.user]="m.role === 'user'" [class.bot]="m.role === 'bot'">
                {{ m.text }}
              </div>
            </div>
          }
          @if (loading()) {
            <div class="d-flex">
              <div class="chat-msg bot"><span class="spinner-border spinner-border-sm"></span> Thinking…</div>
            </div>
          }
        </div>
        <form class="chatbox-footer d-flex gap-2" (ngSubmit)="send()">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Type a message…"
            [(ngModel)]="draft"
            name="draft"
            [disabled]="loading()"
            autocomplete="off"
          />
          <button class="btn btn-primary btn-sm" [disabled]="!draft.trim() || loading()">
            <i class="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    }
  `,
})
export class ChatboxComponent implements AfterViewChecked {
  private api = inject(ApiService);
  @ViewChild("body") bodyRef?: ElementRef<HTMLDivElement>;

  open = signal(false);
  loading = signal(false);
  draft = "";
  messages = signal<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I'm your Stokvel assistant. Ask me about your contributions, payment history, profile, or how the app works.",
    },
  ]);

  ngAfterViewChecked(): void {
    if (this.bodyRef) {
      const el = this.bodyRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.update((m) => [...m, { role: "user", text }]);
    this.draft = "";
    this.loading.set(true);
    this.api.chat(text).subscribe({
      next: (res) => {
        this.messages.update((m) => [...m, { role: "bot", text: res.reply }]);
        this.loading.set(false);
      },
      error: () => {
        this.messages.update((m) => [
          ...m,
          { role: "bot", text: "Sorry, something went wrong. Please try again." },
        ]);
        this.loading.set(false);
      },
    });
  }
}
