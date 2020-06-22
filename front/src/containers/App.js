import React from 'react';
import '../App.css';
import CardsList from "../components/CardsList";
import AddCard from "../components/AddCard";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id : 0,
            word : "",
            translate : "",
            cards : []
        }
    }


    addCard = (card) => {
        const newCard = {
            id : 1 + this.state.id,
            value : {
                word : card.word.slice(),
                translate : card.translate.slice(),
                overturned : false
            }
        };

        this.setState({
            id : newCard.id,
            word : "",
            translate : "",
            cards : [...this.state.cards, newCard]
        })
    }

    turnCard = (id) => {
        const cards = [...this.state.cards];

        let index = cards.findIndex((card) => {
            return card.id === id
        });

        cards[index].value.overturned = !cards[index].value.overturned;

        this.setState({ cards : cards } );
    }

    render() {
        return (
            <div className="App">
                <h1 className="app-title">Карточки английских слов</h1>
                <div className="container">
                    Добавить карточку...
                    <br/>
                    <AddCard addCard={this.addCard}/>
                    <CardsList cards={this.state.cards} turnCard={this.turnCard} />
                </div>
            </div>
        );
    }
}

export default App;
