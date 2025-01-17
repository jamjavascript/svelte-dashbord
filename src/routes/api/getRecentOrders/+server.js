import Instagram from "../../../assets/svg/insta.svg";
import X from "../../../assets/svg/x.svg";
import Eventbrite from "../../../assets/svg/Eventbrite.svg";
import Facebook from "../../../assets/svg/facebook.svg";
import Avatar from "../../../assets/svg/Avatar.svg";

export async function GET() {
  return new Response(
    JSON.stringify([
      {
        id: 1,
        orderId: "#01",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Instagram", image: Instagram },
        orderTotal: "$84",
      },
      {
        id: 2,
        orderId: "#02",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Twitter / X", image: X },
        orderTotal: "$84",
      },
      {
        id: 3,
        orderId: "#03",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Instagram", image: Instagram },
        orderTotal: "$84",
      },
      {
        id: 4,
        orderId: "#04",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Eventbrite", image: Eventbrite },
        orderTotal: "$84",
      },
      {
        id: 5,
        orderId: "#05",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Facebook", image: Facebook },
        orderTotal: "$84",
      },
      {
        id: 6,
        orderId: "#06",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Instagram", image: Facebook },
        orderTotal: "$84",
      },
      {
        id: 7,
        orderId: "#07",
        date: "Fri, Jul 26, 2024",
        show: { name: "Jetpack Comedy", image: Avatar },
        customer: "Melissa Crew",
        no_tickets: "6",
        channel: { name: "Instagram", image: Instagram },
        orderTotal: "$84",
      },
      {
        id: 8,
        orderId: "#08",
        date: "Sat, Aug 10, 2024",
        show: { name: "Night Owl Comedy", image: Avatar },
        customer: "Jake Peralta",
        no_tickets: "4",
        channel: { name: "Eventbrite", image: Eventbrite },
        orderTotal: "$48",
      },
      {
        id: 9,
        orderId: "#09",
        date: "Sun, Sep 15, 2024",
        show: { name: "Laugh Fiesta", image: Avatar },
        customer: "Amy Santiago",
        no_tickets: "3",
        channel: { name: "Facebook", image: Facebook },
        orderTotal: "$36",
      }
    ])
  );
}
