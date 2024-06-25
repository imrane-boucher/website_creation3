import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_DATABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_DATABSE_SECRET;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
