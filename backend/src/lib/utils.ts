
export const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString()

export const orderRef = () =>
  `ORD-${Math.floor(10000 + Math.random() * 90000)}`
