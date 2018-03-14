import {
  InquiryDetails,
  Admin
} from "../../inquiry-client/models/inquiry-client.model";

export interface QuotationClientResponseModel {
  status: number;
  data: QuotationClientModel[];
  count: number;
}

export interface QuotationResponse {
  status: number;
  message: string;
}

export interface QuotationClientModel {
  inquiryId: number;
  userId: number;
  status: number;
  dateInquire: Date;
  details?: InquiryDetails;
  dateConfirmed?: Date;
  adminId?: number;
  admin?: Admin;
  quotation: QuotationsModel;
  remarks?: string;
}

export interface QuotationsModel {
  quotationId: number;
  inquiryId: number;
  quotationFile: string;
  dateQuotation: Date;
  status: number;
  dateStatus: Date;
  remarks?: string;
}
