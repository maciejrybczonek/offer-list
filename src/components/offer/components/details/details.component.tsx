import React, { Component } from 'react';
import { Link } from 'react-navi';
import { OfferService } from 'shared/services';
import { Offer } from 'shared/models';

type TOfferDetailsProps = {
    offerId: number,
    offerService: OfferService
}

type TOfferDetailsState = {
    offer: Offer | null,
    isFetching: boolean
}

export class OfferDetailsComponent extends Component<TOfferDetailsProps, TOfferDetailsState> {

    state: TOfferDetailsState = {
        offer: null,
        isFetching: true
    }

    async componentDidMount() {
        let offerDetails = await this.props.offerService.getDetails(this.props.offerId)
            .then(response => response.json())
            .catch(error => { })
            .finally(() => {
                this.setState({
                    isFetching: false
                });
            });;
        this.setState({
            offer: offerDetails
        });
    }

    render() {
        let offer = this.state.offer || null;
        return (
            <div className="offer-details-wrapper">
                <Link href="/">&larr; Get back</Link>
                <div className="offer-details-box">
                    {offer && !this.state.isFetching ?
                        (<div className="offer-details">
                            <img src={offer.img_url} alt={offer.title} />
                            <div className="offer-details-info">
                                <h1>{offer.title}</h1>
                                <p>{offer.description}</p>
                                <h2>{offer.price} PLN</h2>
                                <pre>{JSON.stringify(offer, null, 2)}</pre>
                            </div>
                        </div>)
                        : (<div className="loader"></div>)
                    }
                </div>
            </div>
        );
    }
}
