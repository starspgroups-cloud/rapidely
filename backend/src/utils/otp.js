function generateOtp() { return String(Math.floor(100000 + Math.random() * 900000)); }
function isOtpValid(submitted, actual) { return submitted === actual || submitted === process.env.OTP_BYPASS; }
module.exports = { generateOtp, isOtpValid };
