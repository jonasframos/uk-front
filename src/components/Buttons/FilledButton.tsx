interface FilledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string[] | string | JSX.Element;
  loading?: boolean;
  className?: string;
  show?: boolean;
  icon?: JSX.Element;
}

const FilledButton: React.FC<FilledButtonProps> = ({
  children,
  onClick,
  loading,
  className,
  show = true,
  icon,
  ...props
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading && onClick) {
      onClick(event);
    }
  };

  return show ? (
    <button
      onClick={handleClick}
      {...props}
      className={loading ? `bg-gray_05 p-3 cursor-wait ${className}` : `bg-gray_05 text-sm font-semibold p-3 hover:bg-gray_1 transition duration-200 ease-in-out ${className}`}
    >
      {loading ? '' : icon}
      {loading ? '' : children}
    </button>
  ) : null;
};

export default FilledButton;
