import { FC, ReactElement } from 'react';
import { clsx } from 'clsx';
import { TLabel } from '@/entities';


export const Label: FC<TLabel> = (props): ReactElement => {
  const className = clsx(
    'flex gap-x-1 text-gray-600 select-none font-medium',
    {
      'text-xs': props.size === 'sm',
      'text-sm': props.size === 'md',
      'text-md': props.size === 'lg',
    },
    {
      'text-gray-300 cursor-not-allowed opacity-50': props.disabled,
    },
    props.className
  );

  return (
    <label
      id={props.id}
      data-testid="label"
      htmlFor={props.htmlFor}
      className={className}
      {...props}
    >
      {props.children}
      {props.required && (
        <span data-testid="required" className="text-red-500">
          *
        </span>
      )}
    </label>
  );
};
