function name(name: string): string {
	return '[OFFER] ' + name;
}

export const
	OFFER_SET_LOADED_PAGE_NUMBER = name('Set loaded page number'),
	OFFER_SET_CAN_LOAD_MORE = name('Set can load more'),
	OFFER_SET_IS_FETCHING = name('Set is fetching flag'),
	OFFER_SET_LIST_VIEWPORT_POSITION = name('Set list viewport position'),
	OFFER_GET_ALL = name('Get all offers'),
	OFFER_APPEND = name('Append offers');
