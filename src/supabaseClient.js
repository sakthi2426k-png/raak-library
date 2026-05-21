import { createClient } from '@supabase/supabase-js';

// Unga dynamic database cluster API complete structural setup
const supabaseUrl = 'https://tpqlngnuxrlsmvmcwgaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcWxuZ251eHJsc212bWN3Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1Njc1OTIsImV4cCI6MjA2MTE0MzU5Mn0.q68E-5jOzdxBhYmFzZTI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);