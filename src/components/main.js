// Main view consists of the graph, an info panel for displaying data
// and charts, and a controls panel for adjusting the view of the graph
// and changing the tool (later)

import React from "react";
import PropTypes from "prop-types";
import Websocket from "react-websocket";
import GraphPanel from "../containers/graphPanel";

const phiBig = '61.8%';
const phiSmall = '38.2%';
const bkgdCol1 = '#073642';
const bkgdCol2 = '#002b36';

const Main = ({wsDispatch}) => {
  return (
  <div style={{ height:'100vh'}}>
    <Websocket url='ws://localhost:8888/ws' onMessage={wsDispatch}/>
    <div style={{ float:'left',height:'100%',width:phiBig,backgroundColor:bkgdCol1 }}>
      <GraphPanel width={0.618*window.innerWidth}/>
    </div>
    <div style={{ float:'right',height:'50%',width:phiSmall,backgroundColor:bkgdCol1 }}>
      info
    </div>
    <div style={{ float:'right',height:'50%',width:phiSmall,backgroundColor:bkgdCol2 }}>
      controls
    </div>
   </div>
  )
}
Main.propTypes = {
    wsDispatch:PropTypes.func.isRequired,
};
export default Main;
