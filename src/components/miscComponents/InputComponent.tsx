import { ChangeEvent, FC } from "react";

interface InputComponentProps {
  inputLabel: string;
  inputType: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputComponent: FC<InputComponentProps> = ({
  inputLabel,
  inputType,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col p-6 w-full">
      <h1 className="text-text pb-4 text-sm">{inputLabel}</h1>
      <input
        placeholder={placeholder}
        type={inputType}
        className="bg-transparent border-b border-text text-base"
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
