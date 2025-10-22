// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdwucrctanbuhiipflad.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd3VjcmN0YW5idWhpaXBmbGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDg2MjAsImV4cCI6MjA3NjYyNDYyMH0.SiKv79dimIzWlIHUZkYiU15cjGanmbYysVSm0g4xHWs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
