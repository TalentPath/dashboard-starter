// https://www.thecocktaildb.com/api.php

class CocktailRecipes{
    
    cocktailPane = document.querySelector('.cocktailsearchresults');
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    constructor(){
       
    }

    getFetch(search){
        return fetch(this.url)
    }

    render(){
        
        document.addEventListener('DOMContentLoaded', () =>{

            document.getElementById("cocktail-searchbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("cocktail-search").value;
                this.url += searchValue;

                let cocktailContent = "";
                
                let resp = await this.getFetch();
                let data = await resp.json();
                console.log(data);

                if(data.drinks === null){
                    alert(`No results available for ${searchValue}. Please try another keyword.`)
                }

                let randomInt = Math.floor(Math.random() * data.drinks.length);

                let strDrink = data.drinks[randomInt].strDrink;
                let strInstructions = data.drinks[randomInt].strInstructions;
                let strThumb = data.drinks[randomInt].strDrinkThumb;
                //console.log(data.drinks[randomInt].strDrink);

                cocktailContent = `
                <h3>${strDrink}</h3>
                <p>Instructions: ${strInstructions}</p><br>
                <img src ="${strThumb}" alt = "" style="width: 50%">
                `

                this.cocktailPane.innerHTML = cocktailContent;
            })
        })
    }
}

export default CocktailRecipes;