import React, { Component } from 'react'

export default class Incrementer extends Component {

    constructor() {
        super()
        this.state = {
            count: 0
        }

    }

    increment() {
        // this.setState({
        //     count: this.state.count + 1
        // })
        console.log('a');

        fetch("http://localhost:3001/books")
            .then(resp => {
                console.log('b', resp)
                return resp.json();
            })
            .then(data => console.log('c', data))

        for(let i = 0; i < 5000; i++) {
            console.log('d');
        }
        // a, d, b, c
    }

    render() {
        return(
            <div>
                <button onClick={() => this.increment()}>Click me!</button>
                <p>{this.state.count}</p>
            </div>
        )
    }
}