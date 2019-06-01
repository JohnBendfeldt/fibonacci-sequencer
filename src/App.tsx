import React, { Component } from 'react';
import uuid from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';

export default class App extends Component {
    state = {
        number: '',
        fibonacciSequence: []
    };

    onSubmit = (e: any) => {
        e.preventDefault();
        let fib = fibonacci(parseInt(this.state.number));
        this.setState({ number: '', fibonacciSequence: fib });
    };

    onChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <div className='container'>
                <div className='white card-panel z-depth-5'>
                    <h2>Fibonacci Sequence</h2>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type='number'
                            name='number'
                            max='1478'
                            maxLength={4}
                            placeholder='Length of sequence'
                            value={this.state.number}
                            onChange={this.onChange}
                        />
                    </form>
                    <div className='flow-text'>
                        {this.state.fibonacciSequence.join(', ')}
                        <ol>
                            {this.state.fibonacciSequence.map(num => (
                                <li key={uuid.v4()}>{num}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

const fibonacci = (num: number) => {
    let a = 0;
    let b = 1;
    let temp;
    let fibonacciSequence = [];
    while (num > 0) {
        fibonacciSequence.push(a);
        temp = a + b;
        a = b;
        b = temp;
        num--;
    }
    return fibonacciSequence;
};
