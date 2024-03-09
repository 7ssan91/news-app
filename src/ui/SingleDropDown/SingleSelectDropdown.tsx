import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type SingleSelectDropdownProps = {
  options: Array<any>;
  optionName?: string;
  optionValue: string;
  selectedValue: any;
  handleChange: (event: any, value: any) => void;
  isDisabled?: boolean;
  placeholder?: string | any;
  renderOption?: (option: any) => React.ReactNode;
  size?: 'medium' | 'small';
  cssStyle?: React.CSSProperties;
  className?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  isError?: boolean,
  errorMsg?: string
};

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  options,
  optionName = '',
  optionValue,
  selectedValue,
  handleChange,
  isDisabled = false,
  placeholder = '',
  renderOption,
  size,
  cssStyle,
  className,
  variant = 'outlined',
  isError = false,
  errorMsg = ''
}) => {
  return (
    <Autocomplete
      ListboxProps={{
        style: {
          maxHeight: 200,
        },
      }}
      className={className}
      id="auto-complete"
      options={options} //array of displayed list
      getOptionLabel={(option: any) => option[optionName] ?? ''} //the string value for a given option
      value={options?.find((el) => el[optionValue] == selectedValue) || null} // passing null to prevent the Autocomplete going into uncontrolled mode
      onChange={(e: any, value: any) => handleChange(e, value)} //callback fires when the value changes
      autoComplete
      renderInput={(params) => (
        <TextField
          sx={{ input: { cursor: 'pointer' } }}
          {...params}
          label={placeholder}
          size={size}
          variant={variant}
          // InputProps={{
          //   ...params.InputProps,
          //   endAdornment: null,
          // }}
          error={isError}
          helperText={errorMsg}
        />
      )}
      disabled={isDisabled}
      renderOption={renderOption} //to render customized list items
      sx={cssStyle}
    />
  );
};

export default SingleSelectDropdown;