import React, { Component } from 'react';
import { mount, route } from 'navi'
import { Router, View } from 'react-navi'
import { OfferListComponentConnected, OfferDetailsComponent } from './components';
import { withOfferService } from 'shared/services';

export class OfferComponent extends Component {

    routes: any; // TODO: set better type

    constructor(props: any) {
        super(props);
        const WrappedOfferDetailsComponent = withOfferService(OfferDetailsComponent)
        this.routes =
            mount({
                '/': route({
                    title: 'Offers List',
                    view: (props: any) => <OfferListComponentConnected />,
                }),
                '/:id': route(req => ({
                    title: 'Offer Details',
                    view: (props: any) => <WrappedOfferDetailsComponent offerId={parseInt(req.params.id)} />
                }))
            })
    }

    render() {
        return (
            <Router routes={this.routes}><View /></Router>
        );
    }
}
