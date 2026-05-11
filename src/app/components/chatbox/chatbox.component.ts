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
  selector: 'app-chatbox',
  imports: [FormsModule, NgClass],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
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

