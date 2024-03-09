import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, InputProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type InputStyles = 'filled' | 'outlined' | 'standard';

export interface InputFieldProps extends React.ComponentProps<'input'> {
  inputFieldClass?: string;
  labelClass?: string;
  label?: string;
  errorMessage?: string;
  required?: boolean;
  variant?: InputStyles;
  inputProps?: InputProps;
  setFormikFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  testId?: string;
  register?: any;
  errorMessageClass?: string;
  bgColor?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  onChange,
  onBlur,
  inputFieldClass,
  type = 'text',
  variant = 'outlined',
  label,
  required = false,
  id,
  name,
  disabled = false,
  errorMessage,
  placeholder,
  value = '',
  inputProps = {},
  setFormikFieldValue,
  register,
  bgColor = '#fff'
}) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    setFieldValue(value);
    if (setFormikFieldValue && name) {
      setFormikFieldValue(name, value);
    }
  }, [value, name, setFormikFieldValue]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputPropsWithPasswordToggle: InputProps = type === 'password' ? {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  } : {};

  return (
    <TextField
      fullWidth
      value={fieldValue}
      onChange={handleChange}
      onBlur={onBlur}
      className={inputFieldClass}
      type={showPassword ? 'text' : type}
      label={label}
      variant={variant}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      id={id}
      name={name}
      inputRef={register}
      InputProps={{
        ...inputProps,
        ...inputPropsWithPasswordToggle,
      }}
      error={Boolean(errorMessage)}
      sx={{ backgroundColor: bgColor, borderRadius: '4px' }}
      helperText={errorMessage}
    />
  );
};
