import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Row, Col, Typography, Icon, Pagination } from "antd";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";

//importing action creator
import { fetchPokemons, deletePokemonById } from "../actions";

const { Paragraph, Title } = Typography;

class GetPokemons extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount = () => {
    this.props.fetchPokemons(this.state.currentPage);
  };

  handlePaginationChange = async page => {
    await this.setState({ currentPage: page });
    await this.props.fetchPokemons(this.state.currentPage);
  };

  handleDeletePokemon = id => {
    this.props.deletePokemonById(id);
  };

  renderPokemonData = pokemonData => {
    return pokemonData.map(pokemon => (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        key={pokemon._id}
        style={{ marginBottom: "10px" }}
      >
        <Card
          title={pokemon.name}
          actions={[
            <Icon
              type="delete"
              key="delete"
              onClick={e => this.handleDeletePokemon(pokemon._id)}
            />,
            <Link to={`/edit/${pokemon._id}`}>
              <Icon type="edit" key="edit" />
            </Link>
          ]}
        >
          <Paragraph>Rank: {pokemon.rank}</Paragraph>
          <Paragraph>Ability: {pokemon.ability}</Paragraph>
        </Card>
      </Col>
    ));
  };

  render() {
    if (!this.props.pokemonList) {
      return (
        <div className="loading-container">
          <Icon type="loading" />
        </div>
      );
    } else if (this.props.pokemonList.length < 1) {
      return (
        <Title level={4} style={{ marginTop: "20px", textAlign: "center" }}>
          Pokemon list is empty! Add more Pokemons
        </Title>
      );
    }

    return (
      <div className="viewContainer">
        <Row className="pagination-top">
          <Col xs={{ span: 24 }}>
            <Pagination
              current={this.state.currentPage}
              onChange={this.handlePaginationChange}
              pageSize={9}
              total={this.props.paginationData.totalRecords}
            />
          </Col>
        </Row>

        <Row justify="start" gutter={16}>
          {this.renderPokemonData(this.props.pokemonList)}
        </Row>

        <Row className="pagination-bottom">
          <Col xs={{ span: 24 }}>
            <Pagination
              current={this.state.currentPage}
              onChange={this.handlePaginationChange}
              pageSize={9}
              total={this.props.paginationData.totalRecords}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ paginationData, pokemonList }) => {
  return { paginationData, pokemonList };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemons: currentPage => dispatch(fetchPokemons(currentPage)),
    deletePokemonById: id => dispatch(deletePokemonById(id))
  };
};

GetPokemons.propTypes = {
  paginationData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  pokemonList: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  fetchPokemons: PropTypes.func.isRequired,
  deletePokemonById: PropTypes.func.isRequired
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GetPokemons);
