// whatsapp.js
document.addEventListener("DOMContentLoaded", function () {
  // Twilio API credentials
  const twilioAccountSid = 'YOUR_TWILIO_ACCOUNT_SID';
  const twilioAuthToken = 'YOUR_TWILIO_AUTH_TOKEN';
  const twilioFromNumber = 'YOUR_TWILIO_PHONE_NUMBER'; // This should be a Twilio phone number in E.164 format

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

  // Handle form submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(contactForm);

    // Prepare the message body
    let messageBody = `Name: ${formData.get("name")}\n`;
    messageBody += `Email: ${formData.get("email")}\n`;
    messageBody += `Message: ${formData.get("message")}\n`;

    // Send message via Twilio WhatsApp API
    const whatsappAPIUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const authString = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
    axios.post(whatsappAPIUrl, {
      To: "RECIPIENT_PHONE_NUMBER", // Replace with the recipient's phone number in E.164 format
      From: twilioFromNumber,
      Body: messageBody,
    }, {
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      console.log("Message sent successfully:", response.data);
      // Add code here to display a success message to the user or redirect them to a thank-you page
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      // Add code here to handle the error and inform the user
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const stripe = Stripe("YOUR_STRIPE_PUBLISHABLE_KEY");
  const elements = stripe.elements();
  const cardElement = elements.create("card");

  // Add an instance of the card Element into the `card-element` div.
  cardElement.mount("#card-element");

  // Handle real-time validation errors from the card Element.
  cardElement.on("change", function (event) {
    const cardErrors = document.getElementById("card-errors");
    if (event.error) {
      cardErrors.textContent = event.error.message;
    } else {
      cardErrors.textContent = "";
    }
  });

  // Handle form submission.
  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    stripe.createToken(cardElement).then(function (result) {
      if (result.error) {
        // Inform the user if there was an error.
        const cardErrors = document.getElementById("card-errors");
        cardErrors.textContent = result.error.message;
      } else {
        // Send the token to your server to charge the payment.
        const token = result.token.id;
        // You can now send the token to your server and process the payment using the Stripe API.
        // For this example, we'll just display a success message to the user.
        displayPaymentSuccess();
      }
    });
  });

  function displayPaymentSuccess() {
    // Add code here to show a success message to the user or redirect to a success page.
    alert("Payment successful!");
  }
});
