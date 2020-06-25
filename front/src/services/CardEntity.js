import React from 'react';

const API_URL = 'http://eng-cards.local/cards';

class CardEntity {

    static add(card) {
        let requestOptions = {
            method : "POST",
            header : {"Content-Type" : "application/json"},
            body : JSON.stringify(card)
        }

        return fetch(API_URL, requestOptions)
            .then((response) => response.json())
            .then((response) => {
               return response.id;
            });
    }

    static getList() {
        let requestOptions = {
            method : "GET",
            header : {"Content-Type" : "application/json"}
        }

        return fetch(API_URL, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
    }
}

export default CardEntity;