import { usePayForm } from '../hooks/usePayForm';

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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[457px] h-[464px] p-[20px] bg-white rounded-lg shadow-sm">
        <h2 className="text-title font-inter font-normal leading-[1.3] text-grey-900 mb-6 text-left">
          Оплата банковской картой
        </h2>  
        <div className="h-[84px] space-y-4">
          <div className='h-[84px]'>
            <label className="block text-sm font-normal text-grey-800 mb-1">Номер карты</label>
            <input
              className={`w-full px-3 py-2 border ${cardNumberError ? 'border-error' : 'border-grey-200 focus:border-primary hover:border-gray-800'} rounded-md focus:outline-none`}
              type="text"
              minLength={16}
              maxLength={23}
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
              onBlur={validateCardNumber}
              title={cardNumberError ? "Номер карты должен содержать от 13 до 19 цифр" : ""}

            />
            {cardNumberError && <p className="mt-1 text-sm text-error">{cardNumberError}</p>}
          </div>
          <div className="h-[84px] flex justify-between">
            <div className='w-[174px]'>
              <label className="block text-sm font-normal text-grey-800 mb-1">Месяц/Год</label>
              <input
                className={`w-full px-3 py-2 border ${expiryError ? 'border-error' : 'border-grey-200 focus:border-primary hover:border-gray-800'} rounded-md`}
                type="text"
                maxLength={5}
                placeholder="Default"
                value={expiry}
                onChange={handleExpiryChange}
                onBlur={validateExpiry}
                title={expiryError ? "Первое число от 1 до 12, второе от 21 до 26" : ""}
              />
              {expiryError && <p className="mt-1 text-sm text-error">{expiryError}</p>}
            </div>
            <div className='w-[174px]'>
              <label className="block text-sm font-normal text-grey-800 mb-1">Код</label>
              <input
                className={`w-full px-3 py-2 border ${cvvError ? 'border-error' : 'border-grey-200 focus:border-primary hover:border-gray-800'} rounded-md`}
                type="password"
                maxLength={3}   
                placeholder="***" 
                value={cvv}
                onChange={handleCvvChange}
                onBlur={validateCvv}
                title={cvvError ? "Код состоит из трех цифр" : ""}
              />
              {cvvError && <p className="mt-1 text-sm text-error">{cvvError}</p>}
            </div>
          </div>
          <div className='h-[84px]'>
            <label className="block text-sm font-normal text-grey-800 mb-1">Владелец карты</label>
            <input
              className={`w-full px-3 py-2 border ${cardNameError ? 'border-error' : 'border-grey-200 focus:border-primary hover:border-gray-800'} rounded-md`}
              type="text"
              placeholder="IVAN IVANOV"
              value={cardName}
              onChange={handleCardNameChange}
              onBlur={validateCardName}     
              title={cardNameError ? "Владелец карты - два слова любой длины, без цифр" : ""}       
              />
            {cardNameError && <p className="mt-1 text-sm text-error">{cardNameError}</p>}
          </div>
          <div className='h-[84px] flex justify-end'>
            <button
              className={`w-[123px] h-[48px] bg-primary hover:bg-primary-dark text-white font-inter rounded-[10px] text-button leading-[18px] disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center ${isLoading ? 'cursor-not-allowed' : ''}`}
              disabled={buttonDisabled || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="w-[25px] h-[25px] border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Оплатить'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
