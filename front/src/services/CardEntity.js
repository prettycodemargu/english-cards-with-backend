import React from 'react';

const API_URL = "http://eng-cards.local/api/cards";

class CardEntity {

    static add(card) {
        const requestOptions = {
            method : "POST",
            header : {"Content-Type" : "application/json"},
            body : JSON.stringify(card)
        };

        return fetch(API_URL, requestOptions)
            .then((response) => response.json())
            .then((response) => {
               return response.id;
            });
    }

    static getList() {
        const requestOptions = {
            method : "GET",
            header : {"Content-Type" : "application/json"}
        };

        return fetch(API_URL, requestOptions)
            .then((response) => response.json())
            .then((response) => {
               return response;
            });
    }
}

export default CardEntity;