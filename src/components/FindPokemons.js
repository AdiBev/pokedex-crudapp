import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, Typography, Icon, Card } from "antd";
import { compose } from "recompose";
import { connect } from "react-redux";

//action creator
import { findNearbyPokemons, resetReqStatus } from "../actions";

const { Title, Paragraph } = Typography;

class FindPokemons extends Component {
  state = {
    lng: "",
    lat: "",
    locationError: ""
  };

  componentDidMount = () => {
    //resetting the search result
    this.props.resetReqStatus();
  };

  handleLocation = (locationFunc, errorFunc) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationFunc, errorFunc);
    }
  };

  displayLocationInfo = position => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    this.props.findNearbyPokemons(lng, lat);
  };

  handleLocationError = error => {
    switch (error.code) {
      //User denied
      case 1:
        return this.setState({
          locationError: "Permission denied: try searching Pokemons manually."
        });
      //Device can't get data
      case 2:
        return this.setState({ locationError: "Device can't get data" });
      //Deal with timeout
      case 3:
        return this.setState({ locationError: "Timeout: Please try again" });

      default:
        return this.state.locationError;
    }
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, lng, lat) => {
    e.preventDefault();
    this.props.findNearbyPokemons(lng, lat);

    //resetting input fields
    this.props.form.setFieldsValue({
      lat: "",
      lng: ""
    });
  };

  renderPokemonData = pokemonData => {
    //Show this before search req
    if (pokemonData === "") return null;
    //If no Pokemons nearby found show this
    else if (pokemonData.length === 0) {
      return <Paragraph>Sorry!! there are no Pokemons near to you.</Paragraph>;
    }

    return pokemonData.map(pokemon => (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        key={pokemon._id}
        style={{ marginBottom: "10px" }}
      >
        <Card title={pokemon.name}>
          <Paragraph>Rank: {pokemon.rank}</Paragraph>
          <Paragraph>Ability: {pokemon.ability}</Paragraph>
        </Card>
      </Col>
    ));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { lat, lng, locationError } = this.state;
    return (
      <div className="find-form-container">
        <Row className="row-location">
          <Title level={4}>Use my location</Title>
          <Icon
            type="compass"
            className="compass-icon"
            onClick={e =>
              this.handleLocation(
                this.displayLocationInfo,
                this.handleLocationError
              )
            }
          />
          <Paragraph level={5}>
            {locationError ? locationError : null}
          </Paragraph>
        </Row>

        <Row className="row-form">
          <Title level={4}>Search for any location with coordinates</Title>

          <Form
            className="ant-form-custom"
            onSubmit={e => {
              this.handleSubmit(e, lng, lat);
            }}
          >
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
                  placeholder="Your location's Langitude value"
                  type="number"
                  className="find-form-input"
                  required
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("lat", {
                rules: [
                  { required: true, message: "Please enter a Latitude value" }
                ]
              })(
                <Input
                  name="lat"
                  onChange={this.handleChange}
                  placeholder="Your location's Latitude value"
                  type="number"
                  className="find-form-input"
                  required
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="find-form-button"
              >
                Search <Icon type="search" />
              </Button>
            </Form.Item>
          </Form>
        </Row>

        <Row justify="start" gutter={16} className="card-container">
          {this.props.nearbyPokemons ? (
            <Title level={4}>Near by Pokemons</Title>
          ) : null}

          {this.renderPokemonData(this.props.nearbyPokemons)}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ nearbyPokemons }) => {
  return { nearbyPokemons };
};

const mapDispatchToProps = dispatch => {
  return {
    findNearbyPokemons: (lng, lat) => dispatch(findNearbyPokemons(lng, lat)),
    resetReqStatus: () => dispatch(resetReqStatus())
  };
};

FindPokemons.propTypes = {
  nearbyPokemons: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  findNearbyPokemons: PropTypes.func.isRequired,
  resetReqStatus: PropTypes.func.isRequired
};

export default compose(
  Form.create({ name: "find_pokemons" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FindPokemons);
