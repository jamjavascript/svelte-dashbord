import Avatar from "../../../assets/svg/Avatar.svg";

export async function GET() {
  return new Response(
    JSON.stringify({
      notifications: [
        {
          id: "2",
          profile_image: Avatar,
          user_name: "Andy Peters",
          action_text: "declined for",
          show_name: "Jest Quest",
          status: "performer declined",
          message: null,
          time: "2025-01-15T17:00:00",
          status_icon: "src/assets/icons/declined.svg"
        },
        {
          id: "6",
          profile_image: Avatar,
          user_name: "The Jetpack Comedy Show",
          action_text: "just sold out",
          status: "show sold out",
          message: null,
          time: "2025-01-15T10:15:00",
          status_icon: "src/assets/icons/sold.svg"
        },
        {
          id: "1",
          profile_image: Avatar,
          user_name: "Grace Lusk",
          action_text: "confirmed for",
          show_name: "Jest Quest",
          status: "message sent",
          message: "Can I go up early? I have another show at...",
          time: "2025-01-16T10:30:00",
          status_icon: "src/assets/icons/confirmed.svg"
        },
        {
          id: "5",
          profile_image: Avatar,
          user_name: "Jest Quest",
          action_text: "Jetpack Comedy is sold out",
          status: "show sold out",
          message: "Ticket sales are now open",
          time: "2025-01-15T11:00:00",
          status_icon: "src/assets/icons/sold.svg"
        },
        {
          id: "3",
          profile_image: Avatar,
          user_name: "All Performers",
          action_text: "confirmed for",
          show_name: "Jest Quest",
          status: "event is fully booked",
          message: "4/4 spots confirmed",
          time: "2025-01-15T15:00:00",
          status_icon: "src/assets/icons/confirmed.svg"
        },
        {
          id: "4",
          profile_image: Avatar,
          user_name: "Jest Quest",
          action_text: "has been published",
          status: "event is now published",
          message: "Ticket sales are now open",
          time: "2025-01-15T12:45:00",
          status_icon: "src/assets/icons/published.svg"
        },
        {
          id: "7",
          profile_image: Avatar,
          user_name: "6 VIP tickets",
          action_text: "sold for",
          show_name: "The Black Lady Sketch Show",
          status: "ticket sold",
          message: "85/100 sold",
          time: "2025-01-15T09:30:00",
          status_icon: "src/assets/icons/cart.svg"
        },
        {
          id: "8",
          profile_image: Avatar,
          user_name: "New Performer",
          action_text: "just confirmed for",
          show_name: "New Year Comedy Show",
          status: "ticket sold",
          message: "New Year's tickets selling fast!",
          time: "2025-01-17T12:08:34",
          status_icon: "src/assets/icons/confirmed.svg"
        }
      ]
    })
  );
}
