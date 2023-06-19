import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

    const [username, setUsername] = useState("Not connected");
    const [role, setRole] = useState("/")

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.user.user)

    useEffect(() => {
        if(tasks) {
            console.log(tasks)
            setUsername("Welcome " + tasks.pseudo)
            setRole(tasks.role)
        }
      });
    function test () {
        if(tasks) {
            setUsername("Welcome " + tasks.pseudo)
        } else {
            console.log("ur not connected")
        }
    }


    const selectVariable = () => {

    }



    return (
        <div>
            <div>
                <h1>Page d'accueil</h1>
            </div>
            <div>
                <Navbar />
            </div>
            <div>
                {username}
            </div>
            <div>
                Status : {role}
            </div>
            <div>
                <button onClick={(e) => test()}></button>
            </div>
        </div>
    );
};

export default Home;