import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { ITextInputProps, TextInput } from '../TextInput';

interface FormInputControllerProps<FieldsType extends {}> {
  name: Path<FieldsType>;
  defaultValue?: string;
  rules?: RegisterOptions<FieldsType>;
  error?: FieldError;
  control: Control<FieldsType>;
}

function inController<V extends {}>(Component: any) {
  const WrappedComponent = function ({
    control,
    rules,
    name,
    ...props
  }: FormInputControllerProps<any> & V) {
    return (
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <Component
            onBlur={onBlur}
            onChange={onChange}
            defaultValue={value}
            name={name}
            value={value}
            error={error}
            {...props}
          />
        )}
      />
    );
  };

  WrappedComponent.displayName = `inController(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}

export const FormInput =
  inController<Omit<ITextInputProps, 'onChangeText' | 'value'>>(TextInput);
