import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import {localUsers} from '../LocalUsers';
import './App.css';
import ErrorBoundry from "../components/ErrorBoundry";

function App() {

    const [users, setLocalUsers] = useState(localUsers);
    const [searchField, setSearchField] = useState('');


    useEffect( () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setLocalUsers(users.concat(localUsers))
            });
    },[]);



    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    };


    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return !filteredUsers.length ?
        (
            <div className='tc'>
                <h1>No results</h1>
                <SearchBox searchChange={onSearchChange}/>
            </div>
        ) :
        (
            <div className='tc'>
                <h1 className='f1'>Friend-a-bots</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList users={filteredUsers}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default App;
