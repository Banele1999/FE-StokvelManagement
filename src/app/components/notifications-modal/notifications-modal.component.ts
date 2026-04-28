// import { Component, inject } from "@angular/core";
// import { DatePipe, NgClass } from "@angular/common";
// import { NotificationsService } from "../../services/notifications.service";

// @Component({
//   selector: "app-notifications-modal",
//   standalone: true,
//   imports: [DatePipe, NgClass],
//   template: `
//     @if (svc.showModal()) {
//       <div class="modal-backdrop fade show" (click)="svc.close()"></div>
//       <div class="modal fade show d-block" tabindex="-1" role="dialog" style="z-index:1060">
//         <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title">
//                 <i class="bi bi-bell-fill text-brand me-2"></i>Notifications
//                 @if (svc.unread() > 0) {
//                   <span class="badge bg-danger ms-2">{{ svc.unread() }} new</span>
//                 }
//               </h5>
//               <button type="button" class="btn-close" (click)="svc.close()"></button>
//             </div>
//             <div class="modal-body">
//               @if (svc.notifications().length === 0) {
//                 <p class="text-center text-muted my-4">You have no notifications yet.</p>
//               }
//               @for (n of svc.notifications(); track n.id) {
//                 <div class="p-3 mb-2 rounded border"
//                      [class.bg-light]="n.read" [class.border-start]="!n.read"
//                      [class.border-3]="!n.read" [class.border-success]="!n.read">
//                   <div class="d-flex justify-content-between align-items-start">
//                     <div>
//                       <div class="fw-semibold">
//                         <i class="bi" [ngClass]="iconFor(n.type)"></i>
//                         {{ n.title }}
//                       </div>
//                       <div class="text-muted small">{{ n.createdAt | date: "medium" }}</div>
//                     </div>
//                     @if (!n.read) {
//                       <button class="btn btn-sm btn-link p-0" (click)="svc.markRead(n.id)">
//                         Mark read
//                       </button>
//                     }
//                   </div>
//                   <div class="mt-2">{{ n.message }}</div>
//                 </div>
//               }
//             </div>
//             <div class="modal-footer">
//               @if (svc.unread() > 0) {
//                 <button class="btn btn-outline-primary" (click)="svc.markAllRead()">
//                   Mark all as read
//                 </button>
//               }
//               <button class="btn btn-primary" (click)="svc.close()">Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     }
//   `,
//   styles: [
//     `
//       .modal-backdrop {
//         z-index: 1055;
//       }
//       .bi-info-circle-fill {
//         color: #0dcaf0;
//       }
//       .bi-check-circle-fill {
//         color: #198754;
//       }
//       .bi-exclamation-triangle-fill {
//         color: #ffc107;
//       }
//       .bi-x-octagon-fill {
//         color: #dc3545;
//       }
//     `,
//   ],
//   host: { class: "d-contents" },
// })
// export class NotificationsModalComponent {
//   svc = inject(NotificationsService);

//   iconFor(type: string): string {
//     switch (type) {
//       case "success":
//         return "bi-check-circle-fill";
//       case "warning":
//         return "bi-exclamation-triangle-fill";
//       case "danger":
//         return "bi-x-octagon-fill";
//       default:
//         return "bi-info-circle-fill";
//     }
//   }
// }
