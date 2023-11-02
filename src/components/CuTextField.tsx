import { SxProps, TextField } from '@mui/material'
import React from 'react'

// react-hook-form을 사용하는 것을 가정하고 코드를 작성하였습니다.
// label prop을 제공하지 않을 시 필수적으로 CuTextFieldLabel을 사용하고 id를 제공해주세요
const CuTextField = ({
  id,
  field,
  variant,
  style,
  label,
  autoComplete,
  fullWidth,
  error,
  placeholder,
  inputProps,
  multiline,
  rows,
  maxRows,
  minRows,
  InputProps,
  type,
  disabled,
}: {
  id?: string
  field?: any
  variant?: string
  style?: SxProps
  label?: string
  autoComplete?: string
  fullWidth?: boolean
  error?: boolean
  placeholder?: string
  inputProps?: any
  multiline?: boolean
  rows?: number
  maxRows?: number
  minRows?: number
  InputProps?: any
  type?: string
  disabled?: boolean
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      id={id}
      {...field}
      fullWidth={fullWidth}
      error={error}
      sx={style}
      autoComplete={autoComplete}
      placeholder={placeholder}
      inputProps={inputProps}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      InputProps={InputProps} // endAdornment 등을 사용하고 싶을 때 사용 ex TextField에 버튼 같은 요소를 넣고 싶을 때 사용합니다.
      type={type}
      disabled={disabled}
    />
  )
}

export default CuTextField
