import { useState } from 'react';
import { SERVER } from '../constans/constans';
import type { RequestBodyPay, ResponsePay, StatusResponsePay } from '../interfaces/interfaces';
import {
  formatCardName,
  formatCardNumber,
  getNumericOnly,
  hasTwoWords,
  isValidateExpiry,
  isValidCardNumber,
  uuid4,
} from '../utils';

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    validateForm(formattedValue, expiry, cvv, cardName);
  };

  const validateCardNumber = () => {
    const numericValue = getNumericOnly(cardNumber);

    if (!numericValue) {
      setCardNumberError('');
      return true;
    }

    const isValid = isValidCardNumber(numericValue);

    if (!isValid) {
      setCardNumberError(error);
    } else {
      setCardNumberError('');
    }

    validateForm(cardNumber, expiry, cvv, cardName);
    return isValid;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = getNumericOnly(e.target.value);

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

    const isValid = isValidateExpiry(expiry);

    if (!isValid) {
      setExpiryError(error);
    } else {
      setExpiryError('');
    }

    return isValid;
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = getNumericOnly(e.target.value);
    const limited = numericValue.substring(0, 3);
    setCvv(limited);
    validateForm(cardNumber, expiry, limited, cardName);
  };

  const validateCvv = () => {
    if (!cvv) {
      setCvvError('');
      return true;
    }

    const isValid = cvv.length === 3;

    if (!isValid) {
      setCvvError(error);
    } else {
      setCvvError('');
    }

    validateForm(cardNumber, expiry, cvv, cardName);
    return isValid;
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardName(e.target.value);
    setCardName(value);
    validateForm(cardNumber, expiry, cvv, value);
  };

  const validateCardName = () => {
    if (!cardName.trim()) {
      setCardNameError('');
      return true;
    }

    const isValid = hasTwoWords(cardName);

    if (!isValid) {
      setCardNameError(error);
    } else {
      setCardNameError('');
    }

    validateForm(cardNumber, expiry, cvv, cardName);
    return isValid;
  };

  const validateForm = (
    cardNum = cardNumber,
    exp = expiry,
    cvvValue = cvv,
    name = cardName
  ) => {
    const isCardNumberValid = isValidCardNumber(getNumericOnly(cardNum));
    const isExpiryValid = exp.length === 5 && !expiryError;
    const isCvvValid = cvvValue.length === 3 && !cvvError;
    const isCardNameValid = hasTwoWords(name) && !cardNameError;

    setButtonDisabled(
      !(isCardNumberValid && isExpiryValid && isCvvValid && isCardNameValid)
    );
  };

  const checkPaymentStatus = async (pid: string): Promise<void> => {
    try {
      const response = await fetch(`${SERVER}/pay/check/${pid}`);
      const data: StatusResponsePay = await response.json();

      if (data.status === 'process') {
        setTimeout(() => checkPaymentStatus(pid), 1000);
      } else if (data.status === 'ok') {
        setIsSuccess(true);
        setIsLoading(false);
      } else if (data.status === 'fail') {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error('checkPaymentStatus:', error);
    }
  };

  const handleSubmit = async () => {
    if (!buttonDisabled && !isLoading) {
      setIsLoading(true);

      try {
        const requestId = uuid4();

        const requestBody: RequestBodyPay = {
          jsonrpc: '2.0',
          id: requestId,
          method: 'pay',
          params: {
            pan: getNumericOnly(cardNumber),
            expire: expiry,
            cardholder: cardName,
            cvc: cvv,
          },
        };

        const response = await fetch(`${SERVER}/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const data: ResponsePay = await response.json();

        if (data.result && data.result.pid) {
          checkPaymentStatus(data.result.pid);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('handleSubmit:', error);
      }
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
