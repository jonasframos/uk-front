interface CloseIconProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}
const CloseIcon: React.FC<CloseIconProps> = ({
  width = 13,
  height = 13,
  color = "#4F4F52",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0417 2.07462L10.9254 0.958374L6.50001 5.38379L2.07459 0.958374L0.958344 2.07462L5.38376 6.50004L0.958344 10.9255L2.07459 12.0417L6.50001 7.61629L10.9254 12.0417L12.0417 10.9255L7.61626 6.50004L12.0417 2.07462Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;