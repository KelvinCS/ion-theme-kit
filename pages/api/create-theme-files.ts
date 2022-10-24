
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {exec} from 'child_process'

import fs from 'fs-extra'
import fsExtra from 'fs-extra'
import { createThemeIDXMLContent } from '../../src/helpers/createThemeIDXML'
import { createSettingsFileContent } from '../../src/helpers/createSettingsFileContent'
import JSZip from 'jszip';

type Data = {
  downloadLink: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {variables, config} = req.body
  console.info(req.body)

  const dirName = config.themeName.split(' ').join('_')

  const workingDir = `./working-dir/${dirName}`
  const outputDir = `./outputs/${dirName}`

  const themeIDXMLFileContent = createThemeIDXMLContent(config) 
  const settingsFile = createSettingsFileContent(variables)
  const webfontsFile = fs.readFileSync('./src/main/config/master-theme/webfonts.txt')

  try {
    await fs.rmdir(workingDir)
    await fs.rmdir(outputDir)
  } catch {
    console.log('Coundnt delete files')
  }

  await fs.ensureDir(workingDir)
  await fs.ensureDir(outputDir)

  await fsExtra.copy('./src/main/config/master-theme', workingDir)
  await fsExtra.writeFile(`${workingDir}/settings.less`, settingsFile)

  await new Promise((resolve) => {
    const command = `npx lessc --js ${workingDir}/theme.less ${outputDir}/theme.css`
    const child = exec(command, console.log)
    child.stdout?.on('data', console.log)
    child.on('exit', resolve)
  })

  await fsExtra.writeFile(`${outputDir}/themeID.xml`, themeIDXMLFileContent)
  await fsExtra.writeFile(`${outputDir}/webfonts.txt`, webfontsFile)

  const zip = new JSZip()

  await zip.file(`themeID.xml`, fs.readFileSync(`${outputDir}/themeID.xml`))
  await zip.file(`webfonts.txt`, fs.readFileSync(`${outputDir}/webfonts.txt`))
  await zip.file(`theme.css`, fs.readFileSync(`${outputDir}/theme.css`))

  await new Promise<void>((resolve) => {
    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(`${outputDir}/${dirName}.zip`))
    .on('finish', resolve)
  })

  res.json({ downloadLink: `http://localhost:3000/api/download-theme?theme=${dirName}` })
}
