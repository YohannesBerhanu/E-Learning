import React, { useState } from "react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import CoursesCard from "../../../Components/Card/CoursesCard";
import Categories from "./Categories";
import Courses from "./Courses";
import RequestingCourses from "./RequestCourses"
import Schools from "./Schools";
import Students from "./Students";
import Teachers from "./Teachers";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState("0");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const courses = [{}, {}, {}, {}];

  return (
    <div className="tabsContainer">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "0" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("0");
            }}
          >
            Requested Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("1");
            }}
          >
            New Enrolled Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("2");
            }}
          >
            In Progress
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "3" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("3");
            }}
          >
            Completed Courses
          </NavLink>
        </NavItem>{" "}
        <NavItem>
          <NavLink
            className={activeTab === "4" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("4");
            }}
          >
            Schools
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "5" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("5");
            }}
          >
            Categories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "6" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("6");
            }}
          >
            Students
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "7" ? "activepageTab" : "notactivepageTab"}
            onClick={() => {
              toggle("7");
            }}
          >
            Teachers
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="mt-3" activeTab={activeTab}>
        <TabPane tabId="0">
          <RequestingCourses />
        </TabPane>
        <TabPane tabId="1">
          <Courses />
        </TabPane>
        <TabPane tabId="2">
          <h5>Courses In Progress</h5>
          <hr />
          <Row>
            {courses.map((course, index) => (
              <Col md={6} sm={12}>
                <CoursesCard index={index} course={course} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <h5>Completed Courses</h5>
          <hr />
          <Row>
            {courses.map((course, index) => (
              <Col md={6} sm={12}>
                <CoursesCard index={index} course={course} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Schools />
        </TabPane>
        <TabPane tabId="5">
          <Categories />
        </TabPane>
        <TabPane tabId="6">
          <Students />
        </TabPane>
        <TabPane tabId="7">
          <Teachers />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
