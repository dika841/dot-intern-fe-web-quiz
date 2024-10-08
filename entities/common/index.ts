import type {
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { AxiosError } from "axios";
import { IQuestion } from "@/services/opentb/interface";
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
export interface QuizState {
  token: string | null;
  questions: IQuestion[];
  currentQuestionIndex: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  totalQuestionsAnswered: number;
  timeLeft: number;
}
export * from "./style";
