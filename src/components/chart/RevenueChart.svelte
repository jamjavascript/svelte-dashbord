<script>
  import { scaleTime, scaleOrdinal } from "d3-scale";
  import { format as formatDate } from "date-fns";
  import { Chart, Svg, Axis, Spline, Highlight, Tooltip } from "layerchart";

  const data = [
    { date: new Date(2025, 0, 1), value: 1000, category: "Total Revenue" },
    { date: new Date(2025, 0, 2), value: 2000, category: "Total Revenue" },
    { date: new Date(2025, 0, 3), value: 1500, category: "Total Revenue" },
    { date: new Date(2025, 0, 4), value: 3000, category: "Total Revenue" },
    { date: new Date(2025, 0, 5), value: 5000, category: "Total Revenue" },
    { date: new Date(2025, 0, 1), value: 3000, category: "Previous Period" },
    { date: new Date(2025, 0, 2), value: 1000, category: "Previous Period" },
    { date: new Date(2025, 0, 4), value: 2800, category: "Previous Period" },
    { date: new Date(2025, 0, 5), value: 2000, category: "Previous Period" },
  ];

  const dataByCategory = Object.entries(
    data.reduce((acc, d) => {
      if (!acc[d.category]) acc[d.category] = [];
      acc[d.category].push(d);
      return acc;
    }, {})
  );

  const categoryColors = {
    "Total Revenue": "#3F83F8",
    "Previous Period": "#3F83F8",
  };
</script>

<div class="h-[300px] px-5 pt-4">
  <Chart
    {data}
    x="date"
    xScale={scaleTime()}
    y="value"
    yDomain={[0, null]}
    yNice
    c="category"
    cScale={scaleOrdinal()}
    cDomain={Object.keys(categoryColors)}
    cRange={Object.values(categoryColors)}
    padding={{ left: 16, bottom: 24, right: 48 }}
    tooltip={{ mode: "voronoi" }}
    let:cScale
  >
    <Svg>
      <Axis
        placement="left"
        grid
        rule
        format={(d) => `$${d.toLocaleString()}`}
      />
      <Axis placement="bottom" format={(d) => formatDate(d, "MMM dd")} rule />
      {#each dataByCategory as [category, data]}
        {@const color = cScale?.(category)}
        <Spline
          {data}
          stroke={color}
          class="stroke-[2]"
          style="stroke-dasharray: {category === 'Previous Period'
            ? '4,4'
            : 'none'}"
        />
      {/each}
      <Highlight points lines />
    </Svg>

    <Tooltip.Root let:data>
      <Tooltip.Header>{formatDate(data.date, "eee, MMM dd")}</Tooltip.Header>
      <Tooltip.List>
        <Tooltip.Item
          label={data.category}
          value={`$${data.value.toLocaleString()}`}
        />
      </Tooltip.List>
    </Tooltip.Root>
  </Chart>
</div>

<div class="flex items-center space-x-3 pt-3">
  <div class="flex items-center space-x-1">
    <div class="w-5 h-[2px] bg-[#3F83F8]"></div>
    <span class="text-gray-500 font-medium text-xs">Total Revenue</span>
  </div>
  <div class="flex items-center space-x-1">
    <div class="w-5 border-t-2 border-dashed border-[#3F83F8]"></div>
    <span class="text-gray-500 font-medium text-xs">Previous Period</span>
  </div>
</div>
