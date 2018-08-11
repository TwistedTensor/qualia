import { connect } from 'react-redux';
import React, { Component } from 'react';
import Websocket from "react-websocket";
import GraphPanel from "../containers/graphPanel";

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
        info
      </div>
      <div style={{ float:'right',width:sideWidth,height:sideHeight,backgroundColor:bkgdCol2 }}>
        controls
      </div>
     </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
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
