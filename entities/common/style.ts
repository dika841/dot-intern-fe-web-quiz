import { clsx } from 'clsx';
import { TInput } from '.';

export const className = ({ size = 'sm', status = 'default' }: TInput) =>
  clsx(
    'mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
    'disabled:cursor-not-allowed disabled:bg-gray-50',
    'transition duration-300 ease-in-out px-3 py-2 text-sm',
    {
      'md:px-2 md:py-1 md:text-xs': size === 'sm' || !size,
      'md:px-3 md:py-2': size === 'md',
      'md:px-5 md:py-4': size === 'lg',
    },
    {
      'bg-white border-gray-500 text-gray-600 placeholder:text-gray-300':
        status === 'default' || !status,
      'bg-green-100 text-green-400 border-green-400 placeholder:text-green-400':
        status === 'success',
      'bg-red-50 border-red-50 text-red-50 placeholder:text-red-50':
        status === 'error',
      'bg-yellow-50 text-yellow-400 border-text-yellow-400 placeholder:text-yellow-400':
        status === 'warning',
    }
  );