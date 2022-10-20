
import React, {useContext, useMemo} from 'react'
import {useWizard} from "react-use-wizard";
import {Box, Button, Checkbox, Flex, FormLabel, Grid, Input, Switch, Text} from "@reverb-ui/react";
import {ThemeWizardContext, TWizardStepWithState} from "./ThemeWizardProvider";

export const WizardConfigStep = () => {
  const { previousStep, nextStep, isLastStep } = useWizard();
  const { setConfigField, config, finishWizard } = useContext(ThemeWizardContext);

  const canSubmit = useMemo(() => {
    return !!config.description &&
      !!config.themeName;
  }, [config])

  return (
    <Flex direction="column" gap={3} w="800px" h="600px" overflow="hidden" bg="gray.50" boxShadow="md" rounded="md">
      <Box px={4} py={3} borderBottomWidth={1} bg="white">
        <Text fontSize="xl" fontWeight="bold">Config</Text>
      </Box>
      <Box bg="gray.50" px={8} py={6} flex={1} overflow="auto">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} py={8}>
          <Box>
            <FormLabel>Theme name</FormLabel>
            <Input
              bg="white"
              type="text"
              value={config.themeName}
              onChange={({ target }) => setConfigField('themeName', target.value)}
            />
          </Box>
          <Box>
            <FormLabel>Description</FormLabel>
            <Input
              bg="white"
              type="text"
              value={config.description}
              onChange={({ target }) => setConfigField('description', target.value)}
            />
          </Box>
          <Flex>
            <FormLabel>Responsive</FormLabel>
            <Switch
              isChecked={config.responsive}
              onChange={({ target }) => setConfigField('responsive', target.checked)}
            />
          </Flex>
          <Flex>
            <FormLabel>Supports Grid</FormLabel>
            <Switch
              isChecked={config.supportsGrid}
              onChange={({ target }) => setConfigField('supportsGrid', target.checked)}
            />
          </Flex>
        </Grid>
      </Box>

      <Flex justifyContent="end" bg="white" py={4} px={6} borderTopWidth={1}>
        <Flex gap={2}>
          <Button onClick={previousStep}>Previous</Button>
          <Button isDisabled={!canSubmit} onClick={nextStep}>Next</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}