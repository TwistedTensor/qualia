import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ForceGraph2D} from "react-force-graph";
import { interpolateSpectral } from 'd3-scale-chromatic';
import {
  selectNode,
} from '../ducks/modules/graph';

class GraphPanel extends Component {
  constructor(props) {
    console.log(props);
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
    graph: state.graph.graph, // gives our component access to state
    colorBy: state.graph.colorBy,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectNode: (node) => dispatch(selectNode(node)),
  }; // here we're mapping actions to props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphPanel);
