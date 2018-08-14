import { connect } from 'react-redux';
import React, { Component } from 'react';
import Websocket from "react-websocket";
import GraphPanel from "../containers/graphPanel";
import ColorBySelector from "../components/colorBySelector";
import ReactJson from 'react-json-view'

import {
      selectNode,
      changeColorBy,
} from '../ducks/modules/graph';

const phiBig = .618;
const phiSmall = .381;
const bkgdCol1 = '#073642';
const bkgdCol2 = '#002b36';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    let mainWidth = this.state.width;
    let mainHeight = this.state.height;
    let graphWidth = phiBig*mainWidth;
    let sideWidth = mainWidth-graphWidth;
    let sideHeight = .5*mainHeight;
    return (
    <div style={{ height:mainHeight,width:mainWidth}}>
      <Websocket url='ws://localhost:8888/ws' onMessage={this.props.wsDispatch}/>
      <div style={{ float:'left' }}>
        <GraphPanel width={graphWidth} height={mainHeight}/>
      </div>
      <div style={{ float:'right',width:sideWidth,height:sideHeight,backgroundColor:bkgdCol1 }}>
        <h3 style={{ color : '#eee8d5' }}>Node details</h3>
        <ReactJson src={this.props.selectedNode} theme='solarized'/>
      </div>
      <div style={{ float:'right',width:sideWidth,height:sideHeight,backgroundColor:bkgdCol2 }}>
        <ColorBySelector value={this.props.colorBy} options={this.props.summaryVars} handleChange={this.props.changeColorBy}/>
      </div>
     </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedNode: state.graph.selectedNode,
    colorBy: state.graph.colorBy,
    summaryVars: state.graph.summaryVars,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeColorBy: (event) => dispatch(changeColorBy(event.target.value)),
    wsDispatch: (message) => {
        var action = JSON.parse(message);
        console.log(message);
        dispatch(action);
    },
  }; // here we're mapping actions to props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
