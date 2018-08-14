import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ForceGraph2D} from "react-force-graph";
import { interpolateSpectral } from 'd3-scale-chromatic';
import {
  selectNode,
} from '../ducks/modules/graph';

class GraphPanel extends Component {
  constructor(props) {
    super(props);
  }
  getColorFunc() {
    const val=this.props.colorBy;
    console.log(val);
    const colorVals=this.props.graph.nodes.map(n=>n.summary[val]);
    console.log(colorVals);
    const min = Math.min(...colorVals);
    const max = Math.max(...colorVals);
    const scale = max - min;
    console.log([min,max,scale]);
    const f = (d) => interpolateSpectral((d.summary[val] - min)/scale);
    console.log(this.props.graph.nodes.map(f));
    return f
  } 

  render() {
    return (
    <ForceGraph2D 
      width={this.props.width}
      graphData={this.props.graph}
      backgroundColor='#002b36'
      nodeLabel='id'
      nodeColor={this.getColorFunc()}
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
