export default function handler(req, res) {
  const { key } = req.query;

  const data = {
    keys: {
      caca: {
        status: "success",
        days_remaining: 13371337,
        reason: "Login successful - welcome caca"
      },
      default: {
        status: "invalid",
        days_remaining: 0,
        reason: "Invalid key"
      }
    }
  };

  // Jika ada query parameter ?key=...
  if (key) {
    const result = data.keys[key] || data.keys.default;
    return res.status(200).json(result);
  }

  // Jika diakses langsung tanpa query (root URL)
  return res.status(200).json(data.keys.caca);
}
