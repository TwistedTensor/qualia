// Initial values
const init_graph = {
    nodes:[
        {
            id:'a',
            summary:{val1:0},
        },
        {
            id:'b',
            summary:{val1:1},
        },
        {
            id:'c',
            summary:{val1:2},
        },
    ],
    links:[
        {source:'a',target:'b'},
        {source:'a',target:'c'},
    ],
}

const init_state = {
    graph:init_graph,
    colorBy:node=>node.summary.val1,
    selectedNode:Object.values(init_graph.nodes)[0],
}

// actions
const CHANGE_GRAPH = 'ws/CHANGE_GRAPH';
const SELECT_NODE = 'ws/SELECT_NODE';

// reducers
export default function reducer(state = init_state, action = {}) {
  switch( action.type ) {
    case CHANGE_GRAPH:
      var newGraph = action.payload;
      var firstNode = new_graph.nodes[0];
      var firstVar = Object.keys(firstNode.summary)[0];
      var update = {
        graph:new_payload,
        colorBy:node=>node.summary[firstVar],
        selectedNode:firstNode,
      }
      return Object.assign({},state,update);
    case SELECT_NODE:
      return Object.assign({},state,{selectedNode:action.payload});
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

// thunks
