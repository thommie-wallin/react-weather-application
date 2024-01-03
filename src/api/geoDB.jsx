

export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${import.meta.env.VITE_GEODB_API_KEY}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

