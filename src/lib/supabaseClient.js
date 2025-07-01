import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcblgssjwixaqknkvoyg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYmxnc3Nqd2l4YXFrbmt2b3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjgzMzMsImV4cCI6MjA2NTU0NDMzM30.0RuNKtrJUVBEEqFOW9MdQqcxjSgIiyf8bLsCOaHJQEA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);