type Props = {
  label: string;
  type: string;
  value: string;
  name?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = ({ label, type,name, value, placeholder, onChange, required }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#272343] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59b143] transition"
      />
    </div>
  );
};

export default Input;
