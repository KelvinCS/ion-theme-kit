
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const {theme} = req.query;

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename=${theme}.zip`)

  const outputDir = `./outputs/${theme}`
  const zipFile = fs.readFileSync(`${outputDir}/${theme}.zip`)

  res.send(zipFile)
}
