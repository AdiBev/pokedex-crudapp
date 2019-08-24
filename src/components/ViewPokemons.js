import React, { Component } from "react";
import axios from "axios";
import { Card, Row, Col, Typography, Icon } from "antd";

const { Paragraph } = Typography;

class GetPokemons extends Component {
  state = {
    pokemons: ""
  };

  componentDidMount = async () => {
    let res = await axios.get("http://localhost:5000/api/pokemons");
    let pokemonData = await res.data;
    this.setState({ pokemons: pokemonData });
    console.log(this.state.pokemons);
  };

  mapStatePokemon = pokemons => {
    return pokemons.map(pokemon => (
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
    if (!this.state.pokemons) {
      return (
        <div className="loading-container">
          <Icon type="loading" />
        </div>
      );
    }
    return (
      <div className="viewContainer">
        <Row justify="start" gutter={16}>
          {this.mapStatePokemon(this.state.pokemons)}
        </Row>
      </div>
    );
  }
}

export default GetPokemons;
