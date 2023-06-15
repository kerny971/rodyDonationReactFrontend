import React from "react";
import PayDonation from "./FormPay.js/PayDonation";
import axios from "axios";
import { BroadcastChannel } from 'broadcast-channel'



export default class Pay extends React.Component {


    constructor (props) {
        super(props);
        this.payDonationSubmit = this.payDonationSubmit.bind(this);
        this.APIcreateStripePayDonation = this.APIcreateStripePayDonation.bind(this);
        this.closeError = this.closeError.bind(this);
        this.state = {
            payment: {
                load: false,
                success: false,
                code: null,
                status: null,
                error: null,
                paymentIntent: null,
                message: null,
                auth3DS: null
            }
        };
    }


    #paymentStatus(data) {

        if (data.paymentIntent) {
            switch (data.paymentIntent.status) {
                case 'succeeded':
                    this.setState((prev) => ({
                        payment: {
                            success: true,
                            message: 'Votre paiement à bien été enregistrer !',
                            paymentIntent: data.paymentIntent,
                            status: '3DSAUTH-000',
                            error: data.error,
                            auth3DS: {
                                status: '3DSAUTH-000',
                                message: 'Votre paiement à bien été enregistrer !',
                            }
                        }
                    }))
                    break;

                case 'processing':
                    this.setState((prev) => ({
                        payment: {
                            success: false,
                            message: data.paymentIntent.last_payment_error.message ?? 'Votre paiement est toujours en cours de traitement... !',
                            paymentIntent: data.paymentIntent,
                            status: '3DSAUTH-444',
                            error: data.error,
                            auth3DS: {
                                status: '3DSAUTH-444',
                                message: 'Votre paiement est toujours en cours de traitement... !',
                            }
                        }
                    }))
                    break;

                case 'requires_payment_method':
                    // Redirect your user back to your payment page to attempt collecting
                    // payment again
                    this.setState((prev) => ({
                        payment: {
                            success: false,
                            message: data.paymentIntent.last_payment_error.message ?? 'Votre moyen de paiement n\'à pas été acceptée par notre module de paiement !',
                            paymentIntent: data.paymentIntent,
                            status: '3DSAUTH-555',
                            error: data.error,
                            auth3DS: {
                                status: '3DSAUTH-555',
                                message: 'Votre moyen de paiement n\'à pas été acceptée par notre module de paiement !',
                            }
                        }
                    }))
                    break;

                default:
                    this.setState((prev) => ({
                        payment: {
                            success: false,
                            message: data.paymentIntent.last_payment_error.message ?? 'Une erreur inconnue s\'est produite. Merci de contacter le support !',
                            paymentIntent: data.paymentIntent,
                            status: '3DSAUTH-333',
                            error: data.error,
                            auth3DS: {
                                status: '3DSAUTH-333',
                                message: 'Une erreur inconnue s\'est produite. Merci de contacter le support !',
                            }
                        }
                    }))
                    break;
            }
        }

    }

    #paymentTreatmentNext3DS(res) {

        if ((res.paymentIntents.status !== "requires_action") && (res.paymentIntents.next_action.type !== "redirect_to_url")) {

            this.setState((prev) => ({
                payment: {
                    success: false,
                    status: "3DSAUTH-000",
                    message: 'Une erreur inconnu s\'est produite lors du traitement',
                    auth3DS: {
                        message: 'Une erreur inconnu s\'est produite lors du traitement',
                        paymentIntent: res.paymentIntents,
                        status: '3DSAUTH-000',
                        error: res.error,
                        api: {
                            status: res.paymentIntents.status,
                            clientSecret: res.paymentIntents.client_secret,
                            nextAction: res.paymentIntents.next_action,
                            metadata: res.paymentIntents.metadata
                        }
                    }
                }
            }))

            return;
        }

        const window3DS = window.open(res.paymentIntents.next_action.redirect_to_url.url, '_blank');
        console.log(window3DS);
        const channel = new BroadcastChannel('payment')
        channel.onmessage = (msg) => {

            console.log(msg)


            if (msg.status < 200 || msg.status >= 400) {
                this.setState((prev) => ({
                    payment : {
                        success: false,
                        status: "3DSAUTH-222",
                        message: msg.data.paymentIntent.last_payment_error.message ?? 'Une erreur à eu lieu lors de la validation du Paiement...',
                        code: '3DSAUTH-222',
                        error: msg.data.error,
                        paymentIntent: msg.data.paymentIntent,
                        auth3DS: {
                            status: '3DSAUTH-222',
                            message: 'Une erreur à eu lieu lors de la validation du Paiement...',
                        }
                    }
                }))
                return;
            }

            this.#paymentStatus(msg.data)

        }

    }

    APIcreateStripePayDonation(data) {

        axios({
            url: process.env.REACT_APP_API_RODY_DONATION_BACKEND_URL,
            method: 'post',
            baseURL: process.env.REACT_APP_API_RODY_DONATION_BACKEND,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then((res) => {
            console.log(res)
            if (res.data.paymentIntents.status === 'succeeded') {
                this.setState((prev) => ({
                    payment: {
                        success: true,
                        message: 'Votre paiement à bien été enregistrer !',
                        paymentIntent: res.data.paymentIntent,
                        status: '3DSAUTH-000',
                        error: res.data.error,
                    }
                }))

                return;
            }

            this.#paymentTreatmentNext3DS(res.data);

        }).catch((error) => {
            console.log(error.response);
            this.setState((prev) => ({
                payment: {
                    success: false,
                    message: error.response.data.error.msg ?? 'Une erreur s\'est produite...',
                    paymentIntent: data.paymentIntent,
                    status: '3DSAUTH-666',
                    error: error.response.data.error,
                    auth3DS: {
                        status: '3DSAUTH-666',
                        message: 'Une erreur inconnue s\'est produite. Merci de contacter le support !',
                    }
                }
            }))
        })
    }

    payDonationSubmit (e) {
        e.preventDefault()

        this.setState((prev) => ({
            payment: { load: true }
        }))

        const data = {}

        data.amount = Math.floor(parseFloat(e.target.querySelector('#amount').value) * 100)

        data.firstname = e.target.querySelector('#firstname').value
        data.lastname = e.target.querySelector('#lastname').value
        data.email = e.target.querySelector('#email').value

        data.card = e.target.querySelector('#card').value.replaceAll(' ', '')
        data.month = e.target.querySelector('#month').value
        data.year = e.target.querySelector('#year').value
        data.cvc = e.target.querySelector('#cvc').value

        this.APIcreateStripePayDonation(data)
    }



    closeError () {
        this.setState((previousState) => ({
            payment: {
                load: false,
                success: false,
                code: null,
                status: null,
                error: null,
                paymentIntent: null,
                message: null,
                auth3DS: null
            }
        }))
    }


    render () {

        const { payment } = this.state

        console.log(payment)


        return (
            <main id="main" className="container">
                <h1>Vas-y mon Poto</h1>
                <p>
                    Ces jours-ci c'est la hess, donc si tu peut me faire un p'tit don se serai cool ! <br/>
                    <u>Renseigne tes infos ici :</u>
                </p>
                <PayDonation payment={payment} payDonationSubmit={(e) => this.payDonationSubmit(e)}/>
                {
                    payment.status && payment.error ?
                      <dialog open>
                          <article>
                              <header>
                                  <a href="#main" aria-label="Close" className="close" onClick={this.closeError}> </a>
                                  Erreur...
                              </header>
                              <p>
                                  {payment.message}
                              </p>
                          </article>
                      </dialog>
                      : <></>
                }
            </main>
        )
    }

}
