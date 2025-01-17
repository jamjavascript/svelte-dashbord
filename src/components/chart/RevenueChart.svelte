<script>
  import { scaleTime, scaleOrdinal } from "d3-scale";
  import { format as formatDate } from "date-fns";
  import { Chart, Svg, Axis, Spline, Highlight, Tooltip } from "layerchart";

  const data = [
    { date: new Date(2025, 0, 1), value: 5000, category: "Total Revenue" },
    { date: new Date(2025, 0, 3), value: 10500, category: "Total Revenue" },
    { date: new Date(2025, 0, 5), value: 8000, category: "Total Revenue" },
    { date: new Date(2025, 0, 7), value: 7000, category: "Total Revenue" },
    { date: new Date(2025, 0, 9), value: 25000, category: "Total Revenue" },
    { date: new Date(2025, 0, 11), value: 3000, category: "Total Revenue" },
    { date: new Date(2025, 0, 13), value: 2500, category: "Total Revenue" },
    { date: new Date(2025, 0, 15), value: 12000, category: "Total Revenue" },
    { date: new Date(2025, 0, 17), value: 4000, category: "Total Revenue" },
    { date: new Date(2025, 0, 19), value: 3500, category: "Total Revenue" },
    { date: new Date(2025, 0, 21), value: 4000, category: "Total Revenue" },
    { date: new Date(2025, 0, 23), value: 15000, category: "Total Revenue" },
    { date: new Date(2025, 0, 25), value: 12000, category: "Total Revenue" },
    { date: new Date(2025, 0, 27), value: 10000, category: "Total Revenue" },
    { date: new Date(2025, 0, 29), value: 18000, category: "Total Revenue" },
    { date: new Date(2025, 0, 31), value: 7000, category: "Total Revenue" },

    { date: new Date(2025, 0, 1), value: 4000, category: "Previous Period" },
    { date: new Date(2025, 0, 3), value: 3500, category: "Previous Period" },
    { date: new Date(2025, 0, 5), value: 3000, category: "Previous Period" },
    { date: new Date(2025, 0, 7), value: 2500, category: "Previous Period" },
    { date: new Date(2025, 0, 9), value: 3000, category: "Previous Period" },
    { date: new Date(2025, 0, 11), value: 11000, category: "Previous Period" },
    { date: new Date(2025, 0, 13), value: 4000, category: "Previous Period" },
    { date: new Date(2025, 0, 15), value: 4000, category: "Previous Period" },
    { date: new Date(2025, 0, 17), value: 4000, category: "Previous Period" },
    { date: new Date(2025, 0, 19), value: 4500, category: "Previous Period" },
    { date: new Date(2025, 0, 21), value: 11000, category: "Previous Period" },
    { date: new Date(2025, 0, 23), value: 15000, category: "Previous Period" },
    { date: new Date(2025, 0, 25), value: 4000, category: "Previous Period" },
    { date: new Date(2025, 0, 27), value: 3500, category: "Previous Period" },
    { date: new Date(2025, 0, 29), value: 2000, category: "Previous Period" },
    { date: new Date(2025, 0, 31), value: 7000, category: "Previous Period" },
  ];

  const dataByCategory = Object.entries(
    data.reduce((acc, { category, ...rest }) => {
      acc[category] = acc[category] || [];
      acc[category].push(rest);
      return acc;
    }, {})
  );

  const categoryColors = {
    "Total Revenue": "#3B82F6",
    "Previous Period": "#3B82F6",
  };
</script>

<div class="space-y-4">
  <div class="h-[301px]">
    <Chart
      {data}
      x="date"
      xScale={scaleTime()}
      y="value"
      yDomain={[0, 100000]}
      yNice
      c="category"
      cScale={scaleOrdinal()}
      cDomain={Object.keys(categoryColors)}
      cRange={Object.values(categoryColors)}
      padding={{ left: 48, bottom: 24, right: 24, top: 24 }}
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
        <Axis placement="bottom" format={(d) => formatDate(d, "dd MMM")} rule />
        {#each dataByCategory as [category, data]}
          <Spline
            {data}
            stroke={cScale?.(category)}
            class="stroke-[2]"
            style="stroke-dasharray: {category === 'Previous Period'
              ? '4,4'
              : 'none'}; opacity: {category === 'Previous Period'
              ? '0.5'
              : '1'}"
          />
        {/each}
        <Highlight points lines />
      </Svg>

      <Tooltip.Root let:data>
        <Tooltip.Header>
          {formatDate(data.date, "eee, MMM dd")}
        </Tooltip.Header>
        <Tooltip.List>
          <Tooltip.Item
            label={data.category}
            value={`$${data.value.toLocaleString()}`}
          />
        </Tooltip.List>
      </Tooltip.Root>
    </Chart>
  </div>

  <div class="flex items-center gap-4 pt-2">
    {#each Object.entries(categoryColors) as [category, color]}
      <div class="flex items-center gap-2">
        <div
          class="w-4 h-0.5"
          style="background-color: {color}; 
                 {category === 'Previous Period'
            ? 'border-top: 2px dashed #3B82F6; background-color: transparent;'
            : ''}"
        ></div>
        <span class="text-sm text-gray-600">{category}</span>
      </div>
    {/each}
  </div>
</div>
