import { connect } from 'react-redux';
import Season from '../components/season.js';
import {
  changeAnimal
} from '../ducks/wsduck.js';

function mapStateToProps(state) {
  return {
    animal: state.animal // gives our component access to state through props.toDoApp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeAnimal: (animal) => dispatch(changeAnimal(animal)),
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
)(Season);
