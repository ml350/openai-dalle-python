(function() {
    console.log('Logging... Welcome.');
    console.log('Form ID: ' + form);
    console.log('Endpoint: ' + endpoint);
    console.log('Type: ' + type); 
     
        function onSubmit(){  
            event.preventDefault();
            // Execute the reCAPTCHA verification
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdeTdAjAAAAAPGWzX9fKu4lUXMeef2zaAhs-nXy', { action: 'submit' }).then(function(token) {
                   // Add the reCAPTCHA token to the request header
                   const f = document.getElementById(form);
                   const csrf_token = document.getElementsByName("csrf_token")[0].value;  
    
                   const imageContainer = document.getElementById('image-container');
                   const linkContainer = document.getElementById('link-container'); 
                   // Show loader on submiting form
                   document.getElementById('loader').style.display = 'block';
                   // Disable submit button of form while fetching
                   document.getElementById('g-recaptcha-button').disabled = true;
                   // Remove all child nodes of the image container
                   if (imageContainer.firstChild) {
                       while (imageContainer.firstChild) {
                           imageContainer.removeChild(imageContainer.firstChild);
                       }
                   }
   
                   if (linkContainer.firstChild) {
                       while (linkContainer.firstChild) {
                           linkContainer.removeChild(linkContainer.firstChild);
                       }
                   }  
                   console.log(document.getElementById('variations-form'));
                   var form = new FormData(document.getElementById('variations-form')); 
                   form.append("csrf_token", csrf_token);
                   var xhr = new XMLHttpRequest();
                   xhr.open("POST", "/image-variations", true);
                   xhr.onload = function() {
                       if (xhr.status === 200) {
                           var response = JSON.parse(xhr.responseText);
                           // Creating new elements for link and generated image
                           const image = document.createElement('img');
                           const url = document.createElement('a');
                           image.src = response.url;
                           url.href = response.url;
                           url.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg><span> Download Image </span>';
                           url.target = '_blank';
                           imageContainer.appendChild(image);
                           linkContainer.appendChild(url);
                           // Hide loader on image loading
                           document.getElementById('loader').style.display = 'none';
                           // Enable submit form button
                           document.getElementById('g-recaptcha-button').disabled = false;
                           console.log(response.url);
                       } else {
                           console.error("Error: " + xhr.status); 
                           document.getElementById('loader').style.display = 'none';
                       }
                   };
                   xhr.send(form); 
                });
            });  
        }
        window.onSubmit = onSubmit; 
 }).call(this);
 
 