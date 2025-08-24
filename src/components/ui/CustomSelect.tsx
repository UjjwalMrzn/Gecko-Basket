// src/components/ui/CustomSelect.tsx

import { useState, useRef, useEffect, ReactNode } from 'react';

interface SelectOption {
  value: string;
}

interface CustomSelectProps<T extends SelectOption> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  renderTrigger: (value: T, isOpen: boolean) => ReactNode;
  renderOption: (option: T, isSelected: boolean) => ReactNode;
  testId?: string;
}

const CustomSelect = <T extends SelectOption>({
  options,
  value,
  onChange,
  renderTrigger,
  renderOption,
  testId,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-100%" data-testid={testId}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full"
        data-testid={`${testId}-button`}
      >
        {renderTrigger(value, isOpen)}
      </button>

      {isOpen && (
        // FIX: Removed Portal, using standard absolute positioning.
        // Added max-height and scrolling for long lists.
        <ul
          className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto"
          data-testid={`${testId}-options`}
        >
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              data-testid={`${testId}-option-${option.value}`}
            >
              {renderOption(option, value.value === option.value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;