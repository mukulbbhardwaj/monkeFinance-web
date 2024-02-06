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
    <div className="flex flex-col w-full">
      <h1 className="pb-4 text-sm">{inputLabel}</h1>
      <input
        placeholder={placeholder}
        type={inputType}
        className="border bg-transparent outline-none p-2 text-base "
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
