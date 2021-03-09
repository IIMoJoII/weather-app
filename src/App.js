import React from 'react';
import styled from 'styled-components';
import SearchCity from "./components/SearchSity";
import './App.css'
import Result from "./components/Result";
import Added from "./components/Added";
import axios from "axios";
import {Button} from "@shopify/polaris";


const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};
  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;

    
  `}
  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

let nameError = false;

class App extends React.Component {
    state = {
        value: '',
        city: '',
        date: '',
        temp: '',
        forecast: '',
        error: false,
        restored: [],
    };

    handleInputChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleSearchCity = e => {
        e.preventDefault();
        const { value } = this.state;
        const APIkey = "6369a181be0b4aaa1f423382a1b781c2";

        const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
        const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;


        Promise.all([fetch(weather), fetch(forecast)])
            .then(([res1, res2]) => {
                if (res1.ok && res2.ok) {
                    return Promise.all([res1.json(), res2.json()]);
                }
                throw console.log("name_error")
            })
            .then(([data1, data2]) => {
                const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'Nocvember',
                    'December',
                ];
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const currentDate = new Date();
                const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
                    months[currentDate.getMonth()]
                }`;


                const city = data1.name;
                const forecast = data2.list;
                const temp = data1.main.temp;

                this.setState({
                    city: city,
                    forecast: forecast,
                    temp: temp,
                    date: date,
                });
            });
    };

    handleButtonClicked = e => {
        e.preventDefault();

        let cityCardInfo = {
            name: this.state.city,
            temp: this.state.temp,
        };



            let cityArr = [];

            let restoredCityArr = JSON.parse(localStorage.getItem('cityArr'));

            for(let m = 0; m < restoredCityArr.length; m++){
                cityArr.push(restoredCityArr[m]);
            }

            if(cityArr.length !== 0){
                for(let i = 0; i < cityArr.length; i++){
                    if(cityArr[i].name === this.state.city){
                        cityArr.splice(i, 1);
                    }
                }
            }

            cityArr.push(cityCardInfo)

            if(cityArr.length > 5){
                cityArr.splice(0, 1);
            }


            localStorage.setItem('cityArr', JSON.stringify(cityArr))

    }

    render() {
        const { value, weatherInfo, error } = this.state;
        this.state.restored = JSON.parse(localStorage.getItem('cityArr'));

        return (
            <>
                <div className="App">
                    {this.state.restored && this.state.restored.length !== 0 &&<Added
                        restored={this.state.restored}
                    />}
                    {this.state.city && this.state.date && this.state.temp ? <Result
                        city={this.state.city}
                        date={this.state.date}
                        temp={this.state.temp}
                    /> : <h1> Error </h1>}
                    <AppTitle showLabel={(weatherInfo || error) && true}>Weather app</AppTitle>

                        <AppTitle secondary showResult={(weatherInfo || error) && true}>
                            Weather app
                        </AppTitle>


                        <SearchCity
                            value={value}
                            change={this.handleInputChange}
                            submit={this.handleSearchCity}
                        />

                    {this.state.city && this.state.date && this.state.temp && <div className="add-btn">
                        <Button onClick={this.handleButtonClicked}>Add country</Button>
                    </div>}
                </div>
            </>
        );
    }
}

export default App;
