import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface MultiStepsFormContextType {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps?: number;

  //Form data management
  formData: Record<string, any>;
  updateStepData: (data: any) => void;
  getAllFormData: () => any;
  clearFormData: () => void;
}

const MultiStepsFormContext = createContext<MultiStepsFormContextType | undefined>(undefined);

interface MultiStepsFormProviderProps {
  children: ReactNode;
  totalSteps?: number;
  initialStep?: number;
}

export const MultiStepsFormProvider: React.FC<MultiStepsFormProviderProps> = ({
  children,
  totalSteps = 3,
  initialStep = 1
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialStep);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const nextStep = () => {
    if (totalSteps && currentIndex < totalSteps) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentIndex > 1) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  //Form data management functions
  const updateStepData = (data: any) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    console.log(formData)
  };

  const getAllFormData = () => {
    return Object.values(formData).reduce((acc, stepData) => ({ ...acc, ...stepData }), {});
  };

  const clearFormData = () => {
    setFormData({});
  };

  const value: MultiStepsFormContextType = {
    currentIndex,
    setCurrentIndex,
    nextStep,
    prevStep,
    totalSteps,
    formData,
    updateStepData,
    getAllFormData,
    clearFormData
  };

  return (
    <MultiStepsFormContext.Provider value={value}>
      {children}
    </MultiStepsFormContext.Provider>
  );
};

export const useMultiStepsForm = (): MultiStepsFormContextType => {
  const context = useContext(MultiStepsFormContext);
  
  if (context === undefined) {
    throw new Error('useMultiStepsForm must be used within a MultiStepsFormProvider');
  }
  
  return context;
};