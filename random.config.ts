const configs = {
  pc: [
    "https://t.alcy.cc/ycy",
    "https://t.alcy.cc/moez",
    "https://t.alcy.cc/ai",
    "https://t.alcy.cc/ysz",
    "https://t.alcy.cc/pc",
    "https://t.alcy.cc/moe",
    "https://t.alcy.cc/fj",
    "https://t.alcy.cc/ys",
  ],
  mp: [
    "https://t.alcy.cc/mp",
    "https://t.alcy.cc/moemp",
    "https://t.alcy.cc/ysmp",
    "https://t.alcy.cc/aimp",
  ],
  avatar: [
    "https://t.alcy.cc/lai",
    "https://t.alcy.cc/tx",
    "https://t.alcy.cc/xhl",
  ],
} as const;

export default async function getRandomImageUrl(type: keyof typeof configs) {
  const cfg = configs[type];
  const idx = Math.floor(Math.random() * cfg.length);
  try {
    const url = `${cfg[idx]}?json`;
    const res = await fetch(url);
    const data = await res.text();
    return data ?? cfg[idx];
  } catch {
    return cfg[idx];
  }
}
