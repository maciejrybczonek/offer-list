import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import { Service } from './service';

interface OfferListParams {
    limit?: number;
    offset?: number;
    sort?: string;
    title?: string;
    status?: string;
}

export class OfferService extends Service {

    private resourceURL: string;

    constructor() {
        super();
        this.resourceURL = `${process.env.REACT_APP_API_URL}/offers/`;
    }

    @boundMethod
    public getList(params: OfferListParams): Promise<any> {
        return fetch(`${this.resourceURL}${this.serializeParams(params)}`)
    }

    @boundMethod
    public getDetails(offerId: number): Promise<any> {
        return fetch(`${this.resourceURL}${offerId}`)
    }

}

export function withOfferService(WrappedComponent: any) { // Higher Order Component factory/wrapper
    class HOC extends Component<ReturnType<typeof WrappedComponent>> {
        render() {
            const offerService = new OfferService();
            return (
                <WrappedComponent {...this.props} offerService={offerService} />
            );
        }
    }
    return HOC;
}
