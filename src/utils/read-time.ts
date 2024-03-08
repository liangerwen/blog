type IOptions = {
  text: string;
  wpm: number;
};

export const estimateReadTimeMinutes = (options: IOptions) => {
  const { text, wpm } = options || {};
  const count = text.trim().replace(/\s+/, "").length;
  const time = Math.ceil(count / wpm);
  return time;
};
