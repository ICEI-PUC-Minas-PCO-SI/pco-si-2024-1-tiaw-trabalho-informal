function getIconProfile(){  
    showloading();   
    var profile = localStorage.getItem('profile');       
    
    if (profile) {
        document.getElementById('userButtons').style.display = 'none';
        document.getElementById('profileIcon').style.display = 'block';
    }    
}


function getData() {
    showloading(); 
    var jsonData = localStorage.getItem('formData');
    var formData = JSON.parse(jsonData);
  
    console.log("Dados salvos:");
    console.log(formData);
}

function showloading(){
    const div = document.createElement("div");
    div.classList.add("loading", "text-primary");
    
    const img = document.createElement("img");
    img.setAttribute('src', 'https://i.pinimg.com/originals/c0/30/03/c03003776e9cb3e20ba7bd3171700507.gif');
    
    const label = document.createElement("label");
    label.innerText = "\nCarregando...";
    
    div.appendChild(label);
    div.appendChild(img);
    document.body.appendChild(div);
    
    setTimeout(() => hideloading(), 2000);
}

function hideloading(){
    const loadings = document.getElementsByClassName("loading");
    while (loadings.length > 0) {
        loadings[0].remove();
    }
}
