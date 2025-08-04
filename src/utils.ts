export const getNumericOnly = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

export const formatCardNumber = (value: string) => {
  const numericOnly = getNumericOnly(value);
  const limited = numericOnly.substring(0, 19);
  const parts = [];
  for (let i = 0; i < limited.length; i += 4) {
    parts.push(limited.substring(i, i + 4));
  }

  return parts.join(' ');
};

export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatCardName = (value: string): string => {
  return value.replace(/[^a-zA-Zа-яА-Я\s]/g, '').toUpperCase();
};

export const isValidCardNumber = (cardNumber: string): boolean => {
  const numericValue = cardNumber.replace(/\s/g, '');
  return numericValue.length >= 13 && numericValue.length <= 19;
};

export const isValidateExpiry = (expiry: string) => {
  const [month, year] = expiry.split('/');
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  if (!month || month.length !== 2 || monthNum < 1 || monthNum > 12) {
    return false;
  } else if (!year || year.length !== 2 || yearNum < 21 || yearNum > 26) {
    return false;
  } else {
    return true;
  }
};

export const hasTwoWords = (value: string): boolean => {
  const words = value.trim().split(/\s+/);
  return words.length === 2 && words.every(word => word.length >= 2);
};
