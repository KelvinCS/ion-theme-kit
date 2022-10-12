import React from 'react'
import {TWizardStepField} from "../../domain/entities/wizard-step";
import {Box, ColorPicker, FormLabel, Input} from "@reverb-ui/react";

export type TStepFieldProps = {
  field: TWizardStepField;
  onChange: (value: any) => void;
}

export const StepField = ({field, onChange}: TStepFieldProps) => {

  return (
    <Box>
      <FormLabel>{field.name}</FormLabel>
      {field.type === 'color' ? (
        <ColorPicker
          inputProps={{ bg: 'white' }}
          onChange={(color) => onChange(color)}
          value={field.value}
        />
      ):(
        <Input
          bg="white"
          type={field.type}
          value={field.value}
          onChange={({ target }) => onChange(target.value)}
        />
      )}
    </Box>
  )
}