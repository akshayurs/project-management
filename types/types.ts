import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Announcements =
	Database["public"]["Tables"]["announcements"]["Row"];
export type Chats = Database["public"]["Tables"]["chats"]["Row"];
export type Projects = Database["public"]["Tables"]["projects"]["Row"];
export type Comments = Database["public"]["Tables"]["comments"]["Row"];
export type Events = Database["public"]["Tables"]["events"]["Row"];
export type Phases = Database["public"]["Tables"]["phase"]["Row"];
export type Marks = Database["public"]["Tables"]["marks"]["Row"];
