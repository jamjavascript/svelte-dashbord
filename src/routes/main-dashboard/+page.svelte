<script>
  import { onMount } from "svelte";
  import StatsCard from "@/components/Stats/StatsCard.svelte";
  import Card from "@/components/UpComingEventsCards/index.svelte";
  import RevenueChart from "@/components/Chart/RevenueChart.svelte";
  import Table from "@/components/Table/Table.svelte";
  import {
    upComingEventsTableColumn,
    RecentOrderTableColumns,
  } from "./upComingEventsTableColumns";
  import Notification from "@/components/Notification/Notification.svelte";
  import EventsProgress from "@/components/Events/EventsProgress.svelte";
  import UpComingEventCard from "@/components/UpComingEventsCards/UpComingEventCard.svelte";
  import RecentOrderCard from "@/components/UpComingEventsCards/RecentOrderCard.svelte";
  import MultiSelectorButton from "@/components/Button/MultiSelector.svelte";
  import ExportButton from "@/components/Button/Export.svelte";
  import dollar from "@/assets/svg/dollar.svg";
  import ticket from "@/assets/svg/ticket.svg";
  import event from "@/assets/svg/ticket.svg";

  let notifications = [];

  let statsData = [
    {
      name: "Revenue",
      value: "$6,397",
      icon: dollar,
      percentage: 8,
    },
    {
      name: "Ticket Sales",
      value: "100",
      icon: ticket,
      percentage: 1,
    },
    {
      name: "Total events",
      value: "100",
      icon: event,
      percentage: 11,
    },
  ];

  let upComingEventsTableData = [];
  let recentOrderevents = [];

  let isUpComingEventsloading = true;
  let loadingRecentOrder = true;
  let loadingNotification = true;

  async function loadUpcomingEvent() {
    try {
      const response = await fetch("./api/upCommingEvents");
      const data = await response.json();

      upComingEventsTableData = data.upcomingEvents.map((item) => ({
        id: item.id,
        seats: item.seats,
        show: item.eventName,
        email: item.email,
        status: item.status,
        date: item.dateOfPurchase,
        sale: item.sale,
        performers: item.performers,
      }));

      isUpComingEventsloading = false;
    } catch (error) {
      isUpComingEventsloading = false;
      console.error("Failed to load notifications:", error);
    }
  }

  async function loadNotifications() {
    try {
      const response = await fetch("./api/getNotifications");
      const data = await response.json();

      notifications = data.notifications.map((notification) => ({
        id: notification.id,
        name: notification.user_name,
        action: notification.action_text,
        event: notification.show_name,
        message: notification.message,
        time: new Date(notification.time),
        avatar: notification.profile_image,
        statusIcon: notification.status_icon,
        status: notification.status,
      }));

      loadingNotification = false;
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  async function getTransferAll() {
    try {
      const recentOrder = await fetch("./api/getRecentOrders").then((res) => {
        return res.json();
      });
      loadingRecentOrder = false;
      recentOrderevents = [...recentOrder];
    } catch (error) {
      loadingRecentOrder = false;
      console.error("Failed to load Recent Order:", error);
    }
  }

  $: filteredRecentOrderEvents = recentOrderevents?.filter((event) =>
    event?.show?.name?.toLowerCase()
  );

  onMount(async () => {
    await getTransferAll();
  });

  onMount(() => {
    loadUpcomingEvent();
    loadNotifications();
  });

  const topEvents = [
    {
      date: "Jan 19, 2020",
      title: "The Chronicles from Your Journal",
      revenue: 100,
    },
    { date: "Jan 20, 2020", title: "Insights from Your Diary", revenue: 75 },
    {
      date: "Jan 24, 2020",
      title: "The Stories in Your Scribbles",
      revenue: 59,
    },
    { date: "Feb 1, 2020", title: "Whispers from Your Pages", revenue: 40 },
    { date: "Jan 19, 2020", title: "The Secrets in Your Jotter", revenue: 36 },
  ];

  const underperformingEvents = [
    {
      date: "Feb 1, 2020",
      title: "The Reflections in Your Logbook",
      revenue: 20,
    },
    { date: "Jan 24, 2020", title: "The Tales of Your Memoirs", revenue: 28 },
    { date: "Jan 20, 2020", title: "Echoes from Your Notepad", revenue: 32 },
    { date: "Jan 19, 2020", title: "The Secrets in Your Jotter", revenue: 36 },
    { date: "Feb 1, 2020", title: "Whispers from Your Pages", revenue: 40 },
  ];
</script>

<div class="border border-gray-300 rounded-[8px] overflow-hidden">
  <div>
    <div class="py-2 px-4">
      <div class="">
        <h2
          class="lg:font-normal lg:text-xl lg:leading-[30px] font-base font-medium leading-[24px]"
        >
          Dashboard
        </h2>
        <p class="text-xs leading-[18px] text-gray-500 lg:block hidden">
          Last 30 days
        </p>
      </div>
      <div class="lg:hidden block">
        <div class="flex justify-end gap-2 pt-2 pb-1">
          <MultiSelectorButton />
          <ExportButton />
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 border-t border-gray-300 bg-gray-50"
    >
      <div class="flex flex-col gap-8 lg:col-span-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard stats={statsData} />
        </div>
        <div>
          <Card title="Upcoming events" linkText="See all" link="/">
            {#if isUpComingEventsloading}
              <div class="flex justify-center items-center h-screen">
                <div class="loader">
                  <div
                    class="w-5 h-5 border-2 border-gray-200 border-t-2 border-t-blue-500 rounded-full animate-spin"
                  ></div>
                </div>
                <div class="text-lg font-bold text-gray-600 ml-4">
                  Loading...
                </div>
              </div>
            {:else}
              <div class="lg:block hidden">
                <Table
                  columns={upComingEventsTableColumn}
                  showTableHead={false}
                  data={upComingEventsTableData}
                  bordered={false}
                  isRounded={false}
                  searchable={false}
                  styles={{
                    container:
                      "w-full align-left overflow-y-hidden overflow-x-scroll",
                    thead:
                      "text-[14px] text-[#666C79] font-[400] !px-6 leading-[14px]",
                    tr: "text-[34px] text-gray-500 leading-[21px]  border-b border-gray-200",
                    td: " !px-3 text-end",
                  }}
                  classes="!p-0 !px-0 "
                  hasCheckBox={false}
                  keyField="date"
                  hasActions={false}
                />
              </div>
              <div class="lg:hidden">
                <UpComingEventCard events={upComingEventsTableData} />
              </div>
            {/if}
          </Card>
        </div>
        <div>
          <Card
            title="Revenue"
            linkText="See all"
            subtitle="Last 30 days"
            buttons={true}
          >
            <RevenueChart />
          </Card>
        </div>
        <div>
          <Card title="Recent Orders" linkText="See all" link="/">
            {#if loadingRecentOrder}
              <div class="flex justify-center items-center h-screen">
                <div class="loader">
                  <div
                    class="w-5 h-5 border-2 border-gray-200 border-t-2 border-t-blue-500 rounded-full animate-spin"
                  ></div>
                </div>
                <div class="text-lg font-bold text-gray-600 ml-4">
                  Loading...
                </div>
              </div>
            {:else}
              <div class="lg:block hidden">
                <Table
                  columns={RecentOrderTableColumns}
                  data={filteredRecentOrderEvents}
                  bordered={false}
                  isRounded={false}
                  isDraggable={false}
                  searchable={false}
                  screenSize={false}
                  styles={{
                    container:
                      "w-full align-left overflow-hidden overflow-scroll whitespace-nowrap",
                    thead:
                      "text-[12px] leading-[18px] text-gray-500 border-b font-semibold border-gray-200 uppercase bg-gray-50 px-4 py-4 cursor-normal ",
                    tr: "text-[14px] text-gray-500 font-medium leading-[21px]",
                    td: "py-2 border-b border-gray-200",
                    th: "!pr-0",
                  }}
                  keyField="id"
                />
              </div>
              <div class="lg:hidden">
                <RecentOrderCard data={filteredRecentOrderEvents} />
              </div>
            {/if}
          </Card>
        </div>
      </div>
      <div class="flex flex-col gap-4 lg:col-span-4">
        {#if loadingNotification}
          <div class="flex justify-center items-center h-screen">
            <div class="loader">
              <div
                class="w-5 h-5 border-2 border-gray-200 border-t-2 border-t-blue-500 rounded-full animate-spin"
              ></div>
            </div>
            <div class="text-lg font-bold text-gray-600 ml-4">Loading...</div>
          </div>
        {:else}
          <div>
            <Notification {notifications} />
          </div>
        {/if}
        <div>
          <Card title="Top Events" buttons={true} event={true}>
            <EventsProgress events={topEvents} variant="top" />
          </Card>
        </div>
        <div>
          <Card title="Underperforming Events" buttons={true} event={true}>
            <EventsProgress
              events={underperformingEvents}
              variant="underperforming"
            />
          </Card>
        </div>
      </div>
    </div>
  </div>
</div>
