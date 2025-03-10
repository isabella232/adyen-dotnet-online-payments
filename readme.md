# Adyen [online payment](https://docs.adyen.com/checkout) integration demos

This repository includes examples of PCI-compliant UI integrations for online payments with Adyen. Within this demo app, you'll find a simplified version of an e-commerce website, complete with commented code to highlight key features and concepts of Adyen's API. Check out the underlying code to see how you can integrate Adyen to give your shoppers the option to pay with their preferred payment methods, all in a seamless checkout experience.

![Card checkout demo](wwwroot/images/cardcheckout.gif)

## Supported Integrations

**ASP.Net** demos of the following client-side integrations are currently available in this repository:

- [Drop-in](https://docs.adyen.com/checkout/drop-in-web)
- [Component](https://docs.adyen.com/checkout/components-web)
  - ACH
  - Card (3DS2)
  - Dotpay
  - giropay
  - iDEAL
  - Klarna (Pay now, Pay later, Slice it)
  - SOFORT

Each demo leverages Adyen's API Library for .NET ([GitHub](https://github.com/Adyen/adyen-dotnet-api-library) | [Docs](https://docs.adyen.com/development-resources/libraries#csharp)).

## Requirements

.NET Core SDK 6.x

## Installation

1. Clone this repo:

```
git clone https://github.com/adyen-examples/adyen-dotnet-online-payments.git
```

## Usage

1. Set the below environment variables in your terminal environment ([API key](https://docs.adyen.com/user-management/how-to-get-the-api-key), [Client Key](https://docs.adyen.com/user-management/client-side-authentication) - Remember to add `https://localhost:5001` as an origin for client key, and merchant account name, all credentials are in string format)

```shell
export ADYEN_API_KEY=yourAdyenApiKey
export ADYEN_MERCHANT=yourAdyenMerchantAccount
export ADYEN_CLIENT_KEY=yourAdyenClientKey
```

On Windows CMD you can use below commands instead

```shell
set ADYEN_API_KEY=yourAdyenApiKey
set ADYEN_MERCHANT=yourAdyenMerchantAccount
set ADYEN_CLIENT_KEY=yourAdyenClientKey
```

2. Start the server:

```
dotnet run
```

3. Visit [https://localhost:5001/](https://localhost:5001/) to select an integration type.

To try out integrations with test card numbers and payment method details, see [Test card numbers](https://docs.adyen.com/development-resources/test-cards/test-card-numbers).


## Testing webhooks

This demo provides simple webhook integration at `/api/webhooks/notifications`. For it to work, you need to:

* Provide a way for Adyen's servers to reach your running application
* Add a standard webhook in your customer area

### Making your server reachable

One possibility is to use a service like [ngrok](ngrok) (which can be used for free). 

```bash
$ ngrok http https://localhost:5001 -host-header="localhost:5001"
```

Once you have  set up ngrok, make sure to add the provided ngrok URL to the list of Allowed Origins in the “API Credentials" part of your Customer Area.

### Setting up a webhook

* In the developers -> webhooks part of the customer area, create a new 'standard notifications' webhook.
* Make sure to check 'Accept self-signed', 'Accept non-trusted root certificates' (test only) and Active.
* In additional settings, add the data you want to receive. A good example is 'Payment Account Reference'.

That's it! Every time you test a new payment method, your server will receive a notification from Adyen's server.

You can find more information about webhooks in [this detailed blog post](https://www.adyen.com/blog/Integrating-webhooks-notifications-with-Adyen-Checkout).


## Contributing

We commit all our new features directly into our GitHub repository. Feel free to request or suggest new features or code changes yourself as well!

Find out more in our [Contributing](https://github.com/adyen-examples/.github/blob/main/CONTRIBUTING.md) guidelines.

## License

MIT license. For more information, see the **LICENSE** file in the root directory.
