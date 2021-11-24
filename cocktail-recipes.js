// https://www.thecocktaildb.com/api.php

class CocktailRecipes{
    
    cocktailPane = document.querySelector('.cocktailsearchresults');
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    constructor(){
       
    }

    getFetch(){
        return fetch(this.url)
    }

    render(){
        //let favmealsarr = []
        document.addEventListener('DOMContentLoaded', () =>{

            document.getElementById("cocktail-searchbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("cocktail-search").value;
                this.url += searchValue;

                let cocktailContent = "";
                
                let resp = await this.getFetch();
                let data = await resp.json();
                console.log(data);

                if(searchValue === ''){
                    alert("Please enter a keyword.")
                }else{
                    if(data.drinks === null){
                        alert(`No results available for ${searchValue}. Please try another keyword.`);
                        document.getElementById("cocktail-search").value = '';
                        this.url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
                    }
    
                    let randomInt = Math.floor(Math.random() * data.drinks.length);
    
                    let strDrink = data.drinks[randomInt].strDrink;
                    let strInstructions = data.drinks[randomInt].strInstructions;
                    let strThumb = data.drinks[randomInt].strDrinkThumb;
                    //console.log(data.drinks[randomInt].strDrink);
    
                    cocktailContent = `
                    <div class="row">
                        <div class="column cocktailinfo">
                            <h3 class="mealtitle">${strDrink}</h3>
                            <p>Instructions: ${strInstructions}</p><br>
                            
                        </div>
                        <div class="column cocktailimg">
                            <img src ="${strThumb}" alt = "" style="width: 90%">
                            <button class="addCocktail">Add to Favorites</button>
                        </div>
                    </div>
                    `
                    this.cocktailPane.innerHTML = cocktailContent;
                    document.getElementById("cocktail-search").value = '';
                    this.url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

                    const favmealsUl = document.querySelector('#favmealss');
                    document.body.addEventListener('click', event => {
                        // console.log(event);
                        // console.log(event.target);

                        if (event.target.className === 'addCocktail') {
                            event.preventDefault();
                            //let favmeal = document.querySelector('#favmeals').value;
                            let favmealLi = document.createElement('li');
                            favmealLi.innerHTML = `${strDrink} <p></p><button class="delete">Remove</button>`;
                            favmealsUl.appendChild(favmealLi);
                        }
                    })

                    // async function addtolist(){
                    //     favmealsUl.innerHTML = ''
                    //     favmealsarr.push(`<li>${strDrink} <p></p><button class="delete">Remove</button></li>`)
                    //         let nodeDup = [...new Set(favmealsarr)];
                    //         favmealsUl.innerHTML = nodeDup.join('')
                    // }
                    // const favmealsUl = document.querySelector('#favmealss');
                    // document.body.addEventListener('click', event => {
                    //     // console.log(event);
                    //     // console.log(event.target);
                    //     if (event.target.className === 'addCocktail') {
                    //         event.preventDefault();
                    //         addtolist();
                    //     }
                    // })
                }
            })
        })
    }
}

export default CocktailRecipes;