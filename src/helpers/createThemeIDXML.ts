import { TSendWizardConfig } from "../api/wizard"

export const createThemeIDXMLContent = (config: TSendWizardConfig) => (
  `
<?xml version="1.0" encoding="utf-8"?> 
<Theme_properties> 
 <label>${config.themeName}</label> 
 <description>${config.description}</description> 
 <responsive>${config.responsive}</responsive>
 <supportsgrid>${config.supportsGrid}</supportsgrid> 
</Theme_properties>
  `
)