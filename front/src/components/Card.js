
import React from "react";

const Card = (props) => {

    return(
        <div
            className={"card" + (props.card.overturned ? " overturned" : "")}
            onClick={() => props.turnCard(props.card.id)}
        >
            {props.card.overturned ? props.card.translate : props.card.word}
        </div>
    )
}

export default Card;