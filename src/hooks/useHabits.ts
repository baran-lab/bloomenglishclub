import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Habit {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  habit_type: 'checkbox' | 'dropdown' | 'range';
  dropdown_options: string[] | null;
  range_min: number | null;
  range_max: number | null;
  range_unit: string | null;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface HabitEntry {
  id: string;
  habit_id: string;
  user_id: string | null;
  entry_date: string;
  is_completed: boolean;
  dropdown_value: string | null;
  range_value: number | null;
  created_at: string;
  updated_at: string;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<HabitEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchHabits = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setHabits(data as Habit[] || []);
    } catch (error) {
      console.error('Error fetching habits:', error);
      toast({
        title: 'Error',
        description: 'Failed to load habits',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const fetchEntries = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      let query = supabase.from('habit_entries').select('*');
      
      if (startDate) {
        query = query.gte('entry_date', startDate);
      }
      if (endDate) {
        query = query.lte('entry_date', endDate);
      }

      const { data, error } = await query.order('entry_date', { ascending: false });

      if (error) throw error;
      setEntries(data as HabitEntry[] || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchHabits(), fetchEntries()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchHabits, fetchEntries]);

  const createHabit = async (habit: Omit<Habit, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('habits')
        .insert([habit])
        .select()
        .single();

      if (error) throw error;
      
      setHabits(prev => [...prev, data as Habit]);
      toast({
        title: '🎯 Habit Created!',
        description: `"${habit.name}" has been added to your tracker`,
      });
      return data as Habit;
    } catch (error) {
      console.error('Error creating habit:', error);
      toast({
        title: 'Error',
        description: 'Failed to create habit',
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteHabit = async (habitId: string) => {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

      if (error) throw error;
      
      setHabits(prev => prev.filter(h => h.id !== habitId));
      setEntries(prev => prev.filter(e => e.habit_id !== habitId));
      toast({
        title: 'Habit Deleted',
        description: 'The habit has been removed',
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete habit',
        variant: 'destructive',
      });
    }
  };

  const toggleHabitEntry = async (habitId: string, date: string) => {
    const existingEntry = entries.find(
      e => e.habit_id === habitId && e.entry_date === date
    );

    try {
      if (existingEntry) {
        // Toggle existing entry
        const { data, error } = await supabase
          .from('habit_entries')
          .update({ is_completed: !existingEntry.is_completed })
          .eq('id', existingEntry.id)
          .select()
          .single();

        if (error) throw error;
        
        setEntries(prev => 
          prev.map(e => e.id === existingEntry.id ? (data as HabitEntry) : e)
        );
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from('habit_entries')
          .insert([{ habit_id: habitId, entry_date: date, is_completed: true }])
          .select()
          .single();

        if (error) throw error;
        
        setEntries(prev => [...prev, data as HabitEntry]);
      }
    } catch (error) {
      console.error('Error toggling habit entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to update habit',
        variant: 'destructive',
      });
    }
  };

  const updateHabitEntry = async (
    habitId: string, 
    date: string, 
    value: { dropdown_value?: string; range_value?: number; is_completed?: boolean }
  ) => {
    const existingEntry = entries.find(
      e => e.habit_id === habitId && e.entry_date === date
    );

    try {
      if (existingEntry) {
        const { data, error } = await supabase
          .from('habit_entries')
          .update(value)
          .eq('id', existingEntry.id)
          .select()
          .single();

        if (error) throw error;
        
        setEntries(prev => 
          prev.map(e => e.id === existingEntry.id ? (data as HabitEntry) : e)
        );
      } else {
        const { data, error } = await supabase
          .from('habit_entries')
          .insert([{ habit_id: habitId, entry_date: date, ...value }])
          .select()
          .single();

        if (error) throw error;
        
        setEntries(prev => [...prev, data as HabitEntry]);
      }
    } catch (error) {
      console.error('Error updating habit entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to update habit entry',
        variant: 'destructive',
      });
    }
  };

  const getEntryForDate = (habitId: string, date: string) => {
    return entries.find(e => e.habit_id === habitId && e.entry_date === date);
  };

  return {
    habits,
    entries,
    isLoading,
    createHabit,
    deleteHabit,
    toggleHabitEntry,
    updateHabitEntry,
    getEntryForDate,
    refreshHabits: fetchHabits,
    refreshEntries: fetchEntries,
  };
}
