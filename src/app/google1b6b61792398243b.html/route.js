export const dynamic = 'force-static';

export function GET() {
  return new Response("google-site-verification: google1b6b61792398243b.html", {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
