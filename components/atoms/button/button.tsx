import type { FC, ReactElement } from 'react';
import { clsx } from 'clsx';
import { P, match } from 'ts-pattern';
import { TButton } from '@/entities';
import Link from 'next/link';



export const Button: FC<TButton> = ({
  variant = 'primary',
  size = 'sm',
  variantType = 'solid',
  state = 'default',
  ...props
}): ReactElement => {
  const className = clsx(
    'rounded-md hover:opacity-80 font-medium transition-all hover:cursor-pointer',
    'disabled:cursor-not-allowed disabled:hover:opacity-80 disabled:bg-gray-200',
    'text-sm px-4 py-2 text-center',
    {
      'border bg-transparent border-gray-200 text-gray-900':
        variantType === 'outline',
      'border-none': variantType === 'solid',
    },
    {
      'bg-indigo-600 text-white': variant === 'primary' && variantType === 'solid',
      'bg-indigo-500 text-white':
        variant === 'secondary' && variantType === 'solid',
      'bg-indigo-600  text-white': variant === 'success' && variantType === 'solid',
      'bg-red-500  text-white': variant === 'error' && variantType === 'solid',
      'bg-yellow-500 text-white': variant === 'warning' && variantType === 'solid',
      'bg-blue-500  text-white': variant === 'info' && variantType === 'solid',
    },
    {
      'border-bg-indigo-600 text-indigo-600':
        variant === 'primary' && variantType === 'outline',
      'border-bg-indigo-500 text-indigo-500':
        variant === 'secondary' && variantType === 'outline',
      'border-green-500 text-green-500':
        variant === 'success' && variantType === 'outline',
      'border-bg-red-500 text-red-500':
        variant === 'error' && variantType === 'outline',
      'border-bg-yellow-500 text-yellow-500':
        variant === 'warning' && variantType === 'outline',
      'border-bg-blue-400 text-blue-400':
        variant === 'info' && variantType === 'outline',
    },
    {
      'md:text-sm md:px-2 md:py-1': size === 'sm',
      'md:text-base md:px-4 md:py-2': size === 'md',
      'md:text-xl md:px-6 md:py-3': size === 'lg',
    },
    {
      'w-full': props.fullWidth === true,
    }
  );

  const buttonState = match(state)
    .with('default', () => props.children)
    .with('loading', () => 'Loading...')
    .exhaustive();

  return match(props.href)
    .with(undefined, () => (
      <button className={className} {...props}>
        {buttonState}
      </button>
    ))
    .with(P.string, (link) => (
      <Link href={link}>
        <button className={className} {...props}>
          {buttonState}
        </button>
      </Link>
    ))
    .exhaustive();
};
