
import { InputText } from '@/components/atoms';
import { Fieldset } from '@/components/templates';
import { TInput, TInputMolecule } from '@/entities';
import { ReactElement, forwardRef } from 'react';


export const FieldText = forwardRef<HTMLInputElement, TInput & TInputMolecule>(
  (props, ref): ReactElement => {
    return (
      <Fieldset {...props}>
        <InputText {...props} ref={ref} />
      </Fieldset>
    );
  }
);
FieldText.displayName = 'FieldText';