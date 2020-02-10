import { boundMethod } from 'autobind-decorator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';
import { Offer } from 'shared/models';
import { AppState } from 'store';
import { offerActions } from 'store/offer';
import { InfiniteScrollComponent } from 'components';
import { OfferListElementComponent } from './listElement.component';

type TOfferListProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class OfferListComponent extends Component<TOfferListProps, {}> {

    componentDidMount() {
        this.loadMoreOffers();
    }

    componentDidUpdate() {
        if(this.props.viewportPosition) {
            window.scrollTo(0, this.props.viewportPosition);
            this.props.actions.offerSetListViewportPosition(0);
        }
    }

    @boundMethod
    loadMoreOffers() {
        this.props.actions.offerGetAll({
            status: 'published'
        });
    }

    render() {
        return (
            <div className="offer-list-wrapper">
                <InfiniteScrollComponent onScrolled={this.loadMoreOffers} canLoadMore={this.props.canLoadMore} isFetching={this.props.isFetching}>
                    <h1>Offers</h1>
                    <ul>
                        {(this.props.loadedOffers as Array<Offer>).map((offer, index) =>
                            <OfferListElementComponent key={index} offer={offer} clickCallback={this.props.actions.offerSetListViewportPosition}></OfferListElementComponent>
                        )}
                    </ul>
                </InfiniteScrollComponent>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    ...state.offer
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    actions: bindActionCreators({
        ...offerActions
    }, dispatch)
});

export const OfferListComponentConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(OfferListComponent);
