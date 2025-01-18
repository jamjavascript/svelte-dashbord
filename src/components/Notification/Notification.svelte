<script>
  import CardHeader from "../UpComingEventsCards/CardHeader.svelte";
  import NotificationGroup from "./NotificationGroup.svelte";
  export let notifications = [];
</script>

<CardHeader title="Notifications" link="/">
  <NotificationGroup {notifications} />
</CardHeader>
