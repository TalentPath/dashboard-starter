//https://www.themealdb.com/api.php

class MealRecipes{
    api_key = '9b4V7GqPvj8MtNh9x165FjzGJQvImDzu';
    gifArr = ['cat','dog','horse','hamster']
    gifPane = document.querySelector('.pane2');
    //url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=burger'
    constructor(){
       
    }

    getGif(search){
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${search}&limit=1`)
    }

    
    render(){
        let counter =0;
        setInterval(async()=>{
            if(counter===this.gifArr.length) counter=0;
            let resp = await this.getGif(this.gifArr[counter])
            let {data} = await resp.json();
            let imgUrl = data[0].images.original.url;
            this.gifPane.innerHTML=`<img class="gif" src="${imgUrl}" alt="${this.gifArr[counter]}"/>`
            counter++;
        },5000);

    //     fetch(url)
    // .then(response => response.json())
    // .then(content => {
    //     console.log(content.meals[0].strArea)
    // })
    // })

    }



}

export default MealRecipes;