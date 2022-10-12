import React, {useContext} from 'react'
import {useWizard} from "react-use-wizard";
import {Box, Button, Flex, Grid, Text} from "@reverb-ui/react";
import {ThemeWizardContext, TWizardStepWithState} from "./ThemeWizardProvider";
import {StepField} from "./StepField";

export type TWizardStepProps = {
  step: TWizardStepWithState
}

export const WizardStep = ({ step }: TWizardStepProps) => {
  const { previousStep, nextStep } = useWizard();
  const { setFieldState } = useContext(ThemeWizardContext);

  return (
    <Flex direction="column" gap={3} w="800px" h="600px" overflow="hidden" bg="gray.50" boxShadow="md" rounded="md">
      <Box px={4} py={3} borderBottomWidth={1} bg="white">
        <Text fontSize="xl" fontWeight="bold">{step.name}</Text>
      </Box>
      <Box bg="gray.50" px={8} py={6} flex={1} overflow="auto">
        {step.fields && (
          <Grid templateColumns="repeat(2, 1fr)" gap={6} py={8}>
            {step.fields.map((field) => (
              <StepField
                key={field.name}
                field={field}
                onChange={(color) => setFieldState(
                  field.variableName,
                  color
                )}
              />
            ))}
          </Grid>
        )}
        {step.sections && step.sections.map((section) => (
          <Box key={section.name}>
            <Text fontSize="xl" fontWeight="bold" py={2}>{section.name}</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} pb={8}>
              {section.fields.map((field) => (
                <StepField
                  key={field.name}
                  field={field}
                  onChange={(color) => setFieldState(
                    field.variableName,
                    color
                  )}
                />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      <Flex justifyContent="end" bg="white" py={4} px={6} borderTopWidth={1}>
        <Flex gap={2}>
          <Button onClick={previousStep}>Previous</Button>
          <Button onClick={nextStep}>Next</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}