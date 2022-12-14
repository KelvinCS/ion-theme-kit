import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Box, Text } from '@reverb-ui/react';
import React, {useEffect, useMemo, useState} from 'react';
import { sendWizard, TSendWizardConfig } from '../../api/wizard';
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
  finishWizard: () => void,
  config: TSendWizardConfig,
  steps: TWizardStepWithState[],
  setFieldState: (variableName: string, value: any) => void,
  setConfigField: (variable: keyof TSendWizardConfig, value: any) => void,
}

export type TThemeWizardProviderProps = {
  children: JSX.Element;
}

const initialValue: TThemeWizardProviderState = {
  steps: [],
  config: {},
  setFieldState: () => null,
  setConfigField: () => null,
  finishWizard: () => Promise<any>,
}

export const ThemeWizardContext = React.createContext<TThemeWizardProviderState>(initialValue)

export const ThemeWizardProvider = ({children}: TThemeWizardProviderProps) => {

  const [stepsState, setStepsState] = useState<Record<string, string>>({})
  const [wizardConfig, setWizardConfig] = useState<TSendWizardConfig>({
    responsive: true,
    supportsGrid: true
  })

  const setFieldState = (variableName: string, value: any) => {
    setStepsState((state) => ({
      ...state,
      [variableName]: value,
    }))
  }

  const setConfigField = (variable: keyof TSendWizardConfig, value: any) => {
    setWizardConfig((config) => ({
      ...config,
      [variable]: value
    }))
  }

  const [downloadLink, setDownloadLink] = useState<string>()

  const {
    isOpen: isDownloadModalOpen,
    onClose: closeDownloadModal,
    onOpen: openDownloadModal
  } = useDisclosure()

  const finishWizard = () => {
    sendWizard({ variables: stepsState, config: wizardConfig })
      .then(({ data }) => setDownloadLink(data.downloadLink))
      .then(() => openDownloadModal())
  }

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
    <ThemeWizardContext.Provider
      value={{
        setFieldState,
        steps,
        finishWizard,
        config: wizardConfig,
        setConfigField,
      }}
    >
      <Box>
        <Modal isOpen={isDownloadModalOpen} onClose={closeDownloadModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>Download link</Text>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <a href={downloadLink}>{downloadLink}</a>
            </ModalBody>
          </ModalContent>
        </Modal>
        {children}
      </Box>
    </ThemeWizardContext.Provider>
  );
}