import * as c from "./../actions/ActionTypes";

const reducer = (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
    case c.ADD_TICKET:
      return {
        ...state,
        ...{
          [id]: {
            names: names,
            location: location,
            issue: issue,
            id: id,
            timeOpen: timeOpen,
            formattedWaitTime: formattedWaitTime,
          },
        },
      };
    // return Object.assign({}, state, {
    //   [id]: {
    //     names: names,
    //     location: location,
    //     issue: issue,
    //     id: id,
    //   },
    // });
    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[id];
      return newState;
    case c.UPDATE_TIME:
      const newTicket = { ...state[id], ...{ formattedWaitTime } };
      const updatedState = { ...state, ...{ [id]: newTicket } };
      return updatedState;
    default:
      return state;
  }
};

export default reducer;
