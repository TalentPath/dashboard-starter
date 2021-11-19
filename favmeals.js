class FavMealsList {

    //favMealsPane = document.querySelector('#favelistview');
    constructor(){}

    render() {
        let favMealsListForm = document.getElementsByClassName("form2");
        console.log('todolistform', faveMealsListForm);
        // Do something when form is submitted
        const favmealsUl = document.querySelector('#favmealss')
        favMealsListForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let favmeal = document.querySelector('#favmeals').value;
            let favmealLi = document.createElement('li');
            favmealLi.innerHTML = `${favmeal} <button class="delete">x</button>`;
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