class FavMealsList {

    constructor(){}

    render() {
        let favMealsListForm = document.querySelector(".form2");
        //console.log('todolistform', faveMealsListForm);
        const favmealsUl = document.querySelector('#favmealss');
        favMealsListForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let favmeal = document.querySelector('#favmeals').value;
            let favmealLi = document.createElement('li');
            favmealLi.innerHTML = `${favmeal} <button class="delete">Remove</button>`;
            favmealsUl.appendChild(favmealLi);
            document.getElementById("favmeals").value = ''
        });

        document.body.addEventListener('click', event => {
            // console.log(event);
            // console.log(event.target);

            if (event.target.className === 'delete') {
                let li = event.target.parentNode;
                li.remove();
            }

        })
    }

}

export default FavMealsList