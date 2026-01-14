import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, ArrowRight, User, Phone, Mail, Calendar, Briefcase, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/LanguageContext';

type FormType = 'doctor-intake' | 'job-application' | 'insurance';

interface InteractiveFormProps {
  formType: FormType;
  onComplete: () => void;
  userName?: string;
}

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'date' | 'tel' | 'email' | 'select';
  icon: React.ReactNode;
  options?: string[];
  required?: boolean;
}

const formConfigs: Record<FormType, { title: string; subtitle: string; fields: FormField[]; successMessage: string }> = {
  'doctor-intake': {
    title: 'Doctor Intake Form',
    subtitle: 'Practice filling out a medical form',
    successMessage: 'Great! This looks like a real U.S. form',
    fields: [
      { id: 'firstName', label: 'First Name', placeholder: 'Enter your first name', type: 'text', icon: <User className="w-4 h-4" />, required: true },
      { id: 'lastName', label: 'Last Name', placeholder: 'Enter your last name', type: 'text', icon: <User className="w-4 h-4" />, required: true },
      { id: 'dateOfBirth', label: 'Date of Birth', placeholder: 'MM/DD/YYYY', type: 'text', icon: <Calendar className="w-4 h-4" />, required: true },
      { id: 'phone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'tel', icon: <Phone className="w-4 h-4" />, required: true },
      { id: 'address', label: 'Address', placeholder: '123 Main Street, Apt 1', type: 'text', icon: <MapPin className="w-4 h-4" />, required: true },
      { id: 'city', label: 'City', placeholder: 'New York', type: 'text', icon: <MapPin className="w-4 h-4" />, required: true },
      { id: 'state', label: 'State', placeholder: 'NY', type: 'text', icon: <MapPin className="w-4 h-4" />, required: true },
      { id: 'zipCode', label: 'ZIP Code', placeholder: '10001', type: 'text', icon: <MapPin className="w-4 h-4" />, required: true },
      { id: 'emergencyContact', label: 'Emergency Contact Name', placeholder: 'Contact name', type: 'text', icon: <Heart className="w-4 h-4" /> },
      { id: 'emergencyPhone', label: 'Emergency Contact Phone', placeholder: '(555) 987-6543', type: 'tel', icon: <Phone className="w-4 h-4" /> },
    ],
  },
  'job-application': {
    title: 'Job Application Form',
    subtitle: 'Practice applying for a job',
    successMessage: 'Excellent job application',
    fields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', type: 'text', icon: <User className="w-4 h-4" />, required: true },
      { id: 'email', label: 'Email Address', placeholder: 'your.email@example.com', type: 'email', icon: <Mail className="w-4 h-4" />, required: true },
      { id: 'phone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'tel', icon: <Phone className="w-4 h-4" />, required: true },
      { id: 'address', label: 'Address', placeholder: '123 Main Street', type: 'text', icon: <MapPin className="w-4 h-4" />, required: true },
      { id: 'position', label: 'Position Applied For', placeholder: 'Cashier, Server, etc.', type: 'text', icon: <Briefcase className="w-4 h-4" />, required: true },
      { id: 'experience', label: 'Years of Experience', placeholder: '2 years', type: 'text', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'availability', label: 'Availability', placeholder: 'Full-time, Part-time', type: 'text', icon: <Calendar className="w-4 h-4" /> },
      { id: 'startDate', label: 'Available Start Date', placeholder: 'MM/DD/YYYY', type: 'text', icon: <Calendar className="w-4 h-4" /> },
    ],
  },
  'insurance': {
    title: 'Insurance Form',
    subtitle: 'Practice filling out insurance information',
    successMessage: 'Great insurance form',
    fields: [
      { id: 'subscriberName', label: 'Subscriber Name', placeholder: 'Name on insurance card', type: 'text', icon: <User className="w-4 h-4" />, required: true },
      { id: 'subscriberId', label: 'Subscriber ID', placeholder: 'ID number on card', type: 'text', icon: <FileText className="w-4 h-4" />, required: true },
      { id: 'groupNumber', label: 'Group Number', placeholder: 'Group number on card', type: 'text', icon: <FileText className="w-4 h-4" /> },
      { id: 'insuranceCompany', label: 'Insurance Company', placeholder: 'Blue Cross, Aetna, etc.', type: 'text', icon: <Briefcase className="w-4 h-4" />, required: true },
      { id: 'policyHolderDob', label: 'Policy Holder Date of Birth', placeholder: 'MM/DD/YYYY', type: 'text', icon: <Calendar className="w-4 h-4" /> },
      { id: 'relationship', label: 'Relationship to Policy Holder', placeholder: 'Self, Spouse, Child', type: 'text', icon: <Heart className="w-4 h-4" /> },
    ],
  },
};

export const InteractiveForm: React.FC<InteractiveFormProps> = ({
  formType,
  onComplete,
  userName = '',
}) => {
  const config = formConfigs[formType];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fieldsPerStep = 4;
  const totalSteps = Math.ceil(config.fields.length / fieldsPerStep);
  const currentFields = config.fields.slice(currentStep * fieldsPerStep, (currentStep + 1) * fieldsPerStep);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const requiredFieldsFilled = currentFields
    .filter(f => f.required)
    .every(f => formData[f.id]?.trim());

  const filledCount = Object.values(formData).filter(v => v?.trim()).length;
  const progress = (filledCount / config.fields.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <FileText className="w-5 h-5 text-primary" />
          <span className="font-medium text-primary">Real-World Practice</span>
        </div>
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{config.title}</h2>
        <p className="text-muted-foreground">{config.subtitle}</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Step {currentStep + 1} of {totalSteps}</span>
          <span className="text-primary font-medium">{filledCount}/{config.fields.length} fields</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-primary" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card rounded-3xl p-6 shadow-card border border-border space-y-6"
          >
            {/* Form Fields */}
            <div className="space-y-4">
              {currentFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor={field.id} className="flex items-center gap-2">
                    {field.icon}
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type === 'select' ? 'text' : field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="rounded-xl"
                  />
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="rounded-xl"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextStep}
                disabled={!requiredFieldsFilled}
                className="gap-2 rounded-xl bg-gradient-primary"
              >
                {currentStep === totalSteps - 1 ? 'Submit Form' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-success/20 to-success/5 rounded-3xl p-8 border border-success/30 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="font-fredoka text-2xl font-bold text-success">
                {config.successMessage}, {userName || 'friend'}! 🎉
              </h3>
              <p className="text-muted-foreground">
                You successfully filled out the form with all required information.
              </p>
            </div>

            {/* Form Summary */}
            <div className="bg-card rounded-2xl p-4 text-left max-w-md mx-auto">
              <h4 className="font-semibold text-foreground mb-3">Your Information:</h4>
              <div className="space-y-2 text-sm">
                {config.fields.slice(0, 4).map(field => (
                  formData[field.id] && (
                    <div key={field.id} className="flex justify-between">
                      <span className="text-muted-foreground">{field.label}:</span>
                      <span className="font-medium text-foreground">{formData[field.id]}</span>
                    </div>
                  )
                ))}
                {Object.keys(formData).length > 4 && (
                  <p className="text-muted-foreground italic">+ {Object.keys(formData).length - 4} more fields</p>
                )}
              </div>
            </div>

            <Button 
              onClick={onComplete} 
              size="lg"
              className="gap-2 rounded-xl bg-gradient-primary px-8"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveForm;
