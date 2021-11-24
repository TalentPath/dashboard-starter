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
        //let favmealsarr = []
        document.addEventListener('DOMContentLoaded', () => {

            document.getElementById("meal-searchbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("meal-search").value;
                this.url += searchValue;
                console.log(this.url)
                let mealContent = "";

                let resp = await this.getFetch();
                let data = await resp.json();
                console.log(data)

                if (searchValue === '') {
                    alert("Please enter a keyword.")
                } else {
                    if (data.meals === null) {
                        alert(`No results available for ${searchValue}. Please try another keyword.`);
                        document.getElementById("meal-search").value = '';
                        this.url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
                    }

                    let randomInt = Math.floor(Math.random() * data.meals.length)

                    let strMeal = data.meals[randomInt].strMeal;
                    let strCategory = data.meals[randomInt].strCategory;
                    let strArea = data.meals[randomInt].strArea;
                    let strSource = data.meals[randomInt].strSource;
                    let strYoutube = data.meals[randomInt].strYoutube;
                    let strThumb = data.meals[randomInt].strMealThumb;

                    console.log(data.meals[randomInt]);

                    mealContent = `
                    <div class="row">
                        <div class="column mealinfo">
                            <h3 class="mealtitle">${strMeal}</h3>
                            <p>Category: ${strCategory}</p>
                            <p>Area: ${strArea}</p>
                            <p><a href="${strSource}" target="_blank">Source</a></p>
                            <p><a href="${strYoutube}" target="_blank">Youtube</a></p>
                        </div>
                        <div class="column mealimg">
                            <img src ="${strThumb}" alt = "" style="width: 90%">
                            <button class="add">Add to Favorites</button>
                            </div>
                    </div>
                    `
                    this.mealPane.innerHTML = mealContent;
                    document.getElementById("meal-search").value = '';
                    this.url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
                    


                    const favmealsUl = document.querySelector('#favmealss');
                    document.body.addEventListener('click', event => {
                        // console.log(event);
                        // console.log(event.target);

                        if (event.target.className === 'add') {
                            event.preventDefault();
                            //let favmeal = document.querySelector('#favmeals').value;
                            let favmealLi = document.createElement('li');
                            favmealLi.innerHTML = `${strMeal} <p><a href="${strSource}" target="_blank" style="color:lightblue">Source</a><br><a href="${strYoutube}" target="_blank" style="color:lightblue">YouTube</a></p><button class="delete">Remove</button>`;
                            favmealsUl.appendChild(favmealLi);   
                        }
                    })

                    // async function addtolist(){
                    //     favmealsUl.innerHTML = ''
                    //     favmealsarr.push(`<li>${strMeal} <p><a href="${strSource}" target="_blank" style="color:lightblue">Source</a><br><a href="${strYoutube}" target="_blank" style="color:lightblue">YouTube</a></p><button class="delete">Remove</button></li>`)
                    //         let nodeDup = [...new Set(favmealsarr)];
                    //         favmealsUl.innerHTML = nodeDup.join('')
                    //         // console.log(favmealLi)
                    //         // console.log([...new Set(favmealsarr)]);
                    // }
                    // const favmealsUl = document.querySelector('#favmealss');
                    // document.body.addEventListener('click', event => {
                    //     // console.log(event);
                    //     // console.log(event.target);
                    //     if (event.target.className === 'add') {
                    //         event.preventDefault();
                    //         addtolist();
                    //     }
                    // })
                }
            })
        });
    }
}

export default MealRecipes;