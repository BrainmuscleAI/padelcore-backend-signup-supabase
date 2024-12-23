export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          rating: number;
          matches_played: number;
          wins: number;
          losses: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          rating?: number;
          matches_played?: number;
          wins?: number;
          losses?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          rating?: number;
          matches_played?: number;
          wins?: number;
          losses?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}