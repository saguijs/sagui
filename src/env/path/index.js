import { join } from 'path'

export default function (env) {
  const path = process.env.SAGUI_LINK ? {
    projectPath: process.cwd(),
    saguiPath: join(process.cwd(), 'node_modules/sagui')
  } : {
    projectPath: join(__dirname, '../../../'),
    saguiPath: join(__dirname, '../')
  }

  return { ...env, ...path }
}
