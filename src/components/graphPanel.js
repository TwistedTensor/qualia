import React from "react";
import PropTypes from "prop-types";
import Websocket from "react-websocket";
import {ForceGraph2D} from "react-force-graph";
import { interpolateSpectral } from 'd3-scale-chromatic';

const GraphPanel = ({graph,selectedNode,selectNode,colorBy}) => {
  var attr_min = Math.min(...graph.nodes.map(colorBy));
  var attr_max = Math.max(...graph.nodes.map(colorBy));
  return (
    <ForceGraph2D 
      graphData={graph}
      backgroundColor='#002b36'
      nodeLabel='id'
      nodeColor={d => (interpolateSpectral((colorBy(d) - attr_min)/(attr_max-attr_min)))}
      linkColor={()=>'#eee8d5'}
      onNodeClick={selectNode}
    />
  )
}
Graph.propTypes = {
    graph:PropTypes.object.isRequired,
    selectedNode:PropTypes.object.isRequired,
    selectNode:PropTypes.func.isRequired
};

export default GraphPanel;
