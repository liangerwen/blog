export const parse = <T>(str: string) => {
  try {
    return JSON.parse(str) as T;
  } catch {
    return str as T;
  }
};

export const stringify = (v: any) => JSON.stringify(v);
