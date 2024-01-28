export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          event_id: number
          id: number
          message: string
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          message: string
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      chats: {
        Row: {
          attachment: string | null
          attachment_name: string | null
          created_at: string
          id: number
          message: string | null
          project_id: number
          sender_id: number
        }
        Insert: {
          attachment?: string | null
          attachment_name?: string | null
          created_at?: string
          id?: number
          message?: string | null
          project_id: number
          sender_id: number
        }
        Update: {
          attachment?: string | null
          attachment_name?: string | null
          created_at?: string
          id?: number
          message?: string | null
          project_id?: number
          sender_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "chats_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          chat_id: number
          created_at: string
          id: number
          message: string
          sender_id: number | null
        }
        Insert: {
          chat_id: number
          created_at?: string
          id?: number
          message: string
          sender_id?: number | null
        }
        Update: {
          chat_id?: number
          created_at?: string
          id?: number
          message?: string
          sender_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      marks: {
        Row: {
          created_at: string
          id: number
          marks: number | null
          phase_id: number
          profile_id: number | null
          project_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          marks?: number | null
          phase_id: number
          profile_id?: number | null
          project_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          marks?: number | null
          phase_id?: number
          profile_id?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marks_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phase"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      phase: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
          max_marks: number | null
          min_marks: number
          name: string
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
          max_marks?: number | null
          min_marks?: number
          name: string
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
          max_marks?: number | null
          min_marks?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "phase_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          branch: string | null
          created_at: string
          email: string
          id: number
          name: string
          type: string | null
          user_id: string
          usn: string | null
        }
        Insert: {
          branch?: string | null
          created_at?: string
          email: string
          id?: number
          name: string
          type?: string | null
          user_id: string
          usn?: string | null
        }
        Update: {
          branch?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string
          type?: string | null
          user_id?: string
          usn?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          created_by_id: number
          event_id: number
          id: number
          members: string[] | null
          mentor_id: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          created_by_id: number
          event_id: number
          id?: number
          members?: string[] | null
          mentor_id?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: number
          event_id?: number
          id?: number
          members?: string[] | null
          mentor_id?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
