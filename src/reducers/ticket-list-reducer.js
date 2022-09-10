const reducer = (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case "ADD_TICKET":
      return {
        ...state,
        ...{
          [id]: {
            names: names,
            location: location,
            issue: issue,
            id: id,
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
    case "DELETE_TICKET":
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};

export default reducer;