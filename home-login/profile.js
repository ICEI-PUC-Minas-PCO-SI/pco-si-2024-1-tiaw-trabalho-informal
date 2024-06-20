function getIconProfile(){

    var profile = localStorage.getItem('profile');
    
    if (profile) {
        document.getElementById('userButtons').style.display = 'none';
        document.getElementById('profileIcon').style.display = 'block';
    }
}


function getData() {
  
    var jsonData = localStorage.getItem('formData');
    var formData = JSON.parse(jsonData);
  
    console.log("Dados salvos:");
    console.log(formData);
  }