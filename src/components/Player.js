import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class Player extends Component {
    state = {
        players: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:3000/player`)
          .then(res => {
            const players = res.data
            this.setState({players});
        })
    }

    render() {
        return (
            <div className="players">

                <div className="add-player">
                    <Button color='teal' as={Link} to="/player/add">Ajouter un Joeur</Button>
                </div>

                <div className="cards">
                    { this.state.players.map(player => 
                        <Card>
                            <Card.Content>
                                <Image src={player.avatar} />
                                <Card.Header>{player.name} {player.lastName}</Card.Header>
                                <Card.Meta>{Number(new Date().toLocaleDateString().substr(3, 2)) < Number(new Date(player.birthday).toLocaleDateString().substr(3, 2)) ? new Date().getFullYear() - new Date(player.birthday).getFullYear() - 1 : new Date().getFullYear() - new Date(player.birthday).getFullYear()} {"ANS |"} {player.category.toUpperCase()}</Card.Meta>
                                <Card.Description><strong>{player.team.name}</strong></Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button>Voir profil</Button>
                            </Card.Content>
                        </Card>
                        )}
                </div>
            </div>
        );
    }
}