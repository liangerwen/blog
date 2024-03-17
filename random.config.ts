const configs = {
  pc: [
    "https://t.mwm.moe/ycy",
    "https://t.mwm.moe/moez",
    "https://t.mwm.moe/ai",
    "https://t.mwm.moe/ysz",
    "https://t.mwm.moe/pc",
    "https://t.mwm.moe/moe",
    "https://t.mwm.moe/fj",
    "https://t.mwm.moe/ys",
  ],
  mp: [
    "https://t.mwm.moe/mp",
    "https://t.mwm.moe/moemp",
    "https://t.mwm.moe/ysmp",
    "https://t.mwm.moe/aimp",
  ],
  avatar: [
    "https://t.mwm.moe/lai",
    "https://t.mwm.moe/tx",
    "https://t.mwm.moe/xhl",
  ],
} as const;

type DataType = {
  code: number;
  url: string;
  width: number;
  height: number;
};

export default async function getRandomImageUrl(type: keyof typeof configs) {
  const cfg = configs[type];
  const idx = Math.floor(Math.random() * cfg.length);
  const url = `${cfg[idx]}?json`;
  const res = await fetch(url);
  const data = (await res.json()) as DataType;
  if (data && data.code === 200) return data.url;
  return cfg[idx];
}
