import { createClient } from '@supabase/supabase-js'

// Cole a URL exata do seu projeto Supabase (encontrada em Project Settings > API)
const supabaseUrl = 'https://lnfsgoznyaaaxnjwonda.supabase.co'

// Cole a sua chave anon publica (encontrada em Project Settings > API > anon / public)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZnNnb3pueWFhYXhuandvbmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MTM1NzIsImV4cCI6MjEwMjA4OTU3Mn0.F4duMNFIYI3EfeDrOYqKgzcIBcz5-xAjmJKtzxxXHp4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)