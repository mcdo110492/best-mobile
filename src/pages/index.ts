import { LoginPage, LoginService } from "./login";
import { TabsPage } from "./tabs";
import { InquirySalesPage } from "./inquiry-sales";
import { QuotationSalesPage } from "./quotation-sales";
import { CreateQuotationSalesPage } from "./create-quotation-sales";
import { SettingsPage } from "./settings";
import { ForgotPasswordPage } from "./forgot-password";
import { RegisterPage, RegisterService } from "./register";
import { HistorySalesPage } from "./history-sales";
import {
  ResendValidationPage,
  ResendValidationService
} from "./resend-validation";

import { ProcessInquirySalesPage } from "./process-inquiry-sales";

//Clients Page
import { InquiryClientPage, InquiryClientService } from "./inquiry-client";
import {
  QuotationClientPage,
  QuotationClientService
} from "./quotation-client";
import { QuotationClientViewPage } from "./quotation-client-view";
import { QuotationClientUploadPage } from "./quotation-client-upload";

export const pages: any[] = [
  LoginPage,
  TabsPage,
  InquirySalesPage,
  QuotationSalesPage,
  CreateQuotationSalesPage,
  SettingsPage,
  ForgotPasswordPage,
  RegisterPage,
  ProcessInquirySalesPage,
  HistorySalesPage,
  ResendValidationPage,
  //Clients Page
  InquiryClientPage,
  QuotationClientPage,
  QuotationClientViewPage,
  QuotationClientUploadPage
];

export const services: any[] = [
  LoginService,
  RegisterService,
  InquiryClientService,
  ResendValidationService,
  QuotationClientService
];

export * from "./login";
export * from "./tabs";
export * from "./inquiry-sales";
export * from "./quotation-sales";
export * from "./create-quotation-sales";
export * from "./settings";
export * from "./forgot-password";
export * from "./register";
export * from "./history-sales";
export * from "./resend-validation";

export * from "./process-inquiry-sales";

export * from "./inquiry-client";
export * from "./quotation-client";
export * from "./quotation-client-view";
export * from "./quotation-client-upload";
