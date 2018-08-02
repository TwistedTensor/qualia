import { connect } from 'react-redux';
import Graph from '../components/graph.js';
import {
  changeGraph,
  selectNode,
} from '../ducks/wsduck.js';

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
)(Graph);
