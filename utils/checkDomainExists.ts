import { lookup } from 'dns';
import { promisify } from 'util'; // For promisifying dns.lookup


const lookupAsync = promisify(lookup);

export const checkDomainExists = async (domain: string): Promise<boolean> => {
  try {
    await lookupAsync(domain, { family: 4, hints: dns.ADDRCONFIG | dns.V4MAPPED, all: true });
    return true;  // Domain has MX records
  } catch (error) {
    return false; // No MX records found
  }
}; // Added a closing brace
