//https://fdc.nal.usda.gov/api-key-signup.html

class NutritionInfo {

    nutritionPane = document.querySelector('.nutritionsearchresults');
    API_key = '1JTshoMpKIsf15n7t2CXkzrPXCpq0maUdbxtXkWX';
    url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.API_key}&pageSize=5&query=`
    constructor() {

    }

    getFetch() {
        return fetch(this.url);
    }

    render() {

        document.addEventListener('DOMContentLoaded', () => {

            document.getElementById("nutrition-searchbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("nutrition-search").value;
                this.url += searchValue;

                let nutritionContent = "";

                let resp = await this.getFetch();
                let data = await resp.json();

                console.log(data)

                if (searchValue === '') {
                    alert("Please enter a keyword.")
                } else {

                    if(data.foods.length === 0){
                        alert(`No results available for ${searchValue}. Please try another keyword.`);
                        document.getElementById("nutrition-search").value = '';
                        this.url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.API_key}&pageSize=5&query=`;    
                    }

                    let randomInt = Math.floor(Math.random() * data.foods.length)

                    let description = data.foods[randomInt].description;
                    let foodCategory = data.foods[randomInt].foodCategory;
                    let proteinObj = {
                        nutrientName: data.foods[randomInt].foodNutrients[0].nutrientName,
                        nutrientValue: data.foods[randomInt].foodNutrients[0].value,
                        nutrientUnitName: data.foods[randomInt].foodNutrients[0].unitName
                    };
                    let carbObj = {
                        nutrientName: data.foods[randomInt].foodNutrients[2].nutrientName,
                        nutrientValue: data.foods[randomInt].foodNutrients[2].value,
                        nutrientUnitName: data.foods[randomInt].foodNutrients[2].unitName
                    };
                    let totalFatObj = {
                        nutrientName: data.foods[randomInt].foodNutrients[1].nutrientName,
                        nutrientValue: data.foods[randomInt].foodNutrients[1].value,
                        nutrientUnitName: data.foods[randomInt].foodNutrients[1].unitName
                    };

                    nutritionContent = `
                        <h3>${description}</h3>
                        <p>Category: ${foodCategory}</p><br>
                        <p>${proteinObj.nutrientName}: ${proteinObj.nutrientValue} ${proteinObj.nutrientUnitName}
                        <p>${carbObj.nutrientName}: ${carbObj.nutrientValue} ${carbObj.nutrientUnitName}
                        <p>${totalFatObj.nutrientName}: ${totalFatObj.nutrientValue} ${totalFatObj.nutrientUnitName}
                        `
                    this.nutritionPane.innerHTML = nutritionContent;
                    document.getElementById("nutrition-search").value = '';
                    this.url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.API_key}&pageSize=5&query=`
                }


            })
        })
    }
}

export default NutritionInfo;