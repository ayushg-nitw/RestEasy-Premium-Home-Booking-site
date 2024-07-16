document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const selectedImage = document.getElementById('selectedImage');
    
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                selectedImage.src = reader.result;
            }
            reader.readAsDataURL(file);
        }
    });
});
