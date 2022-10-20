import fs from 'fs'

export const createSettingsFileContent = (variables: Record<string, string>) => {
  const defaultSettingsFile = fs.readFileSync('./src/main/config/master-theme/settings.less', {
    encoding: 'utf8'
  })


  const lines = defaultSettingsFile.split('\n')

  const newFile = lines.reduce((content, line) => {
    const variableName = line.split(':')[0]
    const newValue = variables[variableName]

    if (newValue) {
      content += `${variableName}: ${newValue};\n`
    } else {
      content += `${line}\n`
    }

    return content
  }, "")

  return newFile;

}
