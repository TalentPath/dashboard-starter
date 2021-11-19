class Giphy{
    
    gifPane = document.querySelector('.pane4');
    constructor(){
       
    }

    getGif(){
        return fetch(`https://foodish-api.herokuapp.com/api/`)
    }

    
    render(){
        //let counter =0;
        setInterval(async()=>{
            //if(counter===this.gifArr.length) counter=0;
            let resp = await this.getGif()
            let data = await resp.json();
            let imgUrl = data.image;
            console.log(data.image);
            this.gifPane.innerHTML=`<p>Need inspiration?</p><img class="gif" src="${imgUrl}" alt="random food pic"/>`
            //counter++;
        },60000);
    }
}

export default Giphy;