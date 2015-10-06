import { buildConfig as buildWebpackConfig } from '../src/webpack-config-builder';
import { buildConfig as buildKarmaConfig } from '../src/karma-config-builder';
import { projectPath, saguiPath } from '../src/env';
import KarmaServer from 'karma/lib/server';


export function run (parameters) {
  const watch = parameters.includes('--watch');

  const webpackConfig = buildWebpackConfig({
    saguiPath: saguiPath(),
    projectPath: projectPath(),
    watch: watch
  });

  const karmaConfig = buildKarmaConfig({
    webpackConfig,
    saguiPath: saguiPath(),
    projectPath: projectPath(),
    watch: watch
  });

  new KarmaServer(karmaConfig).start();
}
