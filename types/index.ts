import { Database } from "./database";

export type Status = "Success" | "Error";
export type FormReturn = { status: Status; message: string };

export type EventType = Database["public"]["Enums"]["event_type"];

export * from "./database";
