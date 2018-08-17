import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ForceGraph2D} from "react-force-graph";
import { interpolateSpectral } from 'd3-scale-chromatic';
import {
  selectNode,
} from '../ducks/modules/graph';

class GraphPanel extends Component {
  getColorFunc() {
    const val=this.props.colorBy;
    const colorVals=this.props.graph.nodes.map(n=>n.summary[val]);
    const min = Math.min(...colorVals);
    const max = Math.max(...colorVals);
    const scale = max - min;
    const f = (d) => interpolateSpectral((d.summary[val] - min)/scale);
    return f
  } 

  getDistFunc() {
    const val = this.props.distBy;
    const linkVals=this.props.graph.links.map(l=>Math.log(l[val]));
    const valMin = Math.min(...linkVals);
    const valMax = Math.max(...linkVals);
    const distMax = 50;
    const distMin = 5;
    const f = (l) => {
        const dist = (valMax - Math.log(l[val]))/(valMax - valMin)*(distMax - distMin)+distMin;
        console.log(dist);
        return dist;
    }
    return f;
  }

  componentDidMount() {
    console.log(this);
    this.fg.d3Force('link').distance(this.getDistFunc());
  }

  render() {
    return (
      <ForceGraph2D 
        ref={el => this.fg = el} // This lets us refer to the graph object as this.fg in componentDidMount
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
