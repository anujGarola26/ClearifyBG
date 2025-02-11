let selectedImage = document.querySelector('#select-img');
let innerImage = document.querySelector('.inner-upload');
let image = null;
let inputImage = document.querySelector('#import-img');
let icon = document.querySelector('#icon');
let span = document.querySelector('#span ');
let url = null;
let uploadButton = document.querySelector('#upload-btn');
let originalImage = document.querySelector("#img-1");
let generatedImage = document.querySelector('#img-2');
let container2 = document.querySelector('.container-two'); 
let finalResult = document.querySelector('.result'); 
let loadinGif = document.querySelector('#loading');
let download = document.querySelector('#download');
let reset = document.querySelector('#reset');

function removeBackground() {
    const apiKey = "4U1xf7iezUMsFgyVCAZsfR1Q";
    const formdata = new FormData();
    formdata.append("image_file", image);
    formdata.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
 method: "POST",
 headers: { "X-Api-Key": apiKey },
 body: formdata,
 })
.then(function(response){
    return response.blob();
})
.then(function(blob) {
    loadinGif.style.display="none";
    container2.style.display="none";
    finalResult.style.display="flex";
    url = URL.createObjectURL(blob);
    generatedImage.src = url;
})
.catch(alert("Generate Image")) }


innerImage.addEventListener("click", () =>{
    selectedImage.click();
});
selectedImage.addEventListener("change", () => {
    image = selectedImage.files[0];
    if(!selectedImage) {
        alert("Please upload a image");
        return;
    }
    let reader = new FileReader() ;
    reader.onload = (e) => {
        console.log(e);
        inputImage.src= `data:${selectedImage.type};base64,${e.target.result.split(",")[1]}`
        innerImage.style.display="block";
        inputImage .style.opacity="1";
        icon.style.display="none";
        span.style.display="none";
        originalImage .src= `data:${selectedImage.type};base64,${e.target.result.split(",")[1]}`
    }
    reader.readAsDataURL(image);
});

uploadButton.addEventListener("click", () => {
    removeBackground();
    loadinGif.style.display="block";
})

function downloads() {
    fetch(url)
    .then(responsed => responsed.blob())
    .then(file=> {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    })
    .catch(alert("Start Downloading"))
}

download.addEventListener("click", () => {
    downloads();
})
reset.addEventListener("click", () => {
    window.location.reload();
})

