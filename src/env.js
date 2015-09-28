import { join } from 'path';


export function packagePath () {
  return join(process.cwd(), 'package.json');
}
