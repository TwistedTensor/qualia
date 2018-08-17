// actions
const CHANGE_GRAPH = 'graph/CHANGE_GRAPH';
const SELECT_NODE = 'graph/SELECT_NODE';
const CHANGE_COLOR_BY = 'graph/CHANGE_COLOR_BY'; 

// reducers
const init_graph = {
    nodes:[
        {
            id:'a',
            summary:{val1:0,val2:3},
        },
        {
            id:'b',
            summary:{val1:1,val2:2},
        },
        {
            id:'c',
            summary:{val1:2,val2:1},
        },
    ],
    links:[
        {source:'a',target:'b',val:20},
        {source:'a',target:'c',val:33},
    ],
}

const init_state = {
    graph:init_graph,
    colorBy:'val1',
    summaryVars:['val1','val2'],
    selectedNode:Object.values(init_graph.nodes)[0],
}

export default function reducer(state = init_state, action = {}) {
  switch( action.type ) {
    case CHANGE_GRAPH:
      var newGraph = action.payload;
      var firstNode = new_graph.nodes[0];
      var summaryVars = Object.keys(firstNode.summary);
      var firstVar = summaryVars[0];
      var update = {
        graph:newGraph,
        summaryVars:summaryVars,
        colorBy:firstVar,
        selectedNode:firstNode,
      }
      return Object.assign({},state,update);
    case SELECT_NODE:
      return Object.assign({},state,{selectedNode:action.payload});
    case CHANGE_COLOR_BY:
      return Object.assign({},state,{colorBy:action.payload});
    default:
      return state;
  }
}

// action creators
export function changeGraph(graph) {
  return {type:CHANGE_GRAPH,payload:graph}
}

export function selectNode(node) {
  return {type:SELECT_NODE,payload:node.summary}
}

export function changeColorBy(val) {
  console.log(val)
  return {type:CHANGE_COLOR_BY,payload:val}
}
// thunks
