import 'dotenv/config'
import buildConfig from '../src/payload.config'

async function run() {
  const built = typeof buildConfig === 'function' ? await (buildConfig as any)() : buildConfig
  console.log('typeof built:', typeof built)
  console.log('has collections:', Array.isArray((built as any).collections), 'len:', (built as any).collections?.length)
  console.log('secret:', (built as any).secret ? 'SET' : 'MISSING')
  console.log('typescript:', JSON.stringify((built as any).typescript))
  console.log('db adapter:', (built as any).db?.name || (built as any).db?.constructor?.name || typeof (built as any).db)
  process.exit(0)
}

run().catch((e) => {
  console.error('BUILD ERROR:', e)
  process.exit(1)
})
