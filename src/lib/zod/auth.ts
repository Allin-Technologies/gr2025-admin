import { boolean, number, object, string } from "zod";

export const sendLoginSchema = object({
  email: string().email(),
});

export const verifyLoginSchema = object({
  email: string().email(),
  otp: string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const verifyLoginResponseSchema = object({
  user: object({
    _id: string(),
    email: string().email(),
    first_name: string(),
    last_name: string(),
    gender: string(),
    role: string(),
    isActive: boolean(),
    createdAt: string(),
    updatedAt: string(),
    __v: number(),
  }),
  access_token: string(),
  refresh_token: string(),
  access_token_expires_at: string(),
  refresh_token_expires_at: string(),
});

export const registerSchema = object({});

export const registerResponseSchema = object({
  email: string().email(),
  first_name: string(),
  last_name: string(),
  role: string(),
  _id: string(),
  createdAt: string(),
  updatedAt: string(),
  __v: number(),
});
