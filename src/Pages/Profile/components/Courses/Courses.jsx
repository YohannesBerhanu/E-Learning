import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CoursesCardTwo from "Components/Card/CoursesCardTwo";
import React, { useEffect, useReducer } from "react";
import { Card, Col, Row, Button } from "reactstrap";

import { getEnrolledCourses } from "../../../../helpers/customResolvers"
import CourseForm from "./CoursesForm"

const Courses = ({ doneAdd, doneEdit, courses, enrollments, categories, universities, teachers }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <Card className="mt-2 p-2 bg-none">
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Col align="right" className="newButton">
        <Button
          onClick={() =>
            _toggle(
              {
                type: "ADD",
                Component: CourseForm,
                submit: () => null,
                title: "New Course",
                size: "md",
                options: {
                  categories, universities, teachers
                }
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Course
        </Button>
      </Col>
      <h5>Courses</h5>
      <hr />
      <Row>
        {getEnrolledCourses("6095d13e5a4a30193a5d9472", enrollments, courses).map((course, index) => (
          <Col md={3} sm={12}>
            <CoursesCardTwo index={index} course={course} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Courses;
