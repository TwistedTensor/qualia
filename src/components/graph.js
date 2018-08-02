import React from "react";
import PropTypes from "prop-types";
import Websocket from "react-websocket";
import {ForceGraph2D} from "react-force-graph";
import { Column, Row } from 'simple-flexbox';
import { interpolateSpectral } from 'd3-scale-chromatic';
import ReactJson from 'react-json-view'

const Graph = ({graph,wsDispatch,selectedNode,selectNode,colorBy}) => {
  var attr_min = Math.min(...graph.nodes.map(colorBy));
  var attr_max = Math.max(...graph.nodes.map(colorBy));
  console.log(selectedNode);
  return (
  <div>
    <Websocket url='ws://localhost:8888/ws' onMessage={wsDispatch}/>
    <Row 
      vertical='start'
      style={{ backgroundColor: '#073642' }}
    >
      <Column flexGrow={3} horizontal='center'>
        <ForceGraph2D 
          graphData={graph}
          backgroundColor='#002b36'
          nodeLabel='id'
          nodeColor={d => (interpolateSpectral((colorBy(d) - attr_min)/(attr_max-attr_min)))}
          linkColor={()=>'#eee8d5'}
          onNodeClick={selectNode}
        />
      </Column>
      <Column 
        flexGrow={1} 
        horizontal='start' 
      >
        <h3 style={{ color : '#eee8d5' }}>Node details</h3>
        <ReactJson src={selectedNode} theme='solarized'/>
      </Column>
    </Row>
  </div>
);
}
Graph.propTypes = {
    graph:PropTypes.object.isRequired,
    selectedNode:PropTypes.object.isRequired,
    wsDispatch:PropTypes.func.isRequired,
    selectNode:PropTypes.func.isRequired
};

export default Graph;
