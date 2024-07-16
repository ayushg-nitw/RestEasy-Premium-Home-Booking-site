// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();


  // star setting javascript
  document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');

     stars.forEach((star,i)=>{

      star.onclick = function(){
        const StarsGiven= i+1;
         stars.forEach((star,j)=>{
            if( StarsGiven >= (j+1) ){
              star.innerHTML='&#9733';
            }
            else  star.innerHTML='&#9734';
         });
         const Rated=document.getElementById('totalStars');
         Rated.value=StarsGiven;
      }
     
     });

  });

  //triggering delete button with xmark

  document.addEventListener('DOMContentLoaded', function() {
    // Get the delete icon elements
    const deleteIcons = document.querySelectorAll('.delete-icon');
    
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function() {
           
            const deleteButton = this.closest('.card-body').querySelector('.delete-button');
            if (deleteButton) deleteButton.click();
        });
    });
});


//preview image opening 

document.getElementById('currentImageLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelector('.popup-image').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
  document.querySelector('.popup-image').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
});





