-- Create habits table for storing habit definitions
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  habit_type TEXT NOT NULL DEFAULT 'checkbox' CHECK (habit_type IN ('checkbox', 'dropdown', 'range')),
  dropdown_options TEXT[], -- For dropdown type habits
  range_min INTEGER DEFAULT 0, -- For range type habits
  range_max INTEGER DEFAULT 10, -- For range type habits
  range_unit TEXT, -- For range type (e.g., "minutes", "pages")
  color TEXT DEFAULT '#10b981', -- Color for the habit in heat map
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create habit_entries table for tracking daily completions
CREATE TABLE public.habit_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_completed BOOLEAN DEFAULT false, -- For checkbox type
  dropdown_value TEXT, -- For dropdown type
  range_value INTEGER, -- For range type
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(habit_id, entry_date)
);

-- Create index for faster queries
CREATE INDEX idx_habit_entries_date ON public.habit_entries(entry_date);
CREATE INDEX idx_habit_entries_habit_id ON public.habit_entries(habit_id);
CREATE INDEX idx_habits_user_id ON public.habits(user_id);

-- Enable RLS (policies are permissive for now since no auth)
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_entries ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for anonymous access (no auth)
CREATE POLICY "Allow all access to habits" ON public.habits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to habit_entries" ON public.habit_entries FOR ALL USING (true) WITH CHECK (true);

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_habit_entries_updated_at
  BEFORE UPDATE ON public.habit_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();