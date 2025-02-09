import React from "react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Crop Details", "Offer Details", "Review & Submit"];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  const currentIndex = currentStep - 1;
  return (
    <div className="mb-8 p-2">
      <div className="flex justify-between px-8">
        {steps.map((label, index) => (
          <div key={label} className="text-center">
            <div
              className={`w-10 h-10 border-2 m-auto rounded-full flex items-center justify-center ${
                index <= currentIndex
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
