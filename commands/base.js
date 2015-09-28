import { isInstalled, update } from '../src/install';
import { packagePath } from '../src/env';
import { logWarning } from '../src/log';


if (!isInstalled(packagePath())) {
  logWarning('Package is not installed locally on a project. Exiting...');
  process.exit(0);
};


update(packagePath());
