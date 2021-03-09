import React from 'react';

import '../styles/CountryCard.css'


function CountryCard({city, temp}) {
    return (
        <>
            <div className="country-card">
                <h1>{city}</h1>
                <p>{temp}°</p>
            </div>
        </>
    )
}

export default CountryCard;
