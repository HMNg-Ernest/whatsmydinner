import React from "react";
import { useState } from "react";
import { DropdownList, NumberPicker } from "react-widgets";
import { Link } from "react-router-dom";
import "react-widgets/styles.css";
import styled from "styled-components";

function Filter() {
  const dietChoices = [
    { id: "diet", choice: "Gluten Free" },
    { id: "diet", choice: "Ketogenic" },
    { id: "diet", choice: "Vegetarian" },
    { id: "diet", choice: "Lacto-Vegetarian" },
    { id: "diet", choice: "Ovo-Vegetarian" },
    { id: "diet", choice: "Vegan" },
    { id: "diet", choice: "Pescetarian" },
    { id: "diet", choice: "Paleo" },
    { id: "diet", choice: "Primal" },
    { id: "diet", choice: "Low FODMAP" },
    { id: "diet", choice: "Whole30" },
  ];

  const typeChoices = [
    { id: "type", choice: "Main course" },
    { id: "type", choice: "Side dish" },
    { id: "type", choice: "Dessert" },
    { id: "type", choice: "Breakfast" },
    { id: "type", choice: "Soup" },
    { id: "type", choice: "Appetizer" },
    { id: "type", choice: "No Choice" },
  ];

  const sortChoices = [
    { id: "sort", choice: "Popularity" },
    { id: "sort", choice: "Time" },
    { id: "sort", choice: "Price" },
    { id: "sort", choice: "Healthiness" },
  ];

  const cuisineChoices = [
    { id: "cuisine", choice: "African" },
    { id: "cuisine", choice: "American" },
    { id: "cuisine", choice: "British" },
    { id: "cuisine", choice: "Cajun" },
    { id: "cuisine", choice: "Caribbean" },
    { id: "cuisine", choice: "Chinese" },
    { id: "cuisine", choice: "Eastern European" },
    { id: "cuisine", choice: "European" },
    { id: "cuisine", choice: "French" },
    { id: "cuisine", choice: "German" },
    { id: "cuisine", choice: "Greek" },
    { id: "cuisine", choice: "Indian" },
    { id: "cuisine", choice: "Irish" },
    { id: "cuisine", choice: "Italian" },
    { id: "cuisine", choice: "Japanese" },
    { id: "cuisine", choice: "Jewish" },
    { id: "cuisine", choice: "Korean" },
    { id: "cuisine", choice: "Latin American" },
    { id: "cuisine", choice: "Mediterranean" },
    { id: "cuisine", choice: "Mexican" },
    { id: "cuisine", choice: "Middle Eastern" },
    { id: "cuisine", choice: "Nordic" },
    { id: "cuisine", choice: "Southern" },
    { id: "cuisine", choice: "Spanish" },
    { id: "cuisine", choice: "Thai" },
    { id: "cuisine", choice: "Vietnamese" },
  ];

  const [input, setInput] = useState({
    diet: null,
    type: null,
    maxReadyTime: 0,
    sort: null,
    cuisine: null,
  });
  const [apiResult, setApiResult] = useState([]);

  const getRecipe = async () => {
    const url =
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=8&` +
      new URLSearchParams(input).toString();
    console.log(url);
    const api = await fetch(url);
    const data = await api.json();
    setApiResult(data.results);
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.id]: e.choice };
    });
  };
  const handleNumberPickerChange = (e) => {
    setInput((prev) => {
      return { ...prev, maxReadyTime: e };
    });
  };
  const resetSelected = () => {
    setApiResult([]);
    setInput({
      diet: null,
      type: null,
      maxReadyTime: 0,
      sort: null,
      cuisine: null,
    });
  };
  return (
    <div>
      <SearchBar>
        <h3>Diet </h3>
        <SDropdownList
          dropUp
          textField="choice"
          value={input.diet}
          data={dietChoices}
          onChange={handleChange}
        />
        <h3>Meal Type </h3>
        <SDropdownList
          dropUp
          textField="choice"
          value={input.type}
          data={typeChoices}
          clearTagIcon={"times"}
          onChange={handleChange}
        />
        <h3>Sort by </h3>
        <SDropdownList
          dropUp
          textField="choice"
          value={input.sort}
          data={sortChoices}
          onChange={handleChange}
        />
        <h3>Cuisine </h3>
        <SDropdownList
          dropUp
          textField="choice"
          value={input.cuisine}
          data={cuisineChoices}
          onChange={handleChange}
        />
        <h3>Maximum Ready Time (Minutes) </h3>
        <SNumberPicker
          value={input.maxReadyTime}
          step={10}
          min={0}
          onChange={handleNumberPickerChange}
        />
        <br />
        <button
          class="button-4"
          onClick={() => {
            getRecipe();
          }}
        >
          Filter
        </button>
        <button
          class="button-4"
          onClick={() => {
            resetSelected();
          }}
        >
          Reset
        </button>
      </SearchBar>
      <Grid>
        {apiResult.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}
const SDropdownList = styled(DropdownList)`
  width: 100%;
`;

const SNumberPicker = styled(NumberPicker)`
  width: 50%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  h3 {
    padding: 1rem;
    white-space: nowrap;
  }
  .rw-widget {
    font-size: 0.8rem;
  }
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    object-fit: cover;
  }
  a {
    text-decoration: none;
  }
  h2 {
    text-align: center;
    padding: 1rem;
    color: rgb(19, 18, 18);
  }
`;

export default Filter;
