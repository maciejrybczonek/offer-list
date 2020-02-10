import { boundMethod } from 'autobind-decorator';
import React, { Component } from 'react';
import { Link } from 'react-navi';
import { Offer } from 'shared/models';

type TOfferListElementProps = {
    offer: Offer,
    clickCallback: any
}

export class OfferListElementComponent extends Component<TOfferListElementProps, {}> {

    @boundMethod
    handleOfferClick() {
        let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
        this.props.clickCallback(scrollTop);
    }

    render() {
        let offer = this.props.offer;
        return (
            <li id={'offer-' + offer.id} onClick={this.handleOfferClick}>
                <Link href={'/' + offer.id}>
                    <img src={offer.img_url} alt={offer.title} />
                    <div className="offer-list-description">
                        <h2>{offer.title}</h2>
                        <p>{offer.description}</p>
                        <h3>{offer.price} PLN {offer.discount && <small>-{offer.discount + '%'}</small>}</h3>
                    </div>
                    <span className="offer-list-details-link">Show details</span>
                </Link>
            </li>
        );
    }
}
