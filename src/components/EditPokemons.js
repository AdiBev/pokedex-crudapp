import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import axios from "axios";
//importing action creators here
import { fetchPokemonById, updatePokemons, resetReqStatus } from "../actions";

const { Paragraph } = Typography;

class EditPokemons extends Component {
  state = {
    pokemonDataById: "",
    getReqStatus: ""
  };

  componentDidMount = async () => {
    this.props.resetReqStatus();
    await this.fetchPokemonById();
    this.setFormFields(this.state.pokemonDataById);
  };

  fetchPokemonById = async () => {
    const pokemonId = this.props.match.params.id;
    const url = `http://localhost:5000/api/pokemon/${pokemonId}`;

    try {
      let res = await axios.get(url);
      await this.setState({ pokemonDataById: res.data });
    } catch (err) {
      this.setState({ getReqStatus: err.message });
    }
  };

  setFormFields = pokemonData => {
    const { coordinates } = pokemonData.geometry;
    this.setState({
      pokemonDataById: {
        name: pokemonData.name,
        rank: pokemonData.rank,
        ability: pokemonData.ability,
        lat: coordinates[0],
        lng: coordinates[1]
      }
    });

    this.props.form.setFieldsValue({
      name: pokemonData.name,
      rank: pokemonData.rank,
      ability: pokemonData.ability,
      lat: coordinates[0],
      lng: coordinates[1]
    });
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ ...this.state.pokemonDataById, [name]: value });
  };

  handleSubmit = (e, data) => {
    e.preventDefault();
    const pokemonId = this.props.match.params.id;
    this.props.updatePokemons(pokemonId, data);
    //resetting input fields
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
    const { name, rank, ability, lng, lat } = this.state.pokemonDataById;
    return (
      <div className="form">
        <Paragraph level={3} className="req-status-message">
          {this.props.updateStatus}
        </Paragraph>
        <Paragraph level={3} className="req-status-message">
          {this.state.getReqStatus}
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
                    placeholder="Longitude value"
                    type="number"
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
                    placeholder="Latitude value"
                    type="number"
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
    fetchPokemonById: id => dispatch(fetchPokemonById(id)),
    updatePokemons: (id, data) => dispatch(updatePokemons(id, data)),
    resetReqStatus: () => dispatch(resetReqStatus())
  };
};

const mapStateToProps = ({ updateStatus }) => {
  return { updateStatus };
};

EditPokemons.propTypes = {
  updateStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  fetchPokemonById: PropTypes.func.isRequired,
  updatePokemons: PropTypes.func.isRequired
};

export default compose(
  Form.create({ name: "edit_pokemons" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(EditPokemons);
