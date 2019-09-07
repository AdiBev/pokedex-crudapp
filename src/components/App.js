import React, {Fragment} from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Typography, Layout } from "antd";

import NavBar from "./Nav";
import GetPokemons from "./ViewPokemons";
import AddPokemons from "./AddPokemons";
import EditPokemons from "./EditPokemons";
import FindPokemons from "./FindPokemons";

const { Title } = Typography;
const { Header, Content } = Layout;

function App() {
  return (
    <Fragment>
      <Header>
        <Title className="heading">
          <Link to="/">Pokédex</Link>
        </Title>
        <NavBar />
      </Header>
      <Content>
        <Switch>
          <Route exact path="/" component={GetPokemons} />
          <Route path="/addpokemons" component={AddPokemons} />
          <Route path="/edit/:id" component={EditPokemons} />
          <Route path="/nearbyPokemons" component={FindPokemons} />
          <Route
            component={() => (
              <Title level="h2" className="page-error">
                Sorry! this page doesn't exist!
              </Title>
            )}
          />
        </Switch>
      </Content>
    </Fragment>
  );
}

export default App;
