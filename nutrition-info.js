//https://fdc.nal.usda.gov/api-key-signup.html

class NutritionInfo{
    api_key = '9b4V7GqPvj8MtNh9x165FjzGJQvImDzu';
    gifArr = ['cat','dog','horse','hamster']
    gifPane = document.querySelector('.pane2');
    //url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=grape&pageSize=5&api_key=1JTshoMpKIsf15n7t2CXkzrPXCpq0maUdbxtXkWX'
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

        // fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=grape&pageSize=5&api_key=1JTshoMpKIsf15n7t2CXkzrPXCpq0maUdbxtXkWX').then(response => response.json()).then(content =>{
        //     //console.log(content.foods[0].description); 
        //     //array1.forEach(element => console.log(element));
        //     content.foods.forEach(element => console.log(element.description))
        //   })

    }



}

export default NutritionInfo;