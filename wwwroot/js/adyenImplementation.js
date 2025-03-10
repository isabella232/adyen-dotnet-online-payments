const clientKey = document.getElementById("clientKey").innerHTML;

// Used to finalize a checkout call in case of redirect
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('sessionId'); // Unique identifier for the payment session
const redirectResult = urlParams.get('redirectResult');

// Typical checkout experience
async function startCheckout() {
  // Used in the demo to know which type of checkout was chosen
  const type = document.getElementById("type").innerHTML;

  try {
    const checkoutSessionResponse = await callServer("/api/sessions");
    const checkout = await createAdyenCheckout(checkoutSessionResponse);
    checkout.create(type).mount(document.getElementById("payment"));

  } catch (error) {
    console.error(error);
    alert("Error occurred. Look at console for details");
  }
}

// Some payment methods use redirects. This is where we finalize the operation
async function finalizeCheckout() {
  try {
    const checkout = await createAdyenCheckout({id: sessionId});
    checkout.submitDetails({details: {redirectResult}});
  } catch (error) {
    console.error(error);
    alert("Error occurred. Look at console for details");
  }
}

async function createAdyenCheckout(session){
    return new AdyenCheckout(
    {
      clientKey,
      locale: "en_US",
      environment: "test",
      session: session,
      showPayButton: true,
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true,
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          name: "Credit or debit card",
          amount: {
            value: 1000,
            currency: "EUR",
          },
        },
        paypal: {
          amount: {
            value: 1000,
            currency: "USD",
          },
          environment: "test", // Change this to "live" when you're ready to accept live PayPal payments
          countryCode: "US", // Only needed for test. This will be automatically retrieved when you are in production.
        }
      },
      onPaymentCompleted: (result, component) => {
        console.info("onPaymentCompleted");
        console.info(result, component);
        handleServerResponse(result, component);
      },
      onError: (error, component) => {
        console.error("onError");
        console.error(error.name, error.message, error.stack, component);
        handleServerResponse(error, component);
      },
    }
  );
}

// Calls your server endpoints
async function callServer(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

function handleServerResponse(res, _component) {
    switch (res.resultCode) {
      case "Authorised":
        window.location.href = "/Home/result/success";
        break;
      case "Pending":
      case "Received":
        window.location.href = "/Home/result/pending";
        break;
      case "Refused":
        window.location.href = "/Home/result/failed";
        break;
      default:
        window.location.href = "/Home/result/error";
        break;
    }
}

if (!sessionId) { startCheckout() } else { finalizeCheckout(); }