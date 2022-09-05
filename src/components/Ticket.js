import React from "react";
import PropTypes from "prop-types";

const Ticket = (props) => {
  return (
    <React.Fragment>
      <h3>
        {props.location} - {props.names}
      </h3>
      <p>
        <em>{props.issue}</em>
      </p>
    </React.Fragment>
  );
};

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
};

export default Ticket;
