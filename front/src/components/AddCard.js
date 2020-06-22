
import React from "react";

class AddCard extends React.Component {

    state = {
        input : {
            word : "",
            translate : ""
        }
    }

    updateInput(key, value) {
        let input = {...this.state.input};
        input[key] = value;
        this.setState({
            input : {...input}
        });
    }

    addCard() {
        this.props.addCard(this.state.input);
        this.setState({
            input : {
                word : "",
                translate : ""
            }
        });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Введите слово"
                    value={this.state.input.word}
                    onChange={(e) => this.updateInput("word", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Введите перевод"
                    value={this.state.input.translate}
                    onChange={(e) => this.updateInput("translate", e.target.value)}
                />
                <button
                    className="btn add-btn"
                    onClick={() => this.addCard()}
                >
                    Добавить
                </button>
            </div>
        )
    }

}

export default AddCard;