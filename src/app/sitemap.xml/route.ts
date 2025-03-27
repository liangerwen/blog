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

  allCustomPages.forEach((page) => {
    smStream.write({
      url: page.slug,
      changefreq: "weekly",
      priority: 1,
    });
  });

  allPosts.forEach((post) => {
    smStream.write({
      url: post._raw.flattenedPath,
      lastmod: new Date(post.modifyTime),
      changefreq: "weekly",
      priority: 0.7,
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
