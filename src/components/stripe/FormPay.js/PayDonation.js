import React from 'react'
import { Link } from 'react-router-dom'


export default class PayDonation extends React.Component {


    constructor (props) {
        super(props)
        this.props = props
        this.state = {
            card: ''
        }
        this.cardFormat = this.cardFormat.bind(this)
    }

    #cc_format(value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (let i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
          return parts.join(' ')
        } else {
          return value
        }
      }

    cardFormat (event) {
        const cc = this.#cc_format(event.target.value)
        this.setState((prev) => ({
            card: cc
        }))
    }

    render () {

        const { payDonationSubmit, payment } = this.props
        const { card } = this.state

        return (
            <>
                { payment.success ?
                    <h1>Paiement réussi</h1>
                :
                    <form onSubmit={ payDonationSubmit }>
                        <div className="grid">
                            <div>
                                <label htmlFor="amount">Montant</label>
                                <input min="0" max="500" step="0.01" type="number" name="amount" id="amount" placeholder="1.00 €"/>
                            </div>
                            <section>
                                <div>
                                    <label htmlFor="lastname">Nom</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Marc..."/>
                                </div>

                                <div>
                                    <label htmlFor="firstname">Prénom</label>
                                    <input type="text" name="firstname" id="firstname" placeholder="Jean..."/>
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" placeholder="jean.marc@gmail.com..."/>
                                </div>
                            </section>



                            <section>
                                <div>
                                    <label htmlFor="card">Numéro de carte</label>
                                    <input onChange={(e) => this.cardFormat(e)} value={card} type="text" name="card" id="card" placeholder="XXXX XXXX XXXX XXXX"/>
                                </div>
                                <div className='grid'>
                                    <div>
                                        <label htmlFor="month">Mois</label>
                                        <select name="month" id="month" placeholder="">
                                            <option value="1">Janvier</option>
                                            <option value="2">Février</option>
                                            <option value="3">Mars</option>
                                            <option value="4">Avril</option>
                                            <option value="5">Mai</option>
                                            <option value="6">Juin</option>
                                            <option value="7">Juillet</option>
                                            <option value="8">Août</option>
                                            <option value="9">Septembre</option>
                                            <option value="10">Octobre</option>
                                            <option value="11">Novembre</option>
                                            <option value="12">Décembre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="year">Année</label>
                                        <input type="text" name="year" id="year" placeholder="2019"/>
                                    </div>

                                    <div>
                                        <label htmlFor="cvc">CVC</label>
                                        <input type="text" name="cvc" id="cvc" placeholder="XXX"/>
                                    </div>

                                </div>

                                <br/>

                                { payment.load ? <button type="submit" disabled>PAIEMENT EN COURS...</button> : <button type="submit">JE DONNE</button>}

                            </section>


                        </div>
                    </form>
                }

            </>
        )
    }

}
