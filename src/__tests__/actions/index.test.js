import * as a from "./../../actions";
import * as c from "./../../actions/ActionTypes";

describe("Help Queue actions", () => {
  it("deleteTicket should create DELETE_TICKET action", () => {
    expect(a.deleteTicket(1)).toEqual({
      type: c.DELETE_TICKET,
      id: 1,
    });
  });

  it("toggleForm should create TOGGLE_FORM action", () => {
    expect(a.toggleForm()).toEqual({
      type: c.TOGGLE_FORM,
    });
  });

  it("addTicket should create ADD_TICKET action", () => {
    expect(
      a.addTicket({
        names: "Jo and Jasmine",
        location: "3E",
        issue: "Redux not working!",
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 1,
      })
    ).toEqual({
      type: c.ADD_TICKET,
      names: "Jo and Jasmine",
      location: "3E",
      issue: "Redux not working!",
      timeOpen: 0,
      formattedWaitTime: "less than a minute ago",
      id: 1,
    });
  });

  it("updateTime should create UPDATE_TIME action", () => {
    expect(a.updateTime(1, "less than a minute ago")).toEqual({
      type: c.UPDATE_TIME,
      id: 1,
      formattedWaitTime: "less than a minute ago",
    });
  });
});
