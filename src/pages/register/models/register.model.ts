export interface Register {
  email: string;
  password: string;
  confirmPassowrd: string;
  fullName: string;
  contactNumber: string;
}

export interface RegisterResponse {
  status: number;
  message: string;
}
