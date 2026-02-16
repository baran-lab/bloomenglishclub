
-- Fix overly permissive RLS on legacy habit tables
DROP POLICY IF EXISTS "Allow all access to habit_entries" ON public.habit_entries;
DROP POLICY IF EXISTS "Allow all access to habits" ON public.habits;

CREATE POLICY "Users can view own habit_entries" ON public.habit_entries
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habit_entries" ON public.habit_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habit_entries" ON public.habit_entries
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habit_entries" ON public.habit_entries
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own habits" ON public.habits
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habits" ON public.habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits" ON public.habits
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habits" ON public.habits
  FOR DELETE USING (auth.uid() = user_id);
