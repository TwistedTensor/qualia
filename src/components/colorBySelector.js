import React, { Component } from 'react';
import colors from '../colors'

class colorBySelector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let optionElements = this.props.options.map((opName) =>
      <option value={opName} key={opName}>{opName}</option>
    );
    return (
      <form>
        <label style={{color:colors.base01}}>
          Color node by:
          <select value={this.props.value} onChange={this.props.handleChange}>
            {optionElements}
          </select>
        </label>
      </form>
    );
  }
}

export default colorBySelector;
