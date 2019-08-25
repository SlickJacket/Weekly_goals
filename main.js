document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector("h1")
    const h2 = document.querySelector(".goalformday")
    const dayContainer = document.getElementById("week")
    // const setGoalform = document.querySelector("#setGoalform")
    // const goalsList = document.getElementById("goalslist")
    const ul = document.getElementsByClassName("goal-list")[0]

    

    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(showUsers)

    // function showUser(user) {
        
    //     const li = document.createElement("li")
    //     li.innerHTML =` My name is ${user.name}, and I want ${user.end_goal}`
        
        // }

    function showUsers(users) {
        let user = users[0]
        h1.innerText = `Welcome, Back!`
    }


    fetch("http://localhost:3000/days")
    .then(res => res.json())
    .then(renderDays)

    function renderDays(days) {
    
        days.forEach(function(day) {
            dayContainer.innerHTML += `<div class="days" id="${day.name}" data-id=${day.id} ><p>${day.name}</p></div>`
        })
        
    }

    dayContainer.addEventListener("click", function(event) {
        
        if (event.target.className === "days") {
            fetch(`http://localhost:3000/days/${event.target.dataset.id}`)
            .then(res => res.json())
            .then(renderDayToForm)

            function renderDayToForm(days) {
                h2.id = days.id
                h2.innerText = days.name
                ul.innerHTML=""
                
                days.goals.forEach(function(goal) {
                ul.innerHTML +=`<li id=${goal.id}> ${goal.content}</li>`
                
                })
            }
        }   
    })

    const form1 = document.getElementById("form1")

    form1.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let input = form1.querySelector("input")
        let inputValue = input.value
        console.log("before fetch")
        console.log(h2.id)
        
        fetch("http://localhost:3000/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                    content: inputValue,
                    user_id: 1,
                    day_id: `${h2.id}`
            })
        })
        .then(res => res.json())
        .then(PostToGoalList)

        function PostToGoalList(goal) {
            input.value = ""
            ul.innerHTML += `
            <li id=${goal.id}>${goal.content}</li>`
        }

    })


    const editbtn = document.getElementsByClassName("edit")
    const deletebtn = document.getElementsByClassName("complete")

    ul.addEventListener("click", function(event) {

        if (event.target.id) {
            
            editbtn.id = event.target.id
            deletebtn.id = event.target.id
        }
        document.getElementById('buttonsDiv').style.display='block'

    })



    const body = document.querySelector("body")
    const divv = document.getElementById("buttonsDiv")
    const updateBtn = document.getElementsByClassName("updateBtn")


    // console.log(divv)
    divv.addEventListener("click", function(event) {
        
        if (event.target === document.getElementsByClassName("edit")[0]) {
        updateBtn.id = editbtn.id
        
        document.getElementById('disablingDiv').style.display='block';
        document.getElementById('editDiv').style.display='block';
        }

        if (event.target === document.getElementsByClassName("complete")[0]) {

            fetch(`http://localhost:3000/goals/${deletebtn.id}`, {
                method: "DELETE"
            })

            let li = document.getElementById(deletebtn.id)
            li.remove()
            document.getElementById("buttonsDiv").style.display='none';
        }


        
        // console.log(updateBtn.id)
    })

    const form2 = document.getElementById("form2")

    form2.addEventListener("submit", function() {
        event.preventDefault();
        let inputForm2 = form2.querySelector("input")
            console.log(updateBtn.id)

            if (inputForm2.value != "") {
        
        fetch(`http://localhost:3000/goals/${updateBtn.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                    content: inputForm2.value
            })
            })
            .then(res => res.json())
            .then(function(goal){
                let li = document.getElementById(`${goal.id}`)
                li.innerText = inputForm2.value
            })

            
        
        document.getElementById('disablingDiv').style.display='none';
        document.getElementById("editDiv").style.display='none';
        document.getElementById("buttonsDiv").style.display='none';
            }

    })

        

        // deletebtn.addEventListener("click", function() {

        //     console.log(deletebtn.id)
        // })





    

})

