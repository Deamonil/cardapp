import { useState } from 'react';

export const usePayForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiry, setExpiry] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const error = 'Ошибка валидации';

  const formatCardNumber = (value: string) => {
    const numericOnly = value.replace(/[^0-9]/g, '');
    const limited = numericOnly.substring(0, 19);
    const parts = [];
    for (let i = 0; i < limited.length; i += 4) {
      parts.push(limited.substring(i, i + 4));
    }

    return parts.join(' ');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const validateCardNumber = () => {
    const numericValue = cardNumber.replace(/\s/g, '');

    if (!numericValue) {
      setCardNumberError('');
      return true;
    }

    let isValid = true;

    if (numericValue.length < 13) {
      setCardNumberError(error);
      isValid = false;
    } else {
      setCardNumberError('');
      isValid = true;
    }

    validateForm(cardNumber, expiry, cvv, cardName);

    return isValid;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    setExpiry(value);
    validateForm(cardNumber, value, cvv, cardName);
  };

  const validateExpiry = () => {
    if (!expiry) {
      setExpiryError('');
      return true;
    }

    const [month, year] = expiry.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!month || month.length !== 2 || monthNum < 1 || monthNum > 12) {
      setExpiryError(error);
      return false;
    } else if (!year || year.length !== 2 || yearNum < 21 || yearNum > 26) {
      setExpiryError(error);
      return false;
    } else {
      setExpiryError('');
      return true;
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const limited = numericValue.substring(0, 3);
    setCvv(limited);
  };

  const validateCvv = () => {
    if (!cvv) {
      setCvvError('');
      return true;
    }

    let isValid = true;

    if (cvv.length !== 3) {
      setCvvError(error);
      isValid = false;
    } else {
      setCvvError('');
      isValid = true;
    }

    validateForm(cardNumber, expiry, cvv, cardName);

    return isValid;
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Zа-яА-Я\s]/g, '')
      .toUpperCase();
    setCardName(value);
  };

  const validateCardName = () => {
    if (!cardName.trim()) {
      setCardNameError('');
      return true;
    }

    const words = cardName.trim().split(/\s+/);

    let isValid = true;

    if (words.length !== 2) {
      setCardNameError(error);
      isValid = false;
    } else {
      setCardNameError('');
      isValid = true;
    }

    validateForm(cardNumber, expiry, cvv, cardName);

    return isValid;
  };

  const validateForm = (
    cardNum = cardNumber,
    exp = expiry,
    cvvValue = cvv,
    name = cardName,
    isCardNumValid?: boolean
  ) => {
    const cardNumericValue = cardNum.replace(/\s/g, '');
    const isCardNumberValid =
      isCardNumValid !== undefined
        ? isCardNumValid
        : cardNumericValue.length >= 13 && cardNumericValue.length <= 19;

    const isExpiryValid = exp.length === 5 && !expiryError;
    const isCvvValid = cvvValue.length === 3 && !cvvError;

    const nameWords = name.trim().split(/\s+/);
    const isCardNameValid = nameWords.length === 2 && !cardNameError;

    setButtonDisabled(
      !(isCardNumberValid && isExpiryValid && isCvvValid && isCardNameValid)
    );
  };

  const handleSubmit = async () => {
    if (!buttonDisabled && !isLoading) {
      setIsLoading(true);
      console.log('handleSubmit: ', { cardNumber, expiry, cvv, cardName });

      setTimeout(() => {
        setIsLoading(false);

        if (isSuccess) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      }, 2000);
    }
  };

  return {
    cardNumber,
    cardNumberError,
    expiry,
    expiryError,
    cvv,
    cvvError,
    cardName,
    cardNameError,
    buttonDisabled,
    isLoading,
    isSuccess,
    isError,

    handleCardNumberChange,
    validateCardNumber,
    handleExpiryChange,
    handleCvvChange,
    validateCvv,
    handleCardNameChange,
    validateCardName,
    validateExpiry,
    handleSubmit,
  };
};
