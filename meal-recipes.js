//https://www.themealdb.com/api.php

class MealRecipes {

    mealPane = document.querySelector('.mealsearchresults');
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    constructor() {

    }

    getFetch() {
        return fetch(this.url);
    }

    render() {

        document.addEventListener('DOMContentLoaded', () => {

            document.getElementById("meal-searchbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("meal-search").value;
                this.url += searchValue;

                let mealContent = "";
                
                let resp = await this.getFetch();
                let data = await resp.json();

                if(data.meals === null){
                    alert(`No results available for ${searchValue}. Please try another keyword.`)
                }

                let randomInt = Math.floor(Math.random() * data.meals.length)

                let strMeal = data.meals[randomInt].strMeal;
                let strCategory = data.meals[randomInt].strCategory;
                let strArea = data.meals[randomInt].strArea;
                let strSource = data.meals[randomInt].strSource;
                let strYoutube = data.meals[randomInt].strYoutube;
                let strThumb = data.meals[randomInt].strMealThumb;

                console.log(this.url)
                console.log(data.meals[randomInt]);

                mealContent = `
                <h3>${strMeal}</h3>
                <p>Category: ${strCategory}</p><br>
                <p>Area: ${strArea}</p><br>
                <p><a href="${strSource}" target="_blank">Source</a></p><br>
                <p><a href="${strYoutube}" target="_blank">Youtube</a></p><br>
                <img src ="${strThumb}" alt = "" style="width: 50%">
                `
                this.mealPane.innerHTML = mealContent;
                document.getElementById("meal-search").value = '';
                
            })
        });
    }
}

export default MealRecipes;