import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchBar = styled.form`
  position: absolute;
  width: 500px;
  transition: 0.8s 0.5s;
  margin-left: calc(50vw - 250px)
`;

const SearchInput = styled.input`
  width: 500px;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }

`;


const SearchCity = ({ submit, value, change}) => {
    return (
        <>
            <SearchBar onSubmit={submit}>
                <SearchInput type="text" value={value} placeholder="Enter city" onChange={change} />
            </SearchBar>
        </>
    );
};

SearchCity.propTypes = {
    submit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
