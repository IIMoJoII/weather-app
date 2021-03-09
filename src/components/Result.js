import React from 'react';

import '../styles/Result.css'
import {Button} from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";


const Result = ({city, date, temp}) => {

    return (
        <>
            <div className="result">
                <div className="result__info">
                    <h1>{city}</h1>
                    <h2>{date}</h2>
                </div>
                <div className="result__weather">
                    <h1>{temp}°</h1>
                </div>
            </div>
        </>
    )
}

export default Result
