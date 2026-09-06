export default function handler(req, res) {
  // Set header JSON dan CORS agar bisa diakses dari script/app eksternal
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ambil parameter dari URL query (GET) atau body (POST)
  const key = req.query.key || (req.body && req.body.key);
  const statusParam = req.query.status;

  // Daftar status respon bawaan
  const responses = {
    success: {
      status: "success",
      days_remaining: 13371337,
      reason: "Login successful - welcome caca"
    },
    banned: {
      status: "banned",
      days_remaining: 0,
      reason: "Key banned, HWID mismatch"
    },
    expired: {
      status: "expired",
      days_remaining: 0,
      reason: "Key expired, please contact owner to renew"
    },
    hwid_mismatch: {
      status: "reject",
      days_remaining: 0,
      reason: "Key already used on another device"
    },
    invalid: {
      status: "invalid",
      days_remaining: 0,
      reason: "Invalid key"
    }
  };

  // Database key pengguna
  const keyDatabase = {
    "caca": responses.success,
    "user_banned": responses.banned,
    "user_expired": responses.expired,
    "user_wrong_hwid": responses.hwid_mismatch
  };

  // 1. Jika query memanggil status langsung: ?status=banned / expired / hwid_mismatch
  if (statusParam && responses[statusParam]) {
    return res.status(200).json(responses[statusParam]);
  }

  // 2. Jika mengecek key: ?key=caca
  if (key) {
    const result = keyDatabase[key] || responses.invalid;
    return res.status(200).json(result);
  }

  // 3. Respon default jika domain diakses polos (https://domain.vercel.app/)
  return res.status(200).json(responses.success);
}
