
document.addEventListener("DOMContentLoaded", function () {
  // Dynamic services data
  const servicesData = [
    {
      title: "GST Registration",
      description: "We help you register for GST to comply with the taxation laws.",
    }
    ,
    {
      title: "GST Return Filing",
      description: "We assist in filing your GST returns accurately and on time.",
    },
    {
      title: "Income Tax Filing",
      description: "We help you file your income tax returns efficiently.",
    },
    {
      title: "Financial Consulting",
      description: "We provide financial consulting services to help you manage your finances.",
    },
  ];
   

  // Populate the services section dynamically
  const servicesList = document.querySelector(".services-list");
  servicesData.forEach((service) => {
    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service");

    const serviceTitle = document.createElement("h3");
    serviceTitle.textContent = service.title;

    const serviceDescription = document.createElement("p");
    serviceDescription.textContent = service.description;

    serviceDiv.appendChild(serviceTitle);
    serviceDiv.appendChild(serviceDescription);
    servicesList.appendChild(serviceDiv);
  });

 
});
const phoneNumber = '+919199890880';

document.getElementById('whatsapp-button').addEventListener('click', function () {
    window.open(`https://wa.me/${+919199890880}`, '_blank');
});
let url='https://script.google.com/macros/s/AKfycbz0lL6tBqT0DynE8Gjy9QcYKBlJwnHGfYMsnOI115Bjckismx29_a4fjnu_1FiYZzg/exec'
let form = document.querySelector('#form');
form.addEventListener("submit",(e)=>{
    e.target.btn.innerHTML="Submitting...";
    let d=new FormData(form);
    fetch(url,{
        method:"POST",
        body:d
    }).then((res)=>res.text())
    .then((finalRes)=>{
        e.target.btn.innerHTML="Submit";
        document.getElementById("res").innerHTML=finalRes;
        form.reset();
        setTimeout(() => {
            document.getElementById("res").innerHTML='';
        }, 5000);
        })
    e.preventDefault();
})