document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  showloading();
  var erro = document.getElementById("erro");
  erro.innerHTML = ""; 

  var email = document.getElementById("email").value;
  var regexp =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  
  if (!regexp.test(email)) {
    var emailError = document.createElement("h3");
    emailError.classList.add("error-message");
    emailError.textContent = "Por favor insira um e-mail válido.";
    erro.appendChild(emailError);
    return;
  }

  if (password !== confirmPassword) {
    var passwordError = document.createElement("h3");
    passwordError.classList.add("error-message");
    passwordError.textContent = "As senhas não coincidem.";
    erro.appendChild(passwordError);
    return;
  }

  var formData = {
    "email": email,
    "password": password,
    "confirmPassword": confirmPassword
  };

  var jsonData = JSON.stringify(formData);
  localStorage.setItem('formData', jsonData);
  localStorage.setItem('profile', 'created');
  window.location.href = "pos-login.html";
});


document.addEventListener('DOMContentLoaded', function() {
  const profileIcon = this.getElementById("profileIcon");

  profileIcon.style.addEventListener('click', function(){
       logoutSite();
  });
  
  
  function logoutSite(){
    localStorage.removeItem('profile');
    window.location.href = "index.html";
  }
});
