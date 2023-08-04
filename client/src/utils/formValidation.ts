import { IFieldValidation } from "../interfaces/IFieldValidation";

export const fieldValidations: { [key: string]: IFieldValidation } = {
    email: {
      required: { value: true, message: "Field is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    
    password: {
      required: { value: true, message: "Field is required" },
      minLength: { value: 6, message: "Must contain at least 6 characters" },
      maxLength: { value: 20, message: "Must contain at most 20 characters" },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
        message: "Password should be 6-20 characters long with at least one uppercase letter and special characters.",
      },
    },
  
    pseudo: {
      required: { value: true, message: "Field is required" },
      minLength: { value: 3, message: "Must contain at least 3 characters" },
      maxLength: { value: 50, message: "Must contain at most 50 characters" },
      pattern: {
        value: /^[A-Za-z0-9]{3,50}$/,
        message: "Pseudo requirements: 3 to 50 characters with only letters and numbers allowed.",
      },
    },
};