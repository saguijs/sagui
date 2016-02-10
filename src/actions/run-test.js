import KarmaServer from 'karma/lib/server'

export default function runTest ({ karmaConfig }) {
  new KarmaServer(karmaConfig).start()
}
