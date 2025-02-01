import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qjzydzfsvhkqxgmwbipt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqenlkemZzdmhrcXhnbXdiaXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNjg0MTIsImV4cCI6MjA1Mzc0NDQxMn0.lCoHSk3OATPohDs2V12z5R4WNe_0xfc8nNubSVJmDKc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
