import React from 'react';
import { shallow, mount } from 'enzyme';
import { InfiniteScrollComponent } from 'components';

describe('InfiniteScrollComponent', () => {
    let wrapper, instance, spies,
        eventMap = {},
        scrollHeight = 800,
        innerHeight = 400,
        propsOffset = 200,
        pageYOffset = 200;

    beforeAll(() => {
        Object.defineProperty(global.document.documentElement, 'scrollHeight', { value: scrollHeight });
        Object.defineProperty(global.window, 'pageYOffset', { value: pageYOffset });
        Object.defineProperty(global.window, 'innerHeight', { value: innerHeight });
        window.addEventListener = jest.fn((event, cb) => {
            eventMap[event] = cb;
        });
    })

    beforeEach(() => {
        spies = {
            attachScrollListener: jest.spyOn(InfiniteScrollComponent.prototype, 'attachScrollListener'),
            dettachScrollListener: jest.spyOn(InfiniteScrollComponent.prototype, 'dettachScrollListener'),
            onScrollEvent: jest.spyOn(InfiniteScrollComponent.prototype, 'attachScrollListener'),
            calculateTriggerPoint: jest.spyOn(InfiniteScrollComponent.prototype, 'calculateTriggerPoint'),
            onScrolledCallback: jest.fn(() => {})
        };
        wrapper = mount(<InfiniteScrollComponent />);
        wrapper.setProps({ onScrolled: spies.onScrolledCallback, canLoadMore: true, isFetching: false, offset: propsOffset });
        instance = wrapper.instance();
    });

    it('renders the div.inifinite-scroller', () => {
        expect(wrapper.find('div.inifinite-scroller').length).toEqual(1);
    });

    it('call attachScrollListener() on mount', () => {
        expect(spies.attachScrollListener).toHaveBeenCalled();
    });

    it('test scroll listener', () => {
        eventMap.scroll();
        expect(spies.onScrollEvent).toHaveBeenCalled();
        expect(spies.calculateTriggerPoint).toHaveBeenCalled();
    });

    it('test resize listener', () => {
        eventMap.resize();
        expect(spies.onScrollEvent).toHaveBeenCalled();
        expect(spies.calculateTriggerPoint).toHaveBeenCalled();
    });

    it('test calculateTriggerPoint()', () => {
        expect(instance.calculateTriggerPoint()).toEqual(scrollHeight - propsOffset);
    });

    it('test onScrolled() callback', () => {
        eventMap.scroll();
        expect(spies.onScrolledCallback).toHaveBeenCalled();
    });

    it('do not call onScrolled() when fetching', () => {
        wrapper.setProps({ isFetching: true });
        eventMap.scroll();
        expect(spies.onScrolledCallback).not.toHaveBeenCalled();
    });

    it('show loader when fetching', () => {
        wrapper.setProps({ isFetching: true });
        eventMap.scroll();
        expect(wrapper.find('div.loader').length).toEqual(1);
    });

    it('call dettachScrollListener() if can\'t load more', () => {
        wrapper.setProps({ canLoadMore: false });
        eventMap.scroll();
        expect(spies.dettachScrollListener).toHaveBeenCalled();
        expect(spies.onScrolledCallback).not.toHaveBeenCalled();
    });

    it('call dettachScrollListener() on unmount', () => {
        wrapper.unmount();
        expect(spies.dettachScrollListener).toHaveBeenCalled();
    })

});
