import React, {Component} from 'react';

class Home extends Component{

    constructor(props) {
        super(props);
        fetch('/Backend/auth/authrequest').then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <h1>Home Work!</h1>
        );
    }
}

export default Home
