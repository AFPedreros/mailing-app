import { NextResponse } from "next/server"

import { getNews } from "./get-news"

export async function GET(request: Request) {
//    console.log(request) 
  const news = await getNews("Colombia")
  return NextResponse.json(news, {
    status: 200,
  })
}
