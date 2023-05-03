import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Account {
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
  userId: string;
  deleted: Generated<number>;
}

export interface FileToMeeting {
  id: Generated<number>;
  meetingId: string;
  fileId: number;
}

export interface Meeting {
  userId: string;
  date: Date;
  description: string;
  id: string;
  note: string;
  title: string;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface DB {
  Account: Account;
  File: File;
  FileToMeeting: FileToMeeting;
  Meeting: Meeting;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
}
