


// this redirects to the registration page if user doesnt have a login
function registration() {
    window.location.href = "register.html";
}

// this is for the logout function
function logout() {
    localStorage.removeItem("user");
    alert ("You have been logged out.");
    window.location.href = "login.html";
}

//this is for the registration form submission
function register() {
    let username = document.getElementById("Username").value.trim();
    let email = document.getElementById("Email").value.trim();
    let password = document.getElementById("Password").value.trim();
    let confirmPassword = document.getElementById("ConfirmPassword").value.trim();

// to alert user that all fields must be filled out 
    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }


//checking if the passwords are matching 
if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
}

// this will save the user information to the local storage
    const user = {username, email, password};
    localStorage.setItem("user", JSON.stringify(user));

// redirecting to the main page after finishing registration and passwords match 

    alert("Successful Registration");
    window.location.href ="home.html";

}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginError = document.getElementById("loginError");

    if (!username || !password) {
        if (loginError) {
            loginError.textContent = "Please fill in all fields.";

        } else { 
            alert("Please fill in all fields.");
        }
        return;
    }


const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

if (savedUser && savedUser.username.toLowerCase() === username.toLowerCase() && savedUser.password === password) {
    if (loginError) loginError.textContent = "";
    alert("Login successful!");
    window.location.href = "home.html";

} else { 
    if (loginError) {
        loginError.textContent = "Invalid username or password. Please try again.";
    
    } else {
        alert("Invalid username or password. Please try again.")
        }
    }
}

function addFood() {
    const foodName = document.getElementById("foodName").value.trim();
    const foodCalories = parseInt(document.getElementById("foodCalories").value.trim(), 10);

    if (!foodName || isNaN(foodCalories) || foodCalories <= 0) {
        alert("Please enter valid food and calorie values,");
        return;
    }

    let caloriesConsumedElement = document.getElementById("caloriesConsumed");
    let progressElement = document.getElementById("calorieProgress");

    if (caloriesConsumedElement && progressElement) {
        let currentCalories = parseInt(caloriesConsumedElement.textContent) || 0;
        currentCalories += foodCalories; 

        caloriesConsumedElement.textContent = currentCalories;
        progressElement.value = currentCalories;

        localStorage.setItem("caloriesConsumed", currentCalories);

        alert(`${foodName} added successfully! Added ${foodCalories} calories.`);

        document.getElementById("addFoodForm").reset();
    } else {
        alert("Unable to log food. Please check your information.");
    }

}

function restrictAccess() {
    let restrictedPages = ["home.html", "profile.html", "recipes.html", "more.html"];
    let currentPage = window.location.pathname.split("/").pop().toLowerCase();
    let loggedInUser = JSON.parse(localStorage.getItem("user"));

    if(restrictedPages.includes(currentPage) && !loggedInUser) {
        alert("You must be logged in to access this page.");
        window.location.href = "login.html"
    }
}


function displayWelcomeMessage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const welcomeElement = document.getElementById("Welcome");


    if (user && user.username && welcomeElement) {
        welcomeElement.textContent = `Welcome, ${user.username}!`;

    }
}

function profileDisplay(){
    const websiteUser =JSON.parse(localStorage.getItem("user"));
    const textUser = document.getElementById("profileUsername");
    const textEmail = document.getElementById("profileEmail");

    
    if(websiteUser && websiteUser.username){
        textUser.textContent= `${websiteUser.username}`;
        textEmail.textContent= `${websiteUser.email}`; 
    }

}



function loadCalories() {
    const caloriesConsumedElement = document.getElementById("caloriesConsumed");
    const progressElement = document.getElementById("calorieProgress");

    if(caloriesConsumedElement && progressElement) {
        const currentCalories = parseInt(localStorage.getItem ("caloriesConsumed")) || 0;
        caloriesConsumedElement.textContent = currentCalories;
        progressElement.value = currentCalories;

    }

}

