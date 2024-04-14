import { createClient } from "@supabase/supabase-js";

const supbaseUrl = "https://ljxcqrmuqgamtgnbxqtx.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supbaseUrl, supabaseKey);

export { supabase };