import React from 'react';
import '../App.css';
import CardsList from "../components/CardsList";
import AddCard from "../components/AddCard";
import CardEntity from "../services/CardEntity";

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

    componentDidMount() {
        CardEntity.getList()
            .then((cards) => {
               this.setState({
                   cards : cards
               })
            });
    }


    addCard = (card) => {
        const newCard = {
            word : card.word.slice(),
            translate : card.translate.slice(),
            overturned : false
        };

        CardEntity.add(card)
            .then((id) => {
                newCard.id = id;
                this.setState({
                    word : "",
                    translate : "",
                    cards : [newCard, ...this.state.cards]
                })
            });
    }

    turnCard = (id) => {
        const cards = [...this.state.cards];

        let index = cards.findIndex((card) => {
            return card.id === id
        });

        cards[index].overturned = !cards[index].overturned;

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
