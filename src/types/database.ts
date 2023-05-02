import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Accounts {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface Collateral {
  collateral_id: Generated<number>;
  url: string;
  summary: string;
}

export interface Company {
  id: Generated<number>;
  company_name: string;
  user_id: string;
}

export interface Customer {
  customer_id: Generated<number>;
  user_id: string;
  company_id: number;
  biodata: string;
  title: string;
}

export interface Deal {
  deal_id: Generated<number>;
  deal_size: number;
  deal_description: string;
  customer_id: number;
}

export interface Email {
  email_id: Generated<number>;
  email_content: string;
  customer_id: number;
  email_subject: string;
  user_id: string;
}

export interface File {
  id: Generated<number>;
  key: string;
  url: string;
  createdAt: Generated<Date>;
  isProcessing: Generated<number>;
  startedprocessing: Generated<Date>;
  isTranscribed: Generated<number>;
  transcript: string | null;
  meeting_id: number | null;
  userId: string | null;
}

export interface Meeting {
  meeting_id: Generated<number>;
  summary: string;
  meeting_date: Date;
  meeting_notes: string;
  userId: string;
}

export interface Note {
  note_id: Generated<number>;
  note_text: string;
  userId: string;
}

export interface Sessions {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface Users {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_current_period_end: Date | null;
}

export interface VerificationTokens {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Waitlist {
  email: string;
  goal: Generated<string>;
  name: string;
  createAt: Generated<Date>;
}

export interface DB {
  accounts: Accounts;
  Collateral: Collateral;
  Company: Company;
  Customer: Customer;
  Deal: Deal;
  Email: Email;
  File: File;
  Meeting: Meeting;
  Note: Note;
  sessions: Sessions;
  users: Users;
  verification_tokens: VerificationTokens;
  Waitlist: Waitlist;
}
