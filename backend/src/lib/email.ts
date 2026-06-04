
export async function sendEmail(env: any, to: string, subject: string, html: string) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'RapiDely <orders@rapidely.in>',
      to,
      subject,
      html
    })
  })
}

export const otpTemplate = (otp: string) => `
<div style="font-family:sans-serif">
<h1>RapiDely OTP Verification</h1>
<p>Your OTP is:</p>
<h2>${otp}</h2>
<p>Valid for 10 minutes.</p>
</div>
`
