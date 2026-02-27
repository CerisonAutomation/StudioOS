/**
 * StudioOS Database Types
 *
 * Generated types for Supabase database schema with strict typing
 * for all tables, views, functions, and enums.
 *
 * @version 1.0.0
 */

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
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          status: 'draft' | 'active' | 'completed' | 'archived'
          client_id: string
          budget: number | null
          deadline: string | null
          tags: string[] | null
          metadata: Json | null
          version: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          status?: 'draft' | 'active' | 'completed' | 'archived'
          client_id: string
          budget?: number | null
          deadline?: string | null
          tags?: string[] | null
          metadata?: Json | null
          version?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          status?: 'draft' | 'active' | 'completed' | 'archived'
          client_id?: string
          budget?: number | null
          deadline?: string | null
          tags?: string[] | null
          metadata?: Json | null
          version?: number
        }
      }
      clients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          phone: string | null
          address: Json | null
          preferences: Json | null
          status: 'active' | 'inactive' | 'prospect'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          status?: 'active' | 'inactive' | 'prospect'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          status?: 'active' | 'inactive' | 'prospect'
        }
      }
      quotes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          client_id: string
          total_amount: number
          status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          valid_until: string
          items: Json[]
          discount_percentage: number | null
          tax_percentage: number | null
          notes: string | null
          version: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          client_id: string
          total_amount: number
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          valid_until: string
          items: Json[]
          discount_percentage?: number | null
          tax_percentage?: number | null
          notes?: string | null
          version?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          client_id?: string
          total_amount?: number
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          valid_until?: string
          items?: Json[]
          discount_percentage?: number | null
          tax_percentage?: number | null
          notes?: string | null
          version?: number
        }
      }
      suppliers: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          phone: string | null
          address: Json | null
          categories: string[]
          rating: number | null
          status: 'active' | 'inactive' | 'pending'
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          categories: string[]
          rating?: number | null
          status?: 'active' | 'inactive' | 'pending'
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          categories?: string[]
          rating?: number | null
          status?: 'active' | 'inactive' | 'pending'
          metadata?: Json | null
        }
      }
      invoices: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          client_id: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_date: string | null
          payment_method: string | null
          transaction_id: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          client_id: string
          amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_date?: string | null
          payment_method?: string | null
          transaction_id?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          client_id?: string
          amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          paid_date?: string | null
          payment_method?: string | null
          transaction_id?: string | null
          notes?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          created_at: string
          event: string
          user_id: string
          resource_type: string
          resource_id: string
          action: string
          metadata: Json
          ip_address: string
          user_agent: string
          severity: 'low' | 'medium' | 'high' | 'critical'
        }
        Insert: {
          id?: string
          created_at?: string
          event: string
          user_id: string
          resource_type: string
          resource_id: string
          action: string
          metadata: Json
          ip_address: string
          user_agent: string
          severity?: 'low' | 'medium' | 'high' | 'critical'
        }
        Update: {
          id?: string
          created_at?: string
          event?: string
          user_id?: string
          resource_type?: string
          resource_id?: string
          action?: string
          metadata?: Json
          ip_address?: string
          user_agent?: string
          severity?: 'low' | 'medium' | 'high' | 'critical'
        }
      }
      migrations: {
        Row: {
          id: string
          name: string
          executed_at: string
          status: 'success' | 'failed'
          error_message: string | null
        }
        Insert: {
          id?: string
          name: string
          executed_at?: string
          status: 'success' | 'failed'
          error_message?: string | null
        }
        Update: {
          id?: string
          name?: string
          executed_at?: string
          status?: 'success' | 'failed'
          error_message?: string | null
        }
      }
      backups: {
        Row: {
          id: string
          name: string
          created_at: string
          size: number
          status: 'pending' | 'completed' | 'failed'
          download_url: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          size?: number
          status?: 'pending' | 'completed' | 'failed'
          download_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          size?: number
          status?: 'pending' | 'completed' | 'failed'
          download_url?: string | null
        }
      }
    }
    Views: {
      project_summary: {
        Row: {
          id: string
          name: string
          client_name: string
          status: string
          budget: number | null
          deadline: string | null
          total_quotes: number
          total_invoices: number
          unpaid_amount: number
        }
      }
      client_portfolio: {
        Row: {
          client_id: string
          client_name: string
          total_projects: number
          active_projects: number
          total_spent: number
          last_project_date: string | null
        }
      }
    }
    Functions: {
      enable_rls: {
        Args: { table_name: string }
        Returns: void
      }
      create_policy: {
        Args: {
          table_name: string
          policy_name: string
          policy_type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE'
          definition: string
        }
        Returns: void
      }
      run_migration: {
        Args: { migration_name: string; migration_sql: string }
        Returns: void
      }
      get_connection_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          active: number
          idle: number
          total: number
          waiting: number
        }
      }
      create_backup: {
        Args: { backup_name: string }
        Returns: string
      }
    }
    Enums: {
      project_status: 'draft' | 'active' | 'completed' | 'archived'
      client_status: 'active' | 'inactive' | 'prospect'
      quote_status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
      invoice_status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
      supplier_status: 'active' | 'inactive' | 'pending'
      audit_severity: 'low' | 'medium' | 'high' | 'critical'
    }
  }
}
