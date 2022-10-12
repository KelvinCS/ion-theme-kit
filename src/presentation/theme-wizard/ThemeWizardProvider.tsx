import React, {useEffect, useMemo, useState} from 'react';
import {TWizardStep, TWizardStepField, TWizardStepSection} from "../../domain/entities/wizard-step";
import {wizardSteps} from "../../main/config/wizard-steps";

export type TWizardStepWithState = TWizardStep & {
  fields?: Array<TWizardStepField & {
    value?: string
  }>,
  sections?: Array<TWizardStepSection & {
    value?: string
  }>,
}

export type TThemeWizardProviderState = {
  steps: TWizardStepWithState[],
  setFieldState: (variableName: string, value: any) => void,
}

export type TThemeWizardProviderProps = {
  children: JSX.Element;
}

const initialValue: TThemeWizardProviderState = {
  steps: [],
  setFieldState: () => null
}

export const ThemeWizardContext = React.createContext<TThemeWizardProviderState>(initialValue)

export const ThemeWizardProvider = ({children}: TThemeWizardProviderProps) => {

  const [stepsState, setStepsState] = useState<Record<string, string>>({})

  const setFieldState = (variableName: string, value: any) => {
    setStepsState((state) => ({
      ...state,
      [variableName]: value,
    }))
  }

  useEffect(() => {
    console.log(stepsState)
  }, [stepsState])

  const steps: TWizardStepWithState[] = useMemo(() => {
    return wizardSteps.map((step) => {
      const result = { ...step };

      const fields = step.fields?.map((field) => ({
        ...field,
          value: stepsState[field.variableName] || field.defaultValue,
      }))

      if (fields?.length) result.fields = fields;

      const sections = step.sections?.map((section) => ({
        ...section,
        fields: section.fields.map((field) => ({
          ...field,
          value: stepsState[field.variableName] || field.defaultValue
        }))
      }))

      if (sections?.length) result.sections = sections;

      return result;

    })
  }, [stepsState])

  return (
    <ThemeWizardContext.Provider value={{
      setFieldState,
      steps
    }}>
      {children}
    </ThemeWizardContext.Provider>
  )
}