
export async function rateLimit(c: any, key: string, limit = 20) {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown'
  const kvKey = `rate:${key}:${ip}`

  const current = Number(await c.env.STORE_KV.get(kvKey) || 0)

  if (current >= limit) {
    return new Response('Too many requests', { status: 429 })
  }

  await c.env.STORE_KV.put(kvKey, String(current + 1), {
    expirationTtl: 60
  })

  return null
}
