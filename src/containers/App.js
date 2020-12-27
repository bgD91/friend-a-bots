import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import {localUsers} from '../LocalUsers';
import './App.css';
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({users: users.concat(localUsers).concat(localUsers)})
            });
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    render() {
        const {users, searchField} = this.state;

        const filteredUsers = users.filter(user => {
            return user.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !users.length ?
            (
                <div className='tc'>
                    <h1>Loading</h1>
                </div>
            ) :
            (
                <div className='tc'>
                    <h1 className='f1'>Friend-a-bots</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList users={filteredUsers}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }
}

export default App;
