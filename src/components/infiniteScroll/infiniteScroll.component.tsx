import { boundMethod } from 'autobind-decorator';
import React, { Component } from 'react';

type TInfiniteScrollProps = {
    onScrolled: () => void,
    canLoadMore: boolean,
    isFetching: boolean,
    offset?: number
}

export class InfiniteScrollComponent extends Component<TInfiniteScrollProps, {}> {

    componentDidMount() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.dettachScrollListener();
    }

    @boundMethod
    attachScrollListener() {
        window.addEventListener(
            'scroll',
            this.onScrollEvent
        );
        window.addEventListener(
            'resize',
            this.onScrollEvent
        );
    }

    @boundMethod
    dettachScrollListener() {
        window.removeEventListener(
            'scroll',
            this.onScrollEvent
        );
        window.removeEventListener(
            'resize',
            this.onScrollEvent
        );
    }

    @boundMethod
    calculateTriggerPoint() {
        return document.documentElement.scrollHeight - (this.props.offset || 0);
    }

    @boundMethod
    onScrollEvent() {
        if(!this.props.canLoadMore) {
            this.dettachScrollListener();
            return;
        }
        let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
        let triggerPoint = this.calculateTriggerPoint();
        if(scrollTop + window.innerHeight === triggerPoint && !this.props.isFetching) {
            this.props.onScrolled(); // fire parent callback
        }
    }

    render() {
        return (
            <div className="inifinite-scroller">
                {this.props.children}
                {this.props.isFetching ? <div className="loader"></div> : ''}
            </div>
        );
    }
}
