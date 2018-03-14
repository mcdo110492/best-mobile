export interface InquiryClientPending {
  count: number;
  data: InquiryPending[];
}

export interface InquiryClientOnProcess {
  count: number;
  data: InquiryOnProcess[];
}

export interface InquiryPending {
  inquiryId: number;
  userId: number;
  status: number;
  dateInquire: Date;
  details?: InquiryDetails;
  dateConfirmed?: Date;
  adminId?: number;
  remarks?: string;
}

export interface InquiryOnProcess {
  inquiryId: number;
  userId: number;
  status: number;
  dateInquire: Date;
  details?: InquiryDetails;
  admin?: Admin;
  dateConfirmed?: Date;
  adminId?: number;
  remarks?: string;
}

export interface InquireResponse {
  status: number;
  message: string;
}

export interface InquiryDetails {
  inquiryDetailsId: number;
  inquiryId: number;
  clientNumber: number;
  email: string;
  fullName: string;
  contactNumber: string;
  street: string;
  city: string;
  province: string;
  validIdPath: string;
}

export interface Admin {
  userId: number;
  fullName: string;
}
