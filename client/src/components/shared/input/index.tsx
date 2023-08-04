import { ChangeEvent } from 'react';
import { InputProps } from '../../../interfaces/IInput';

export const Input = <T,>({ label, className, value, onChange, type = 'text', placeholder, error }: InputProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as unknown as T;
    onChange(newValue);
  };

  return (
    <>
      {label && <label className='label'>{label}</label>}
      <input
        className={className}
        type={type}
        value={value as unknown as string}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <p className='error'>{error}</p>}
    </>
  );
}