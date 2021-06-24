export const ALL_TIME_PERIOD = 0;
export const MONTH_PERIOD = 1;
export const WEEK_PERIOD = 2;

const filterByPeriod = (data, period) => {
	switch (period) {
		case WEEK_PERIOD:
			return Date.parse(data.publishDate) >= Date.now() - 6.048e8;

		case MONTH_PERIOD:
			return Date.parse(data.publishDate) >= Date.now() - 2.628e9;

		default:
			return true;
	}
};

export default filterByPeriod;
