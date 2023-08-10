import React, { useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [mychart, setChart] = useState(null);

  function addNode(node) {
    console.log(node)
    mychart.addNode(node);
    mychart.render();
  }
  function deleteNode(node){
    if(node.nodeId !== "0"){
      mychart.removeNode(node.nodeId)
    } else{
      alert("le node parent ne peut pas être supprimer")
    }
    mychart.render();
  }
  props.setClick(addNode);
  props.setDeletefonction(deleteNode);
  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (d3Container.current) {
      const chart = new OrgChart();
      chart
        .container(d3Container.current)
        .data(props.data)
        .svgWidth(500)
        .initialZoom(0.8)
        .rootMargin(100)
          .nodeWidth((d) => 210)
          .nodeHeight((d) => 140)
          .childrenMargin((d) => 130)
          .compactMarginBetween((d) => 75)
          .compactMarginPair((d) => 80)
          .onNodeClick((d, i, arr) => {
            chart.render()
            //props.onNodeClick(d);
            props.deleteNode(d, true)
          })
          .onNodeDrop((source, target)=>{
            console.log(source, target)
            chart.removeNode(source.nodeId)
            chart.addNode({
              "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
              "name": source.name,
              "parentNodeId": target.nodeId,
              "nodeId": source.nodeId,
              "metier": source.metier
            })
            chart.setExpanded(target.nodeId)
            chart.render()
          })
          .nodeContent(function (d, i, arr, state) {
            const colors = [
              '#6E6B6F',
              '#18A8B6',
              '#F45754',
              '#96C62C',
              '#BD7E16',
              '#802F74',
            ];
            const color = colors[d.depth % colors.length];
            const imageDim = 80;
            const lightCircleDim = 95;
            const outsideCircleDim = 110;

            return (`
                <div style="background-color:white; position:absolute;width:${
                  d.width
                }px;height:${d.height}px;">
                   <div style="background-color:${color};position:absolute;margin-top:-${outsideCircleDim / 2}px;margin-left:${d.width / 2 - outsideCircleDim / 2}px;border-radius:100px;width:${outsideCircleDim}px;height:${outsideCircleDim}px;"></div>
                   <div style="background-color:#ffffff;position:absolute;margin-top:-${
                     lightCircleDim / 2
                   }px;margin-left:${d.width / 2 - lightCircleDim / 2}px;border-radius:100px;width:${lightCircleDim}px;height:${lightCircleDim}px;"></div>
                   <img src=" ${
                     d.data.imageUrl
                   }" style="position:absolute;margin-top:-${imageDim / 2}px;margin-left:${d.width / 2 - imageDim / 2}px;border-radius:100px;width:${imageDim}px;height:${imageDim}px;" />
                   <div class="card" style="top:${
                     outsideCircleDim / 2 + 10
                   }px;position:absolute;height:30px;width:${d.width}px;background-color:#3AB6E3;">
                      <div style="background-color:${color};height:28px;text-align:center;padding-top:10px;color:#ffffff;font-weight:bold;font-size:16px">
                          ${d.data.name} 
                      </div>
                      <div style="background-color:#F0EDEF;height:28px;text-align:center;padding-top:10px;color:#424142;font-size:16px">
                          ${d.data.metier} 
                      </div>
                   </div>
               </div>
            `);
      })
          
      .render()
      setChart(chart)
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
