import { Input } from "@components/ui/input";
import { Field, FieldError } from "@components/ui/field";
import { useFieldContext } from "@hooks/use-field-context";

interface FormInputProps {
  placeholder?: string;
  disabled?: boolean;
}

function FormInput({ placeholder, disabled }: FormInputProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} data-disabled={disabled}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export default FormInput;
