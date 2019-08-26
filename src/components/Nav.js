import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    current: ""
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="Home">
          <Link to="/">
            <Icon type="home" />
             View Pokemons
          </Link>
        </Menu.Item>
        <Menu.Item key="Search">
          <Link to="/">
            <Icon type="search" />
            Find a Pokemon
          </Link>
        </Menu.Item>
        <Menu.Item key="Add">
          <Link to="/addpokemons">
            <Icon type="user-add" />
            Add a Pokemon
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
