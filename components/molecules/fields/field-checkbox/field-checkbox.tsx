
import { InputCheckbox } from '@/components/atoms';
import { Fieldset } from '@/components/templates';
import { TInputSpecial } from '@/entities';
import { FC, ReactElement } from 'react';

export const FieldCheckbox: FC<TInputSpecial> = (props): ReactElement => {
  return (
    <Fieldset type="checkbox" {...props}>
      <InputCheckbox {...props} />
    </Fieldset>
  );
};
