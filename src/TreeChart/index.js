import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkVertical } from "d3";
import useResizeObserver from "../ResizeObserver";

function TreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  
  useEffect( () => {
    const svg = select(svgRef.current)
    if(!dimensions) return;

    const root = hierarchy(data);
    const treeLayout = tree().size([dimensions.width, dimensions.height])
    treeLayout(root);

    console.log(root.descendants());
    console.log(root.links());

    const linkGenerator = linkVertical()
      .x(node => node.x)
      .y(node => node.y);

    //nodes
    svg
      .selectAll(".node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("fill", "black")
      .attr("cx", node => node.x)
      .attr("cy", node => node.y)

    //lnks
    svg
      .selectAll(".links")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", linkGenerator)

  }, [data, dimensions])

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default TreeChart;
