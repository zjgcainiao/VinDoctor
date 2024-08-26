  export const isValidUSPhoneNumber = (phone: string) => {
    // Remove non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Check if it's a 10-digit number
    if (!/^\d{10}$/.test(digits)) {
      return null; // Indicate invalid phone
    }

    // Convert to E.164 format
    const e164 = `+1${digits}`;

    // Return formatted number if it's valid E.164 format
    const re = /^\+[1-9]\d{1,14}$/;
    if (re.test(e164)) {
      return e164; // Return the formatted phone number
    }

    return null; // Indicate invalid phone
  };