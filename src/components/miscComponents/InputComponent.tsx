import { ChangeEvent, FC } from "react";

interface InputComponentProps {
  inputLabel: string;
  inputType: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  step?: string;
  min?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const InputComponent: FC<InputComponentProps> = ({
  inputLabel,
  inputType,
  onChange,
  placeholder,
  value,
  step,
  min,
  onFocus,
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="pb-4 text-sm">{inputLabel}</h1>
      <input
        placeholder={placeholder}
        type={inputType}
        className="border bg-transparent outline-none p-4 text-base rounded-lg "
        onChange={onChange}
        value={value}
        step={step}
        min={min}
        onFocus={onFocus}
      />
    </div>
  );
};

export default InputComponent;
