import { data } from "./upcomingEventsData";

export function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
