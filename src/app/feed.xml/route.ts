import { NextRequest, NextResponse } from "next/server";
import { Feed } from "feed";
import config from "@/src/config";
import { allPosts } from "@/src/data";
import { getRequestOrigin } from "@/src/utils/request";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = getRequestOrigin(request)
    const feed = new Feed({
      id: baseUrl,
      title: config.title!,
      description: config.description!,
      link: baseUrl,
      language: "zh-CN",
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, ${
        config.name
      }`,
      author: {
        name: config.name,
        link: baseUrl,
      },
    });
    allPosts.forEach((p) => {
      feed.addItem({
        title: p.title,
        id: p.title,
        link: `${baseUrl}/${p._raw.flattenedPath}`,
        date: new Date(p.modifyTime),
        description: p.description,
        content: p.textContent,
        image: p.cover,
        author: [
          {
            name: config.name,
            link: baseUrl,
          },
        ],
        published: new Date(p.createTime),
        copyright: config.name,
      });
    });
    return new NextResponse(feed.rss2(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
