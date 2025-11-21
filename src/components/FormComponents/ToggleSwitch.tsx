import { FieldProps } from "formik";

const ToggleSwitch: React.FC<FieldProps & {label: string}> = ({
  label,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <div className="flex items-center relative">
      <input
        {...field}
        {...props}
        checked={field.value}
        className={`${label ? 'mr-2' : ''} h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-red checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-red checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] bg-gray_1  checked:after:bg-white after:border after:border-gray_1 after:checked:border after:checked:border-red dark:focus:before:shadow-none dark:checked:focus:before:shadow-none`}
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
      />
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer text-gray_2"
        htmlFor="flexSwitchCheckDefault"
      >
        {label}
      </label>
      {touched[field.name] && errors[field.name] ? (
        <div className="text-red text-sm text-left">
          {errors[field.name] as string}
        </div>
      ) : null}
    </div>
  );
};

export default ToggleSwitch;
