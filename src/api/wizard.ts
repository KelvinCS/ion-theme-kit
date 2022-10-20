import axios from 'axios'

export const ApiClient = axios.create({
  baseURL: 'http://localhost:3000/api'
}) 

export type TSendWizardConfig = {
  themeName?: string;
  description?: string;
  responsive?: boolean;
  supportsGrid?: boolean;
}

export type TSendWizardParams = {
  variables: Record<string, string>;
  config: TSendWizardConfig;
}

export const sendWizard = ({ variables, config }: TSendWizardParams) => {
  return ApiClient.post('/create-theme-files', {
    variables,
    config
  })
}
