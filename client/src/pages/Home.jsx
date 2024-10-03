import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar.jsx';
import '../style/Home.css';

//homepage which is the main page the user lands on
function Home() {
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setName(decodedToken.name);
        }
    }, []);

    return (
        <div>
            <NavBar/>
        </div>
    );
}

export default Home;