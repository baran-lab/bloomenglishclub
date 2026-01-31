import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Habit } from "@/hooks/useHabits";

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (habit: Omit<Habit, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => void;
}

const COLORS = [
  '#10b981', // Green
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
];

export function CreateHabitModal({ isOpen, onClose, onCreate }: CreateHabitModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [habitType, setHabitType] = useState<'checkbox' | 'dropdown' | 'range'>('checkbox');
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(['']);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(10);
  const [rangeUnit, setRangeUnit] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const habit: Omit<Habit, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
      name: name.trim(),
      description: description.trim() || null,
      habit_type: habitType,
      dropdown_options: habitType === 'dropdown' ? dropdownOptions.filter(o => o.trim()) : null,
      range_min: habitType === 'range' ? rangeMin : null,
      range_max: habitType === 'range' ? rangeMax : null,
      range_unit: habitType === 'range' ? rangeUnit || null : null,
      color,
    };

    onCreate(habit);
    
    // Reset form
    setName('');
    setDescription('');
    setHabitType('checkbox');
    setDropdownOptions(['']);
    setRangeMin(0);
    setRangeMax(10);
    setRangeUnit('');
    setColor(COLORS[0]);
    onClose();
  };

  const addDropdownOption = () => {
    setDropdownOptions([...dropdownOptions, '']);
  };

  const removeDropdownOption = (index: number) => {
    setDropdownOptions(dropdownOptions.filter((_, i) => i !== index));
  };

  const updateDropdownOption = (index: number, value: string) => {
    const updated = [...dropdownOptions];
    updated[index] = value;
    setDropdownOptions(updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full bg-card rounded-2xl shadow-card z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <h2 className="font-fredoka text-xl font-semibold">Create New Habit</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto flex-1">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Habit Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Practice English, Read 20 pages"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this habit about?"
                  rows={2}
                />
              </div>

              {/* Habit Type */}
              <div className="space-y-3">
                <Label>Tracking Type</Label>
                <RadioGroup
                  value={habitType}
                  onValueChange={(v) => setHabitType(v as typeof habitType)}
                  className="grid grid-cols-3 gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="checkbox" id="checkbox" />
                    <Label htmlFor="checkbox" className="cursor-pointer">
                      ✅ Checkbox
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dropdown" id="dropdown" />
                    <Label htmlFor="dropdown" className="cursor-pointer">
                      📝 Dropdown
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="range" id="range" />
                    <Label htmlFor="range" className="cursor-pointer">
                      📊 Range
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dropdown Options */}
              {habitType === 'dropdown' && (
                <div className="space-y-3">
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {dropdownOptions.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateDropdownOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {dropdownOptions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDropdownOption(index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDropdownOption}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Range Options */}
              {habitType === 'range' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="rangeMin">Min</Label>
                      <Input
                        id="rangeMin"
                        type="number"
                        value={rangeMin}
                        onChange={(e) => setRangeMin(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rangeMax">Max</Label>
                      <Input
                        id="rangeMax"
                        type="number"
                        value={rangeMax}
                        onChange={(e) => setRangeMax(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rangeUnit">Unit</Label>
                      <Input
                        id="rangeUnit"
                        value={rangeUnit}
                        onChange={(e) => setRangeUnit(e.target.value)}
                        placeholder="e.g., mins"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Color */}
              <div className="space-y-3">
                <Label>Color</Label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((c) => (
                    <motion.button
                      key={c}
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        color === c ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Habit
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
