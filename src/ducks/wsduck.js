// actions
const CHANGE_ANIMAL = 'ws/CHANGE_ANIMAL';

const init_state = {
    animal:'duck',
}

// reducers
export default function reducer(state = init_state, action = {}) {
  switch( action.type ) {
    case CHANGE_ANIMAL:
      return Object.assign({},state,{animal:action.payload});
    default:
      return state;
  }
}

// action creators
export function changeAnimal(animal) {
  return {type:CHANGE_ANIMAL,payload:animal}
}

// thunks
