import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'khaithien-v3', ts: new Date().toISOString() })
}
