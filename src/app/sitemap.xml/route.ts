import { SitemapStream, streamToPromise } from "sitemap";
import { NextRequest } from "next/server";
import { allPosts } from "@/src/data";
import { getRequestOrigin } from "@/src/utils/request";
import { allCustomPages } from "@/.contentlayer/generated";

export async function GET(request: NextRequest) {
  const baseUrl = getRequestOrigin(request);
  const smStream = new SitemapStream({
    hostname: baseUrl,
  });
  smStream.write({
    url: "/",
    changefreq: "weekly",
    priority: 0.6,
  });
  const pages = Math.ceil(allPosts.length / 10)
  for (let i = 1; i <= pages; i++) {
    smStream.write({
      url: `/pages/${i}`,
      changefreq: "weekly",
      priority: 0.6,
    });
    smStream.write({
      url: `/archives/${i}`,
      changefreq: "weekly",
      priority: 0.6,
    });
  }
  allCustomPages.forEach((page) => {
    smStream.write({
      url: page.slug,
      changefreq: "weekly",
      priority: 0.6,
    });
  });
  allPosts.forEach((post) => {
    smStream.write({
      url: post._raw.flattenedPath,
      lastmod: new Date(post.modifyTime),
      changefreq: "daily",
      priority: 1,
    });
  });
  smStream.end();
  const sitemap = await streamToPromise(smStream);
  return new Response(sitemap.toString(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
