import { Component, inject } from "@angular/core";
import { DatePipe, NgClass } from "@angular/common";
import { NotificationsService } from "../../services/notifications.service";

@Component({
  selector: 'app-notifications-modal',
  imports: [DatePipe, NgClass],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
  host: { class: "d-contents" },
})
export class NotificationsModalComponent {
  svc = inject(NotificationsService);

  iconFor(type: string): string {
    switch (type) {
      case "success":
        return "bi-check-circle-fill";
      case "warning":
        return "bi-exclamation-triangle-fill";
      case "danger":
        return "bi-x-octagon-fill";
      default:
        return "bi-info-circle-fill";
    }
  }
}
