import { forwardRef } from "react";
import MaskedTextInput from "react-text-mask";

const CustomDateInput: React.FC<any> = forwardRef(
  ({ value, onClick, placeholderText, className, onChange }, ref) => (
    <label onClick={onClick} ref={ref as any} className="float-label-input">
      <MaskedTextInput
        type="text"
        value={value}
        onChange={onChange}
        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
        placeholder=" "
        className={`${!value ? "w-full" : "w-[84px]"} ${className}`}
      />
      <span className="text-gray_2 w-max">{placeholderText}</span>
    </label>
  )
);

export default CustomDateInput;
