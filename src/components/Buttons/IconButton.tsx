import iconBg from '../../assets/images/icon-bg.png';
import Tippy from '@tippyjs/react';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  iconClassName?: string;
  show?: boolean;
  icon?: string;
  tooltip_text?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  loading,
  className,
  iconClassName,
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
    <Tippy
      content={props.tooltip_text || ''}
      placement='left'
      delay={[200, 0]}
      className='p-1 rounded text-sm bg-black text-white'
    >
      <div 
        className='w-[50px] h-[50px] flex justify-center bg-cover border-solid hover:scale-110 transition-transform duration-200'
        style={{ backgroundImage: `url(${iconBg})` }}
      >
          <button
          onClick={handleClick}
              {...props}
          >
            {loading ? '' : icon && <img src={icon} className={`w-[30px] h-[30px] ${iconClassName || ''}`} alt="icon" />}
          </button>
      </div>
    </Tippy>
  ) : null;
};

export default IconButton;
