
import React from "react";
import Card from "./Card";

const CardsList = (props) => {

    return (
        <div>
            {props.cards.map(card => {
                return (
                    <Card card={card} turnCard={props.turnCard}/>
                );
            })}
        </div>
    );
}

export default CardsList;