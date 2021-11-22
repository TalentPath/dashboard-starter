import RandomFoodPic from './random-food-pic.js';
import ToDoList from './todolist.js';
import FavMealsList from './favmeals.js'
import MealRecipes from './meal-recipes.js'
import CocktailRecipes from './cocktail-recipes.js';
import NutritionInfo from './nutrition-info.js';

// let foodpic = new RandomFoodPic();
// foodpic.render();

let favlist = new FavMealsList();
favlist.render();

let todolist = new ToDoList();
todolist.render();

let mealrecipes = new MealRecipes();
mealrecipes.render();

let cocktailrecipes = new CocktailRecipes();
cocktailrecipes.render();

let nutritionifo = new NutritionInfo();
nutritionifo.render();