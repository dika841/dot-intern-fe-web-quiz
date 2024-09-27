import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { AxiosError } from "axios";
export type TMetaItem = {
  code: number;
  status: string;
  message: string;
};

export type TMetaErrorResponse = AxiosError<TMetaItem>;

export type TSize = "sm" | "md" | "lg";

export type TVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info"
  | "error";

export type TVariantType = "solid" | "outline";

export type TState = "default" | "loading";

export type TInputExtend = {
  size?: TSize;
  status?: Omit<TVariant, "primary" | "secondary">;
};

export type TInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
> &
  TInputExtend;

export type TInputSpecial = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "type" | "placeholder"
> &
  TInputExtend;

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Omit<TVariant, "default" | "info">;
  size?: TSize;
  variantType?: TVariantType;
  href?: string;
  state?: TState;
  fullWidth?: boolean;
};

export type TInputMolecule = {
  label?: string;
  message?: string;
  text?: string;
};

export type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  disabled?: boolean;
} & TInputExtend;

export type TMessage = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  TInputExtend;
export type TControlledInput<T extends FieldValues> = UseControllerProps<T> &
  TInput &
  TInputMolecule;

export type TControlledInputSpecial<T extends FieldValues> =
  UseControllerProps<T> & TInputSpecial & TInputMolecule;

export type TFieldSet = Omit<DetailedHTMLProps<any, any>, "size" | "type"> &
  TInputExtend &
  Pick<InputHTMLAttributes<HTMLInputElement>, "type">;

export type TForm = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
export * from './style';
export type TMetaResponse<T = null | undefined> = {
  message?: string;
  data?: T;
  meta?: {
    total?: number;
    totalPage?: number;
    lastPage?: number;
    currentPage?: number;
    perPage?: number;
    prev?: null | number;
    next?: null | number;
  };
};