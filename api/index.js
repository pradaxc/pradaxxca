export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const database = {
    caca: {
      status: "success",
      days_remaining: "13371337",
      reason: "Login successful - welcome caca"
    },
    default: {
      status: "invalid",
      days_remaining: "0",
      reason: "Invalid key"
    }
  };

  const key = req.query.key || (req.body && req.body.key);

  // Jika menyertakan parameter ?key=...
  if (key) {
    const result = database[key] || database.default;
    return res.status(200).json(result);
  }

  // Jika domain diakses polos tanpa parameter
  return res.status(200).json(database.caca);
}
