import React from "react";
import { shallow } from "enzyme";
import TodoCard from "./TodoCard";

describe("TodoCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TodoCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
