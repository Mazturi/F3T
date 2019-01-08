import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class MainNavbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable borderless>
        <Menu.Item className="logo">
          <a href="localhost">
            <h3>F3T</h3>
          </a>
        </Menu.Item>

        <Menu.Item className="search-box">
          <Input className='icon custom-btn' icon='search'  placeholder='Chercher...' />
        </Menu.Item>

        <div className="wrap">
          <Menu.Item className="custom-btn" name='sign-up' active={activeItem === 'sign-up'} onClick={this.handleItemClick}>
            S'inscrire
          </Menu.Item>

          <Menu.Item className="custom-btn" name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
            Se connecter
          </Menu.Item>
        </div>

        

      </Menu>
    )
  }
}