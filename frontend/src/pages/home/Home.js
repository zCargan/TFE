import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ZoneTest from '../../components/zoneTest/zoneTest';
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

const Home = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.exercices.exercice)
    const [nbrItem, setNbrItem] = useState("");
    const [type, setType] = useState('')

    useEffect(() => {

        let id = 1;
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
        .get(`http://localhost:4000/exercice/getMDN/${id}`, {}, config)
        .then((res) => {
            console.log(res.data[0].type)
            setType(res.data[0].type)
        })
        .catch((error) => {
            console.log(error)
        })
    })

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Home;