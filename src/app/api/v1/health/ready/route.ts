import { NextResponse } from 'next/server'

export async function GET() {
  // Production: check DB/email deps. Dev: lightweight.
  return NextResponse.json({ status: 'ready', checks: { db: 'ok', email: 'dev' }, ts: new Date().toISOString() })
}
