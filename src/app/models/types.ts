export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  idNumber?: string;
  monthlyContribution?: number;
  joinDate?: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  member: Member;
}

export interface MemberStats {
  totalVerified: number;
  totalPending: number;
  paymentsCount: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  reference?: string;
  status: "pending" | "verified" | "rejected";
  paidAt: string;
  note?: string;
  hasProof: boolean;
  proofFilename?: string;
  createdAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "danger";
  read: boolean;
  createdAt: string;
}
