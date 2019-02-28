var body = document.querySelector("body");
var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var u;

function initializeColor(){
    window.firebase.database().ref('/' + u.uid + '/color').once('value').then(function(snapshot){
        body.style.backgroundColor = snapshot.val();
    });
}


body.addEventListener("click", function(e){
    var currentColor = body.style.backgroundColor;
    var currentColorPosition = colors.indexOf(currentColor);
    var newColorName;
    if((currentColorPosition == -1) || (currentColorPosition == (colors.length - 1))){
        newColorName = colors[0];
    } else{
        newColorName = colors[currentColorPosition + 1];
    }
    window.firebase.database().ref('/' + u.uid + '/color').set(newColorName);
    body.style.backgroundColor = newColorName;
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       u = user;
       initializeColor();
    } else{
        window.location.href = "./authenticate.html"
    }
});