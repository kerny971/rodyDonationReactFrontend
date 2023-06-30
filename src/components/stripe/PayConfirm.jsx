import React from 'react'
import { BroadcastChannel } from "broadcast-channel";
import axios from "axios";

export default class PayConfirm extends React.Component {


   APICheck3DSAuth (data) {
     const channel = new BroadcastChannel('payment')
    axios({
      url: process.env.REACT_APP_API_RODY_DONATION_CONFIRM_URL,
      method: 'POST',
      baseURL: process.env.REACT_APP_API_RODY_DONATION_BACKEND,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then((res) => {
      console.log(res)
      channel.postMessage({data: res.data, status: res.status, statusText: res.statusText}).finally(() => {
        window.close();
      })
    }).catch((error) => {
      console.log(error.response)
      channel.postMessage({data: error.response.data, status: error.response.status, statusText: error.response.statusText}).finally(() => {
        window.close();
      })
    })
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('payment_intent');
    this.APICheck3DSAuth({ id: myParam });
  }


  render() {
    return (
      <div>
        <h1>Paiement is processing...</h1>
      </div>
    )
  }

}
