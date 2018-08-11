import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/main.js';
import {ForceGraph2D} from "react-force-graph";
import { interpolateSpectral } from 'd3-scale-chromatic';
import {
  changeGraph,
  selectNode,
} from '../ducks/wsduck.js';

class GraphPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attr_min:Math.min(...props.graph.nodes.map(props.colorBy)),
      attr_min:Math.max(...props.graph.nodes.map(props.colorBy)),
    }
  }
  render() {
    return (
    <ForceGraph2D 
      width={this.props.width}
      graphData={this.props.graph}
      backgroundColor='#002b36'
      nodeLabel='id'
      nodeColor={d => (interpolateSpectral((this.props.colorBy(d) - this.state.attr_min)/(this.state.attr_max-this.state.attr_min)))}
      linkColor={()=>'#eee8d5'}
      onNodeClick={this.props.selectNode}
    />
    )
  }
}

function mapStateToProps(state) {
  return {
    graph: state.graph, // gives our component access to state
    selectedNode: state.selectedNode,
    colorBy: state.colorBy,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeGraph: (graph) => dispatch(changeGraph(graph)),
    selectNode: (node) => dispatch(selectNode(node)),
  }; // here we're mapping actions to props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphPanel);
