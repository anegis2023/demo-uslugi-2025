
export const validateNIP = (nip: string): boolean => {
  // Remove spaces and hyphens
  const cleanNip = nip.replace(/[\s-]/g, '');
  
  // Check if NIP has exactly 10 digits
  if (!/^\d{10}$/.test(cleanNip)) {
    return false;
  }
  
  // Calculate checksum using official algorithm
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanNip[i]) * weights[i];
  }
  
  const remainder = sum % 11;
  const checksum = remainder < 10 ? remainder : 0;
  
  return checksum === parseInt(cleanNip[9]);
};
