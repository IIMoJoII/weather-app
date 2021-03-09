import React from 'react';

import '../styles/Added.css'
import CountryCard from "./CountryCard";

const Added = ({restored}) => {

    return (
        <>
            <div className="added-countries">
                {restored.map((obj) => <CountryCard city={obj.name} temp={obj.temp}/>)}
            </div>
        </>
    )
}

export default Added;
