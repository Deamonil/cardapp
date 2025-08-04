export const SERVER = 'http://localhost:2050';

export const FORM_CONFIG = {
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
};

export const TOOLTIPS = {
  cardNumber: 'Номер карты должен содержать от 13 до 19 цифр',
  expiry: 'Первое число от 1 до 12 (месяц), второе от 21 до 26 (год)',
  cvv: 'CVV код состоит из 3 цифр',
  cardName: 'Введите имя и фамилию',
};
