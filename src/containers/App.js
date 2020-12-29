import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import {localUsers} from '../LocalUsers';
import './App.css';
import ErrorBoundry from "../components/ErrorBoundry";

function App() {

    const [users, setUsers] = useState(localUsers);
    const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setUsers(users.concat(localUsers))
            });
        console.log(count);
    }, [count]);


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
                <button onClick={() => setCount(count + 1)}>Count</button>
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
