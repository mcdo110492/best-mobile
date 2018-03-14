export interface UserConfig {
  userId: number;
  email: string;
  fullName: string;
  token: string;
  contactNumber: string;
  profilePicture: string;
  role: number;
  refreshToken?: string;
}
