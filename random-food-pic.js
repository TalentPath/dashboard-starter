class RandomFoodPic{
    
    foodPicPane = document.querySelector('.pane5');
    constructor(){
       
    }

    getRandomFoodPic(){
        return fetch(`https://foodish-api.herokuapp.com/api/`)
    }

    render(){
        setInterval(async()=>{
            let resp = await this.getRandomFoodPic()
            let data = await resp.json();
            let imgUrl = data.image;
            console.log(data.image);
            this.foodPicPane.innerHTML=`<p>Need inspiration?</p><img class="gif" src="${imgUrl}" alt="random food pic"/>`
        },10000);
    }
}

export default RandomFoodPic;