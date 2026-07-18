// Simple in-memory sliding rate limiter keyed by hashed IP (API Contract §9).
// For production, replace with Redis/edge KV. Keeps no raw IP (PII-safe).
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX = 10

export function rateLimited(key: string): boolean {
  const now = Date.now()
  const arr = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS)
  if (arr.length >= MAX) {
    hits.set(key, arr)
    return true
  }
  arr.push(now)
  hits.set(key, arr)
  return false
}

export function hashKey(input: string): string {
  let h = 5381
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0
  return h.toString(16)
}
