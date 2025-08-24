// src/components/ui/ToggleSwitch.tsx

import React from 'react';

interface ToggleSwitchProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  testId?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, name, checked, onChange, label, testId }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span className="text-sm font-medium text-gray-800 mr-3">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          data-testid={testId}
        />
        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;