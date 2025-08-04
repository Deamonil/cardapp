export interface RequestBodyPay {
  jsonrpc: string;
  id: string;
  method: string;
  params: {
    pan: string;
    expire: string;
    cardholder: string;
    cvc: string;
  };
}

export interface ResponsePay {
  jsonrpc: string;
  id: string;
  result: {
    pid: string;
  };
}

export interface StatusResponsePay {
  status: 'process' | 'ok' | 'fail';
  pid: string;
  message?: string;
}
