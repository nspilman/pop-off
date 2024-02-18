export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      artists: {
        Row: {
          artist_id: number
          bio: string | null
          name: string | null
          other_artist_details: string | null
        }
        Insert: {
          artist_id?: number
          bio?: string | null
          name?: string | null
          other_artist_details?: string | null
        }
        Update: {
          artist_id?: number
          bio?: string | null
          name?: string | null
          other_artist_details?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          event_date: string
          event_type: Database["public"]["Enums"]["event_type"]
          hashed_user_id: string
          id: number
          payload: Json | null
        }
        Insert: {
          event_date: string
          event_type: Database["public"]["Enums"]["event_type"]
          hashed_user_id: string
          id?: number
          payload?: Json | null
        }
        Update: {
          event_date?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          hashed_user_id?: string
          id?: number
          payload?: Json | null
        }
        Relationships: []
      }
      market_research_fields: {
        Row: {
          created_at: string
          id: number
          input_type: Database["public"]["Enums"]["input_type"]
          label: string
          order: number
          placeholder: string
        }
        Insert: {
          created_at?: string
          id?: number
          input_type?: Database["public"]["Enums"]["input_type"]
          label: string
          order?: number
          placeholder: string
        }
        Update: {
          created_at?: string
          id?: number
          input_type?: Database["public"]["Enums"]["input_type"]
          label?: string
          order?: number
          placeholder?: string
        }
        Relationships: []
      }
      market_research_responses: {
        Row: {
          created_at: string
          field_id: number
          id: number
          response_value: string
          song_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          field_id: number
          id?: number
          response_value: string
          song_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          field_id?: number
          id?: number
          response_value?: string
          song_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_research_responses_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "market_research_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_research_responses_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["song_id"]
          },
          {
            foreignKeyName: "public_market_research_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      songs: {
        Row: {
          artist_id: number | null
          other_song_details: string | null
          release_date: string | null
          song_id: number
          title: string | null
          url: string
        }
        Insert: {
          artist_id?: number | null
          other_song_details?: string | null
          release_date?: string | null
          song_id?: number
          title?: string | null
          url: string
        }
        Update: {
          artist_id?: number | null
          other_song_details?: string | null
          release_date?: string | null
          song_id?: number
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "songs_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["artist_id"]
          }
        ]
      }
      unsubscriptions: {
        Row: {
          created_at: string
          email: string
          id: number
          unsubscription_reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          unsubscription_reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          unsubscription_reason?: string
        }
        Relationships: []
      }
      user_volunteer_activities: {
        Row: {
          activity_id: number
          created_at: string | null
          date_agreed: string | null
          song_id: number | null
          status: string | null
          user_id: string | null
          volunteer_type_id: number | null
        }
        Insert: {
          activity_id?: number
          created_at?: string | null
          date_agreed?: string | null
          song_id?: number | null
          status?: string | null
          user_id?: string | null
          volunteer_type_id?: number | null
        }
        Update: {
          activity_id?: number
          created_at?: string | null
          date_agreed?: string | null
          song_id?: number | null
          status?: string | null
          user_id?: string | null
          volunteer_type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_volunteer_activities_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["song_id"]
          },
          {
            foreignKeyName: "user_volunteer_activities_volunteer_type_id_fkey"
            columns: ["volunteer_type_id"]
            isOneToOne: false
            referencedRelation: "volunteer_options"
            referencedColumns: ["volunteer_option_id"]
          }
        ]
      }
      users: {
        Row: {
          email: string
          name: string | null
          other_user_details: string | null
          phone_number: string | null
          referring_user_id: string | null
          user_id: string
        }
        Insert: {
          email: string
          name?: string | null
          other_user_details?: string | null
          phone_number?: string | null
          referring_user_id?: string | null
          user_id: string
        }
        Update: {
          email?: string
          name?: string | null
          other_user_details?: string | null
          phone_number?: string | null
          referring_user_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_referring_user_fkey"
            columns: ["referring_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      volunteer_options: {
        Row: {
          category:
            | Database["public"]["Enums"]["volunteer_action_category"]
            | null
          default_selected: boolean
          description: string | null
          volunteer_option_id: number
        }
        Insert: {
          category?:
            | Database["public"]["Enums"]["volunteer_action_category"]
            | null
          default_selected?: boolean
          description?: string | null
          volunteer_option_id?: number
        }
        Update: {
          category?:
            | Database["public"]["Enums"]["volunteer_action_category"]
            | null
          default_selected?: boolean
          description?: string | null
          volunteer_option_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      event_type:
        | "falling_page_land"
        | "song_start"
        | "song_pause"
        | "song_end"
        | "pledge_survey_open"
        | "pledge_survey_completion"
        | "market_research_survey_completion"
        | "unsubscribe_initial"
        | "unsubscribe_final"
        | "song_update_time"
        | "pledge_survey_close"
        | "market_research_survey_open"
        | "market_research_survey_close"
        | "share_link_copy"
      input_type: "text_area" | "text" | "checkbox"
      volunteer_action_category:
        | "Stream"
        | "Share"
        | "Create"
        | "Marketing"
        | "Thank You Preferences"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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
