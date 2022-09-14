import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

const EditTicketForm = (props) => {
  const { ticket } = props;
  const handleEditTicketFormSubmission = (event) => {
    event.preventDefault();
    props.onEditTicket({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: ticket.id,
      timeOpen: ticket.timeOpen,
      formattedWaitTime: ticket.formattedWaitTime,
    });
  };

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket"
      />
    </React.Fragment>
  );
};

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func,
};

export default EditTicketForm;
