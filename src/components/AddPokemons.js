import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Row, Col } from "antd";

class AddPokemons extends Component {
  state = {
    name: "",
    rank: "",
    ability: "",
    lat: "",
    lng: ""
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  postPokemonData = async (e, data = {}) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/pokemon";

    try {
      let res = await axios.post(url, data);
      await setTimeout(() => {
        this.props.history.push("/");
      }, 1000);
    } catch (err) {
      return <div>{err.message}</div>;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, rank, ability, lat, lng } = this.state;
    return (
      <div className="form">
        <Form
          onSubmit={e =>
            this.postPokemonData(e, {
              name,
              rank,
              ability,
              geometry: { coordinates: [lng, lat] }
            })
          }
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
              rules: [{ required: true, message: "Please enter a rank" }]
            })(
              <Input.TextArea
                name="ability"
                onChange={this.handleChange}
                placeholder="Pokemon Ability"
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
                      message: "Please enter a Langitude value"
                    }
                  ]
                })(
                  <Input
                    name="lng"
                    onChange={this.handleChange}
                    placeholder="Longitude ex: 34"
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
                    placeholder="Latitude ex: 80"
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

const WrappedPokemonForm = Form.create({ name: "add_pokemons" })(AddPokemons);

export default WrappedPokemonForm;
