
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import less from 'less'
import {exec} from 'child_process'

import fs from 'fs'
import fsExtra from 'fs-extra'
import { createThemeIDXMLContent } from '../../src/helpers/createThemeIDXML'
import { createSettingsFileContent } from '../../src/helpers/createSettingsFileContent'

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const settingsFile = fs.readFileSync('./src/main/config/master-theme/settings.less', {
  //   encoding: 'utf8'
  // })

  // const themeFile = fs.readFileSync('./src/main/config/master-theme/theme.less', {
  //   encoding: 'utf8'
  // })

  // const {variables, config} = req.body

  // console.log(config)
  // const lines = settingsFile.split('\n')

  // const result = lines.reduce((content, line) => {
  //   const variableName = line.split(':')[0]
  //   const newValue = variables[variableName]

  //   if (newValue) {
  //     content += `${variableName}: ${newValue}\n`
  //   } else {
  //     content += `${line}\n`
  //   }

  //   return content
  // }, "")

  // const compiler = new Promise((resolve) => {
  //   const child = exec('npx lessc --js ./src/main/config/master-theme/theme.less ./src/main/config/teste/theme.css')
  //   child.on('exit', resolve)

  // })

  // await compiler

  const {variables, config} = req.body

  const themeIDXMLFileContent = createThemeIDXMLContent(config) 
  const settingsFile = createSettingsFileContent(variables)
  const webfontsFile = fs.readFileSync('./src/main/config/master-theme/webfonts.txt')

  await fsExtra.copy('./src/main/config/master-theme', './working-dir')
  await fsExtra.writeFile('./working-dir/settings.less', settingsFile)

  await new Promise((resolve) => {
    const child = exec('npx lessc --js ./working-dir/theme.less ./outputs/theme.css')
    child.on('exit', resolve)
  })

  // await fsExtra.writeFile('./outputs/themeID.xml', themeIDXMLFileContent)
  // await fsExtra.writeFile('./outputs/webfonts.txt', webfontsFile)


  // masterThemeFiles.forEach((filename) => 
  //   fs.copyFileSync(`./src/main/config/master-theme/${filename}`, './src/working-dir/')
  // )

  // less.render('', { paths: ['./src/main/config/master-theme/'] })


  res.setHeader('Content-Disposition', 'attachment; filename=theme.css')
  res.send('sdfas' as any)
}
