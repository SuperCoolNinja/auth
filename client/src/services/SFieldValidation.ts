import { IFieldValidation } from "../interfaces/IFieldValidation";


export function validateField(value: string, validations: IFieldValidation): string | null {
  for (const validation in validations) {
    if (validation === "required") {
      if (validations.required && validations.required.value && !value.trim()) {
        return validations.required.message;
      }
    } else if (validation === "minLength") {
      if (validations.minLength && value.length < validations.minLength.value) {
        return validations.minLength.message;
      }
    } else if (validation === "maxLength") {
      if (validations.maxLength && value.length > validations.maxLength.value) {
        return validations.maxLength.message;
      }
    } else if (validation === "pattern") {
      if (validations.pattern && !validations.pattern.value.test(value)) {
        return validations.pattern.message;
      }
    }
  }
  return null;
}