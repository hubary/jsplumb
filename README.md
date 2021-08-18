# custom-jsplumb

对src/connectors-flowchart.js进行修改,添加了`customEndHeightConvert`方法,修改了`addSegment` ,用于解决如图所示问题

* custom before
![custom before](/img/hubary-before.png)

* custom after
![custom after](/img/hubary-after.png)

```bash
# 相关配置
{
  anchor: ["Bottom", "Top"],
  connector: [
    "Flowchart",
    {
      alwaysRespectStubs: false,
      stub: 20,
      customEnd: true,
      customEndHeight: 20,
    },
  ],
  endpoint: "Blank",
  paintStyle: { stroke: "#999", strokeWidth: 2 },
  overlays: [["Arrow", { width: 8, length: 8, location: 1 }]],
};
```
