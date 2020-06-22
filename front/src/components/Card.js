
import React from "react";

const Card = (props) => {

    return(
        <div
            key={props.card.id}
            className={"card" + (props.card.value.overturned ? " overturned" : "")}
            onClick={() => props.turnCard(props.card.id)}
        >
            {props.card.value.overturned ? props.card.value.translate : props.card.value.word}
        </div>
    )
}

export default Card;