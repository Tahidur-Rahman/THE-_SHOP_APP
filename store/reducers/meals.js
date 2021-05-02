import { MEALS } from "../../src/constants/DummyData";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => (meal.id = action.mealId)
      );
      if (existingIndex >= 0) {
        const updatedFavorite = [...state.favoriteMeals];
        updatedFavorite.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavorite };
      } else {
        const newMeal = state.meals.find((meal) => (meal.id = action.mealId));
        return { ...state, favoriteMeals: state.favoriteMeals.concat(newMeal) };
      };
      case SET_FILTERS:
          const appliedFilters = action.filters;
          const updatedFilteredMeals = state.meals.filter(meal=>{
              if(appliedFilters.GlutinFree && !meal.isGlutinFree){
                  return false
              }
              if(appliedFilters.Vegan && !meal.isVegan){
                  return false
              }
              if(appliedFilters.Vegetarian && !meal.isVegetarian){
                  return false
              }
              if(appliedFilters.LactoseFree && !meal.isLactoseFree){
                  return false
              }
              return true
          });
          return {...state,filteredMeals:updatedFilteredMeals}
    default:
      return state;
  }
};

export default mealsReducer;
