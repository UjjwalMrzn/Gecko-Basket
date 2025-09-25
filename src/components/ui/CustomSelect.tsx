// src/components/ui/CustomSelect.tsx
import { useState, useRef, useEffect, ReactNode } from 'react';

// ✅ DEFINITIVE FIX: Added 'export' so other files can use this type
export type SelectOption = {
  value: any;
  label: string;
};

interface CustomSelectProps<T extends SelectOption> {
  value: T | null;
  options: T[];
  onChange: (option: T) => void;
  renderTrigger: (value: T | null, isOpen: boolean) => ReactNode;
  renderOption: (option: T, isSelected: boolean) => ReactNode;
  disabled?: boolean;
  testId?: string;
}

const CustomSelect = <T extends SelectOption>({
  value,
  options,
  onChange,
  renderTrigger,
  renderOption,
  disabled = false,
  testId,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative font-inter" ref={selectRef} data-testid={testId}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      >
        {renderTrigger(value, isOpen)}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="list-none"
              >
                {renderOption(option, value?.value === option.value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;