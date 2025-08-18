export interface User {
  email: string;
  password: string;
  telephone: string; // E.164 format recommended (e.g. +213...)
  role: string; // e.g. "admin", "canread", "canwrite"
}