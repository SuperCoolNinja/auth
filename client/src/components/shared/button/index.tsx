import { IButton } from '../../../interfaces/IButton';



export const Button: React.FunctionComponent<IButton> = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};
