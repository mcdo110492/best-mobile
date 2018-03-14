import { LoginEffect } from "./../pages/login/store/login.effect";
import { RegisterEffect } from "./../pages/register/store/register.effect";
import { ResendValidationEffect } from "./../pages/resend-validation/store/resend-validation.effect";
import { InquiryClientEffect } from "./../pages/inquiry-client/store/inquiry-client.effect";
import { QuotationClientEffect } from "./../pages/quotation-client/store/quotation-client.effect";

export const effects: any[] = [
  LoginEffect,
  RegisterEffect,
  ResendValidationEffect,
  InquiryClientEffect,
  QuotationClientEffect
];

export { LoginEffect } from "./../pages/login/store/login.effect";
export { RegisterEffect } from "./../pages/register/store/register.effect";
export {
  ResendValidationEffect
} from "./../pages/resend-validation/store/resend-validation.effect";
export {
  InquiryClientEffect
} from "./../pages/inquiry-client/store/inquiry-client.effect";
export {
  QuotationClientEffect
} from "./../pages/quotation-client/store/quotation-client.effect";
