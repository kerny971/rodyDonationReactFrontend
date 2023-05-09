import React from "react";
import PayDonation from "./FormPay.js/PayDonation";
import axios, {isCancel, AxiosError} from "axios";


export default class Pay extends React.Component {


    constructor () {
        super()
        this.payDonationSubmit = this.payDonationSubmit.bind(this)
        this.APIcreateStripePayDonation = this.APIcreateStripePayDonation.bind(this)
        this.state = {
            payment: {
                load: false,
                success: false,
            }
        }
    }


    APIcreateStripePayDonation(data) {

        axios({
            url: '/stripe/pay',
            method: 'post',
            baseURL: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then((res) => {
            console.log(res)
            this.setState((prev) => ({
                payment: { success: true }
            }))
            return res
        }).catch((error) => {
            console.log(error.response)
            this.setState((prev) => ({
                payment: { success: false }
            }))
            return {
                status: 500,
                message: "Une erreur s'est produite"
            }
        })
    }


    payDonationSubmit (e) {
        e.preventDefault()

        this.setState((prev) => ({
            payment: { load: true }
        }))

        const data = {}

        data.amount = parseFloat(e.target.querySelector('#amount').value) * 100

        data.firstname = e.target.querySelector('#firstname').value
        data.lastname = e.target.querySelector('#lastname').value
        data.email = e.target.querySelector('#email').value

        data.card = e.target.querySelector('#card').value.replaceAll(' ', '')
        data.month = e.target.querySelector('#month').value
        data.year = e.target.querySelector('#year').value
        data.cvc = e.target.querySelector('#cvc').value

        this.APIcreateStripePayDonation(data)
    }


    render () {
        
        const { payment } = this.state

        return (
            <main className="container">
                <h1>Vas-y mon Poto</h1>
                <p>
                    Ces jours-ci c'est la hess, donc si tu peut me faire un p'tit don se serai cool ! <br/>
                    <u>Renseigne tes infos ici :</u>
                </p>
                <PayDonation payment={payment} payDonationSubmit={(e) => this.payDonationSubmit(e)}/>
            </main>
        )
    }

}