import { forwardRef, memo } from 'react';
import { Field, Flex, TextInput, Typography, useComposedRefs } from '@strapi/design-system';
import { useField, useFocusInputField } from '@strapi/strapi/admin';

type CharCountInputProps = {
  hint?: React.ReactNode;
  label?: React.ReactNode;
  labelAction?: React.ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

const CharCountInput = forwardRef<HTMLInputElement, CharCountInputProps>(
  ({ name, required, label, hint, labelAction, maxLength, ...props }, ref) => {
    const field = useField<string>(name);
    const fieldRef = useFocusInputField(name);
    const composedRefs = useComposedRefs(ref, fieldRef);
    const value = field.value ?? '';
    const countLabel =
      typeof maxLength === 'number' ? `${value.length} / ${maxLength}` : `${value.length}`;

    return (
      <Field.Root error={field.error} name={name} required={required}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <TextInput
          ref={composedRefs}
          onChange={field.onChange}
          value={value}
          {...props}
          type="text"
        />
        <Flex justifyContent="space-between" gap={2}>
          <Field.Hint>{hint}</Field.Hint>
          <Typography textColor="neutral600" variant="pi">
            {countLabel} chars
          </Typography>
        </Flex>
        <Field.Error />
      </Field.Root>
    );
  }
);

export default memo(CharCountInput);
