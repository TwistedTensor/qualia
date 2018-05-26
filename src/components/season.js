import React from "react";
import PropTypes from "prop-types";
import Websocket from "react-websocket";

const Season = ({animal,wsDispatch}) => (
  <div>
    {animal} season!
    <Websocket url='ws://localhost:8888/ws' onMessage={wsDispatch}/>
  </div>
);

Season.PropTypes = {
    animal:PropTypes.string.isRequired,
    wsDispatch:PropTypes.func.isRequired
};

export default Season;
