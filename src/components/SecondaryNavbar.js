import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Team from "./Team";
import Player from "./Player";
import AddPlayer from "./AddPlayer";
import Tournament from "./Tournament";
import Refree from "./Refree";
import Match from "./Match";

export default class SecondaryNavbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    <Router>
        <div>
      <Segment inverted >
        <Menu inverted pointing secondary size='small'>
        
          <Menu.Item 
            name='Accueil' 
            as={Link}
            to= '/'
            active={activeItem === 'actualites'} 
            onClick={this.handleItemClick} 
          />
          
          <Menu.Item 
            name='Joueurs'
            as= {Link}
            to= '/player'
            active={activeItem === 'joeurs'} 
            onClick={this.handleItemClick} 
          />

          <Menu.Item
            name='équipes'
            as= {Link}
            to= '/team'
            active={activeItem === 'clubs'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Item
            name='Tournois'
            as= {Link}
            to= '/tournament'
            active={activeItem === 'tournois'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            name='Matches'
            as= {Link}
            to= '/match'
            active={activeItem === 'matchs'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            name='Arbitres'
            as= {Link}
            to= '/refree'
            active={activeItem === 'arbitres'}
            onClick={this.handleItemClick}
          />

        </Menu>
      </Segment>
      <Route path="/" exact component={Home} />
        <Route path="/player" exact component={Player} />
        <Route path="/player/add" exact component={AddPlayer} />
        <Route path="/team" exact component={Team} />
        <Route path="/tournament" exact component={Tournament} />
        <Route path="/match" exact component={Match} />
        <Route path="/refree" exact component={Refree} />
      </div>


    </Router>
    )
  }
}