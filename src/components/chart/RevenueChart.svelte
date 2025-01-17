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
    data.reduce((acc, { category, ...rest }) => {
      acc[category] = acc[category] || [];
      acc[category].push(rest);
      return acc;
    }, {})
  );

  const categoryColors = {
    "Total Revenue": "#3F83F8",
    "Previous Period": "#3F83F8",
  };
</script>

<div class="h-[301px] px-5 pt-4">
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
        <Spline
          {data}
          stroke={cScale?.(category)}
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
  {#each Object.entries(categoryColors) as [category, color]}
    <div class="flex items-center space-x-1">
      <div
        class={`w-5 h-[2px] ${
          category === "Previous Period" ? "border-t-2 border-dashed" : "bg"
        }`}
        style="border-color: {color}; background-color: {category !==
        'Previous Period'
          ? color
          : 'transparent'}"
      ></div>
      <span class="text-gray-500 font-medium text-xs">{category}</span>
    </div>
  {/each}
</div>