function resetProgress() {
    const caloriesConsumedElement = document.getElementById("caloriesConsumed");
    const progressElement = document.getElementById("calorieProgress");

    if (caloriesConsumedElement && progressElement) {
        caloriesConsumedElement.textContent = 0;
        progressElement.value = 0;

        localStorage.setItem("caloriesConsumed", 0);

        alert("Daily calorie progress has been reset!");
    }
}

    document.addEventListener("DOMContentLoaded", function () {
        const registrationForm = document.getElementById("registrationForm");
        const loginForm = document.getElementById("login");
        const addFoodForm = document.getElementById("addFoodForm");
        const resetButton = document.getElementById("resetProgress");
        const logoutLink = document.querySelector("a.logout"); 
        
        if (registrationForm) {
            registrationForm.addEventListener("submit", function (event) {
                event.preventDefault();
                register();
            });
        }

        if (loginForm) {
            loginForm.addEventListener("submit", function (event) {
                event.preventDefault();
                login();

            });
        }

        if (addFoodForm){
            addFoodForm.addEventListener("submit", function (event) {
                event.preventDefault();
                addFood();
            });
        }

        if(resetButton) {
            resetButton.addEventListener("click", function () {
                resetProgress();
            });
        }

        if (logoutLink) {
            logoutLink.addEventListener("click", function (event) {
                event.preventDefault();
                logout();
            });
        }

        displayWelcomeMessage();
        loadCalories();
        restrictAccess();



        profileDisplay();

    });

    function viewRecipe(recipeId){

        let titleRecipe ='';
        let recipeDescription ='';

        document.getElementById("recipeView").style.display = "block";
        
        if (recipeId == '1'){
            titleRecipe = "Healthy Breakfast";
            recipeDescription = "This is a great food. So amazing too. Also, under only 600 calories!<br>Fruits.<br>Chia Seeds.<br>Avacado.<br>blueberries.";
        }else if (recipeId == '2'){
            titleRecipe = "Healthy Snack";
            recipeDescription = "This is a great snack on the go. Trust me, you won't miss it! Also, under only 100 calories!<br>Carrots.<br>cucumbers.<br>Tomatoes.";
        }

        let newWindow = window.open("","_blank","width=600,height=400");
        newWindow.document.write(`<!DOCTYPE html> <html><head><title>${titleRecipe}</title></head>
            <body>
            <div class = "popup-container">
            <h2>${titleRecipe}</h2>
            <P>${recipeDescription}</p>
            <button class = "close-btn" onclick = "window.close()">Close</button>
            </div>

            </body>


            <style>
            body {font-family: Arial, sans-serif;
            margin:0;
            padding: 0;
            background-color: #f4f4f4;

            }

            .popup-container{
            width:100%;
            height:100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            padding: 15px;
            box-sizing: border-box;
            }

            h2{
            font-size: 25px;
            color: #333;

            }

            p{
            font-size: 15px;
            color: grey;
            text-align: center;
            max-width: 400px;
            margin: 0;
            }

            .close-btn{
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff4d4d;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 15px;

            }

            .close-btn:hover{
            background-color: #ff4d4d;
            }
            </style>

            </html>`);

   
            newWindow.onload = function(){

                newWindow.document.title = titleRecipe;
            }

    }

    function closeRecipe(){
        document.getElementById("recipeView").style.display = "none";
    }

    window.onclick=function(event){
        let view = document.getElementById("recipeView");
        if(event.target == view){
            view.style.display = "none";
        }
    }

    function updateProfile(event){
        event.preventDefault();

        const updateUser = document.getElementById("newUsername").value.trim();
        const updateEmail = document.getElementById("newEmail").value.trim();

        if(!updateUser || !updateEmail){
            alert("Both username and email are required!");
            return;
        }
         
        const websiteUser = JSON.parse(localStorage.getItem("user"));
        if(websiteUser){
            websiteUser.username=updateUser;
            websiteUser.email= updateEmail;

            localStorage.setItem("user",JSON.stringify(websiteUser));

            alert("Profile successfully updated!");

            profileDisplay();

            document.getElementById("profileUpdateForm").reset();


        }else{
            alert("Error. No user or email data found");
        }
        
    }

    document.addEventListener("DOMContentLoaded",function(){
        const formUpdate = document.getElementById("profileUpdateForm");

        if(formUpdate){
            formUpdate.addEventListener("submit",updateProfile);
        }

        profileDisplay();
    });

   function createRecipe(){
    let rName = document.getElementById("rName").value.trim();
    let rCalories = document.getElementById("rCalories").value.trim();
    let rDescription = document.getElementById("rDescription").value.trim();
    let rImg = document.getElementById("rImg").files[0];

    if(!rName || !rCalories || !rDescription || !rImg){
        alert("All fields are required");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event){
        const recipe = { rName, rCalories, rDescription, rImg: event.target.result};

        localStorage.setItem("recipe", JSON.stringify(recipe));

        alert("'Successful Creation");
        document.getElementById("formR").reset();


    }

    reader.readAsDataURL(rImg);


   }

   window.onload = function(){

    const sRecipe = JSON.parse(localStorage.getItem("recipe"));
    if(sRecipe){
        document.getElementById("pName").textContent = sRecipe.rName;
        document.getElementById("pCalories").textContent = `Calories: ${sRecipe.rCalories}`;
        document.getElementById("pDescription").textContent = sRecipe.rDescription;
        document.getElementById("pImg").src = sRecipe.rImg;

    }
   };

   function contactForm(event){
    event.preventDefault();
   

   let cName = document.getElementById("ContactName").value.trim();
   let cEmail = document.getElementById("ContactEmail").value.trim();
   let cMssge = document.getElementById("ContactTextArea").value.trim();

   if(!cName || !cEmail || !cMssge){
    alert("All Fields Required");
    return;
   }

   const contactD = {
    name: cName, email: cEmail, message: cMssge
   };
   localStorage.setItem("contactD",JSON.stringify(contactD));

   alert("Message Saved");

   document.getElementById("Contact").reset();

}


