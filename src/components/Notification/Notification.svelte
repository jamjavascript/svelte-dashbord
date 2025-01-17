<script>
  import Card from "../UpComingEventsCards/index.svelte";
  import NotificationGroup from "./NotificationGroup.svelte";
  export let notifications = [];
</script>

<Card title="Notifications" link="/">
  <NotificationGroup {notifications} />
</Card>
