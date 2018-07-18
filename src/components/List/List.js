import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class List extends Component {
    render() {
        return (
            <div class="autocomplete-items" onClick="selectItem(\'' + element + '\')">' + element + '</div>
        );
    }
}