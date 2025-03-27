export interface GenerateRebotsOptions {
  userAgent: string;
  allow: string | string[];
  disallow: string | string[];
  sitemap: string;
}

export const generateRebots = (opt: Partial<GenerateRebotsOptions>) => {
  const options: GenerateRebotsOptions = Object.assign(
      {
        useragent: "*",
        allow: [],
        disallow: [],
        sitemap: null,
      },
      opt
    ),
    configuration = [`User-Agent: ${options.userAgent}`];

  if (options.allow) {
    options.allow = Array.isArray(options.allow)
      ? options.allow
      : [options.allow];
    options.allow.forEach((a) => configuration.push(`Allow: ${a}`));
  }
  if (options.disallow) {
    options.disallow = Array.isArray(options.disallow)
      ? options.disallow
      : [options.disallow];
    options.disallow.forEach((a) => configuration.push(`Disallow: ${a}`));
  }
  if (options.sitemap) {
    configuration.push(`\nSitemap: ${options.sitemap}`);
  }
  return configuration.join("\n");
};
