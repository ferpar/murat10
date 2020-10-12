import React, { useRef, useEffect } from "react";
import { select } from "d3";
import useResizeObserver from "./ResizeObserver";

function TreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = userResizeObserver(wrapperRef);
  
  useEffect( () => {
    const svg = select(svgRef.current)
    if(!dimension) return;
  }, [data, dimensions])

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default TreeChart;
