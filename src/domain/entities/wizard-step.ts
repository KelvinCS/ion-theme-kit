export type TWizardStep = {
  name: string;
  sections?: TWizardStepSection[];
  fields?: TWizardStepField[];
}

export type TWizardStepSection = {
  name: string;
  fields: TWizardStepField[];
}

export type TWizardStepField = {
  name: string;
  type: string;
  value?: any;
  defaultValue?: any;
  variableName: string;
}