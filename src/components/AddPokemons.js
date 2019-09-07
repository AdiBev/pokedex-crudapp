import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import { compose } from "recompose";

//importing action creator here
import { postPokemonData, resetReqStatus } from "../actions/index";

const { Paragraph } = Typography;

class AddPokemons extends Component {
  state = {
    name: "",
    rank: "",
    ability: "",
    lat: "",
    lng: ""
  };

  componentDidMount = async () => {
    this.props.resetReqStatus();
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, data = {}) => {
    e.preventDefault();
    this.props.form.validateFields();
    this.props.postPokemonData(data);

    //sets the input value to empty
    //this.props.form.setFieldsValue --> handles setting input values in antd
    this.props.form.setFieldsValue({
      name: "",
      rank: "",
      ability: "",
      lat: "",
      lng: ""
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, rank, ability, lat, lng } = this.state;
    return (
      <div className="form">
        <Paragraph level={3} className="req-status-message">
          {this.props.postStatus}
        </Paragraph>
        <Form
          onSubmit={e => {
            this.handleSubmit(e, {
              name,
              rank,
              ability,
              geometry: { coordinates: [lng, lat] }
            });
          }}
        >
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please enter a name" }]
            })(
              <Input
                name="name"
                onChange={this.handleChange}
                placeholder="Pokemon Name"
                required
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("rank", {
              rules: [{ required: true, message: "Please enter a rank" }]
            })(
              <Input
                name="rank"
                onChange={this.handleChange}
                placeholder="Pokemon Rank"
                type="number"
                required
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("ability", {
              rules: [{ required: true, message: "Please enter an ability" }]
            })(
              <Input.TextArea
                name="ability"
                onChange={this.handleChange}
                placeholder="Pokemon's Ability"
                required
              />
            )}
          </Form.Item>
          <Row gutter={8}>
            <Col md={{ span: 12 }} sm={{ span: 24 }}>
              <Form.Item>
                {getFieldDecorator("lng", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter a Longitude value"
                    }
                  ]
                })(
                  <Input
                    name="lng"
                    onChange={this.handleChange}
                    placeholder="Longitude ex: 34"
                    type="number"
                    required
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={{ span: 12 }} sm={{ span: 24 }}>
              <Form.Item>
                {getFieldDecorator("lat", {
                  rules: [
                    { required: true, message: "Please enter a Latitude value" }
                  ]
                })(
                  <Input
                    name="lat"
                    onChange={this.handleChange}
                    placeholder="Latitude ex: 80"
                    type="number"
                    required
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="add-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postPokemonData: data => dispatch(postPokemonData(data)),
    resetReqStatus: () => dispatch(resetReqStatus())
  };
};

const mapStateToProps = ({ postStatus }) => {
  return { postStatus };
};

AddPokemons.propTypes = {
  postPokemonData: PropTypes.func.isRequired,
  resetReqStatus: PropTypes.func.isRequired,
  postStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
};

export default compose(
  Form.create({ name: "add_pokemons" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddPokemons);
