import { usePayForm } from '../hooks/usePayForm';
import { ErrorScreen } from './errorScreen';
import { FormField } from './formField';
import { SuccessScreen } from './successScreen';

const FORM_CONFIG = {
  cardNumber: {
    minLength: 16,
    maxLength: 23,
    placeholder: '0000 0000 0000 0000',
  },
  expiry: {
    maxLength: 5,
    placeholder: 'ММ/ГГ',
  },
  cvv: {
    maxLength: 3,
    placeholder: '***',
  },
  cardName: {
    placeholder: 'IVAN IVANOV',
  },
} as const;

const TOOLTIPS = {
  cardNumber: 'Номер карты должен содержать от 13 до 19 цифр',
  expiry: 'Первое число от 1 до 12 (месяц), второе от 21 до 26 (год)',
  cvv: 'CVV код состоит из 3 цифр',
  cardName: 'Введите имя и фамилию',
} as const;

export const PayForm = () => {
  const {
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
  } = usePayForm();

  if (isSuccess) return <SuccessScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[457px] min-h-[464px] p-[20px] bg-white rounded-lg shadow-sm">
        <h2 className="text-title font-inter font-normal leading-[1.3] text-grey-900 mb-6 text-left">
          Оплата банковской картой
        </h2>

        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormField label="Номер карты" error={cardNumberError}>
            <input
              className={`w-full px-3 py-2 border ${
                cardNumberError
                  ? 'border-error focus:border-error'
                  : 'border-grey-200 focus:border-primary hover:border-grey-400'
              } rounded-md focus:outline-none transition-colors`}
              type="text"
              minLength={FORM_CONFIG.cardNumber.minLength}
              maxLength={FORM_CONFIG.cardNumber.maxLength}
              placeholder={FORM_CONFIG.cardNumber.placeholder}
              value={cardNumber}
              title={TOOLTIPS.cardNumber}
              onChange={handleCardNumberChange}
              onBlur={validateCardNumber}
            />
          </FormField>

          <div className="h-[84px] flex justify-between">
            <FormField
              label="Месяц/Год"
              error={expiryError}
              className="w-[174px]"
            >
              <input
                className={`w-full px-3 py-2 border ${
                  expiryError
                    ? 'border-error focus:border-error'
                    : 'border-grey-200 focus:border-primary hover:border-grey-400'
                } rounded-md focus:outline-none transition-colors`}
                type="text"
                maxLength={FORM_CONFIG.expiry.maxLength}
                placeholder={FORM_CONFIG.expiry.placeholder}
                title={TOOLTIPS.expiry}
                value={expiry}
                onChange={handleExpiryChange}
                onBlur={validateExpiry}
              />
            </FormField>

            <FormField label="Код" error={cvvError} className="w-[174px]">
              <input
                className={`w-full px-3 py-2 border ${
                  cvvError
                    ? 'border-error focus:border-error'
                    : 'border-grey-200 focus:border-primary hover:border-grey-400'
                } rounded-md focus:outline-none transition-colors`}
                type="password"
                maxLength={FORM_CONFIG.cvv.maxLength}
                placeholder={FORM_CONFIG.cvv.placeholder}
                title={TOOLTIPS.cvv}
                value={cvv}
                onChange={handleCvvChange}
                onBlur={validateCvv}
              />
            </FormField>
          </div>

          <FormField label="Владелец карты" error={cardNameError}>
            <input
              className={`w-full px-3 py-2 border ${
                cardNameError
                  ? 'border-error focus:border-error'
                  : 'border-grey-200 focus:border-primary hover:border-grey-400'
              } rounded-md focus:outline-none transition-colors uppercase`}
              type="text"
              placeholder={FORM_CONFIG.cardName.placeholder}
              title={TOOLTIPS.cardName}
              value={cardName}
              onChange={handleCardNameChange}
              onBlur={validateCardName}
            />
          </FormField>

          <div className="h-[84px] flex justify-end items-start pt-6">
            <button
              type="submit"
              className={`w-[123px] h-[48px] bg-primary hover:bg-primary-dark text-white font-inter rounded-[10px] text-button leading-[18px] 
                disabled:bg-grey-200 disabled:text-grey-500 
                flex items-center justify-center transition-all duration-200`}
              disabled={buttonDisabled || isLoading}
            >
              {isLoading ? (
                <div className="w-[20px] h-[20px] border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                'Оплатить'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
