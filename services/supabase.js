import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yhejdjdbrsyxoxuylvun.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GyGf7BFmc01YMOYYuXDWdQ_nZ2TaoEg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
