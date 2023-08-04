export interface InputProps<T> {
  label?: string;
  className?: string;
  value: T;
  onChange: (value: T) => void; 
  type?: string;
  placeholder?: string;
  error? : string;
}