import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "../ResizeObserver";

function TreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  
  useEffect( () => {
    const svg = select(svgRef.current)
    if(!dimensions) return;

    const root = hierarchy(data);
    const treeLayout = tree().size([dimensions.height, dimensions.width])
    treeLayout(root);

    console.log(root.descendants());
    console.log(root.links());

    const linkGenerator = linkHorizontal()
      .x(node => node.y)
      .y(node => node.x);

    //nodes
    svg
      .selectAll(".node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("fill", "black")
      .attr("cx", node => node.y)
      .attr("cy", node => node.x)

    //links
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
