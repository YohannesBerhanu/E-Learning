import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../../../common/form";

class CategoryForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        image: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().min(2).max(50).required(),
      image: Joi.any().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data._id ? data._id : "",
        name: data.name,
        image: data.image,
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    const { data } = this.state;
    this.props.submit(data);
  }

  handleImageDrop = (image) => {
    console.log(image[0].preview, "fasil");
    this.setState({ preview: image[0].preview });
  };

  render() {
    return (
      <Card className="border-0 bg-background">
        <CardBody className="bg-background ">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "name",
                  label: "Title",
                })}
              </Col>
            </Row>

            <CardFooter className="bg-background" align="center">
              {this.renderButton("Save")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default CategoryForm;
