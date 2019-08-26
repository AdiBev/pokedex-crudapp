import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Row, Col, Typography, Icon, Layout, Pagination } from "antd";

import { fetchPokemons } from "../actions";

const { Paragraph } = Typography;

class GetPokemons extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount = () => {
    this.props.fetchPokemons(this.state.currentPage);
  };

  mapPokemonData = pokemons => {
    return this.props.pokemonData.pokemons.map(pokemon => (
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

  handlePaginationChange = async page => {
    await this.setState({ currentPage: page });
    await this.props.fetchPokemons(this.state.currentPage);
  };

  render() {
    if (!this.props.pokemonData) {
      return (
        <div className="loading-container">
          <Icon type="loading" />
        </div>
      );
    }
    return (
      <Layout>
        <div className="viewContainer">
          <Row className="pagination-top">
            <Col xs={{ span: 24 }}>
              <Pagination
                current={this.state.currentPage}
                onChange={this.handlePaginationChange}
                pageSize={9}
                total={this.props.pokemonData.totalRecords}
              />
            </Col>
          </Row>

          <Row justify="start" gutter={16}>
            {this.mapPokemonData(this.props.pokemonData)}
          </Row>

          <Row className="pagination-bottom">
            <Col xs={{ span: 24 }}>
              <Pagination
                current={this.state.currentPage}
                onChange={this.handlePaginationChange}
                pageSize={9}
                total={this.props.pokemonData.totalRecords}
              />
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ pokemonData }) => {
  return { pokemonData };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPokemons }, dispatch);
};

GetPokemons.propTypes = {
  pokemonData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  fetchPokemons: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetPokemons);
