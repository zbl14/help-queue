import React, { useState, useEffect, useCallback } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { formatDistanceToNow } from "date-fns";

const TicketControl = (props) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  console.log(props);

  const updateTicketElapsedWaitTime = useCallback(() => {
    const { dispatch } = props;
    Object.values(props.mainTicketList).forEach((ticket) => {
      const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
        addSuffix: true,
      });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }, [props]);

  useEffect(() => {
    const timer = setInterval(() => updateTicketElapsedWaitTime(), 60000);

    return () => {
      clearInterval(timer);
    };
  }, [updateTicketElapsedWaitTime]);

  const handleClick = () => {
    if (selectedTicket !== null) {
      setSelectedTicket(null);
      setEditing(false);
    } else {
      const { dispatch } = props;
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  const handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  const handleChangingSelectedTicket = (id) => {
    const selectedTicket = props.mainTicketList[id];
    setSelectedTicket(selectedTicket);
  };

  const handleDeletingTicket = (id) => {
    const { dispatch } = props;
    const action = a.deleteTicket(id);
    dispatch(action);
    setSelectedTicket(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    setEditing(false);
    setSelectedTicket(null);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing) {
    currentlyVisibleState = (
      <EditTicketForm
        ticket={selectedTicket}
        onEditTicket={handleEditingTicketInList}
      />
    );
    buttonText = "Return to Ticket List";
  } else if (selectedTicket != null) {
    currentlyVisibleState = (
      <TicketDetail
        ticket={selectedTicket}
        onClickingDelete={handleDeletingTicket}
        onClickingEdit={handleEditClick}
      />
    );
    buttonText = "Return to Ticket List";
  } else if (props.formVisibleOnPage) {
    currentlyVisibleState = (
      <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList} />
    );
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = (
      <TicketList
        ticketList={props.mainTicketList}
        onTicketSelection={handleChangingSelectedTicket}
      />
    );
    buttonText = "Add Ticket";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
};

export default connect(mapStateToProps)(TicketControl);

// class TicketControl extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTicket: null,
//       editing: false,
//     };
//   }

//   componentDidMount() {
//     this.waitTimeUpdateTimer = setInterval(
//       () => this.updateTicketElapsedWaitTime(),
//       60000
//     );
//   }

//   // componentDidUpdate() {
//   //   console.log("component updated!");
//   // }

//   componentWillUnmount() {
//     clearInterval(this.waitTimeUpdateTimer);
//   }

//   updateTicketElapsedWaitTime = () => {
//     const { dispatch } = this.props;
//     Object.values(this.props.mainTicketList).forEach((ticket) => {
//       const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
//         addSuffix: true,
//       });
//       const action = a.updateTime(ticket.id, newFormattedWaitTime);
//       dispatch(action);
//     });
//   };

//   handleClick = () => {
//     if (this.state.selectedTicket != null) {
//       this.setState({
//         selectedTicket: null,
//         editing: false,
//       });
//     } else {
//       const { dispatch } = this.props;
//       const action = a.toggleForm();
//       dispatch(action);
//     }
//   };

//   handleAddingNewTicketToList = (newTicket) => {
//     const { dispatch } = this.props;
//     const action = a.addTicket(newTicket);
//     dispatch(action);
//     const action2 = a.toggleForm();
//     dispatch(action2);
//   };

//   handleChangingSelectedTicket = (id) => {
//     const selectedTicket = this.props.mainTicketList[id];
//     this.setState({ selectedTicket: selectedTicket });
//   };

//   handleDeletingTicket = (id) => {
//     const { dispatch } = this.props;
//     const action = a.deleteTicket(id);
//     dispatch(action);
//     this.setState({ selectedTicket: null });
//   };

//   handleEditClick = () => {
//     this.setState({ editing: true });
//   };

//   handleEditingTicketInList = (ticketToEdit) => {
//     const { dispatch } = this.props;
//     const action = a.addTicket(ticketToEdit);
//     dispatch(action);
//     this.setState({
//       editing: false,
//       selectedTicket: null,
//     });
//   };

//   render() {
//     let currentlyVisibleState = null;
//     let buttonText = null;

//     if (this.state.editing) {
//       currentlyVisibleState = (
//         <EditTicketForm
//           ticket={this.state.selectedTicket}
//           onEditTicket={this.handleEditingTicketInList}
//         />
//       );
//       buttonText = "Return to Ticket List";
//     } else if (this.state.selectedTicket != null) {
//       currentlyVisibleState = (
//         <TicketDetail
//           ticket={this.state.selectedTicket}
//           onClickingDelete={this.handleDeletingTicket}
//           onClickingEdit={this.handleEditClick}
//         />
//       );
//       buttonText = "Return to Ticket List";
//     } else if (this.props.formVisibleOnPage) {
//       currentlyVisibleState = (
//         <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
//       );
//       buttonText = "Return to Ticket List";
//     } else {
//       currentlyVisibleState = (
//         <TicketList
//           ticketList={this.props.mainTicketList}
//           onTicketSelection={this.handleChangingSelectedTicket}
//         />
//       );
//       buttonText = "Add Ticket";
//     }
//     return (
//       <React.Fragment>
//         {currentlyVisibleState}
//         <button onClick={this.handleClick}>{buttonText}</button>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     mainTicketList: state.mainTicketList,
//     formVisibleOnPage: state.formVisibleOnPage,
//   };
// };

// TicketControl = connect(mapStateToProps)(TicketControl);

// TicketControl.propTypes = {
//   mainTicketList: PropTypes.object,
//   formVisibleOnPage: PropTypes.object,
// };

// export default TicketControl;
