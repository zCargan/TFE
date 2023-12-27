import React, { useState } from 'react';
import axios from 'axios';

import MBCreator from '../../../components/Creator/MBCreator/MBCreator';
import MDNCreator from '../../../components/Creator/MDNCreator/MDNCreator';
import TATCreator from '../../../components/Creator/TATCreator/TATCreator';
import AbaqueCreator from '../../../components/Creator/AbaqueCreator/AbaqueCreator';
import LDNCreator from '../../../components/Creator/LDNCreator/LDNCreator';
import STTCreator from '../../../components/Creator/STTCreator/STTCreator';
import TTICreator from '../../../components/Creator/TTICreator/TTICreator';

const Test = () => {
    const [MB, setMB] = useState(""); // Use state to store the value of 'a'
    const [MDN, setMDN] = useState("");
    const [TAT, setTAT] = useState("");
    const [Abaque, setAbaque] = useState("");
    const [LDN, setLDN] = useState("");
    const [STT, setSTT] = useState("");
    const [TTI, setTTI] = useState("");

    function plusieursExo() {
        axios
        .get("http://localhost:4000/exercice/getExosFromAllTablesId1")
        .then((res) => {
            console.log(res.data)
            for(let i = 0; i < res.data.length; i ++) {
                if(res.data[i].type === "MB") {
                    console.log(res.data[i])
                    setMB(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "MDN") {
                    console.log(res.data[i])
                    setMDN(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "Abaque") {
                    console.log(res.data[i])
                    setAbaque(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "LDN") {
                    console.log(res.data[i])
                    setLDN(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "STT") {
                    console.log(res.data[i])
                    setSTT(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "TAT") {
                    console.log(res.data[i])
                    setTAT(res.data[i]); // Use setA to update the value of 'a'
                } else if(res.data[i].type === "TTI") {
                    console.log(res.data[i])
                    setTTI(res.data[i]); // Use setA to update the value of 'a'
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <p>Test</p>
            <button onClick={plusieursExo}>Test p+ exos</button>
            {/* Pass the value of 'a' as a prop to MBCreator */}
            <MBCreator exo={MB} />
            <MDNCreator exo={MDN} />
            <TATCreator exo={TAT}/>
            <LDNCreator exo={LDN} />
            <AbaqueCreator exo={Abaque} />
            <TTICreator exo={TTI} />
            <STTCreator exo={STT} />
        </div>
    );
};

export default Test;
