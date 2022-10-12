import React, {useEffect} from 'react'
import {Wizard} from "react-use-wizard";
import {WizardStep} from "./WizardStep";
import {Flex} from "@reverb-ui/react";
import {ThemeWizardContext, ThemeWizardProvider} from "./ThemeWizardProvider";

export const ThemeWizard = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="end"
      h="100vh"
      w="100vw"
      bg="gray.100"
      pb="calc(50vh - 300px)"
    >
      <ThemeWizardProvider>
        <ThemeWizardContext.Consumer>
          {({ steps }) => (
            <Wizard>
              {steps.map((step) => (
                <WizardStep step={step} key={step.name} />
              ))}
            </Wizard>
          )}
        </ThemeWizardContext.Consumer>
      </ThemeWizardProvider>
    </Flex>
  )
}