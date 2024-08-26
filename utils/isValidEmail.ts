import { checkDomainExists } from './checkDomainExists';
// import { ValidationResult } from './types'; // You'll define this type
// Type for Validation Result
interface ValidationResult {
  isValid: boolean;
  error: string | null; 
  email: string | null // Include the normalized email 
}

export const isValidEmail = (email: string): ValidationResult => {

    const normalizedEmail = email.toLowerCase().trim(); // Normalize email
    // 1. Basic Structure Check (with a robust regex)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(normalizedEmail.toLowerCase())) {
        return { isValid: false, error: 'Invalid email format' };
    }

  // 2. (Optional) Domain Existence Check (Asynchronous)
  const domain = normalizedEmail.split('@')[1];

  return checkDomainExists(domain)
    .then((domainExists) => {
      if (!domainExists) {
         return { isValid: false, error: 'Domain does not exist' };
      }
      return { isValid: true, error: null }; // Success!
    })
    .catch(() => {
      // Handle error from domain check (e.g., network issues)
      return { isValid: false, error: 'Could not verify email address' };
    });
};


