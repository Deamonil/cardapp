import { ErrorIcon } from './Icons';

export const ErrorScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[457px] h-[464px] p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-6 text-error">
          <ErrorIcon className="w-[80px] h-[80px]" />
        </div>
        <h2 className="text-title font-inter font-normal leading-[1.3] text-grey-900 mb-6 text-center">
          Произошла ошибка
        </h2>
      </div>
    </div>
  );
};
