export const generateQueryString = (filters) => {
    let queryString = '?';
    for (const [key, value] of Object.entries(filters)) {
        if (value !== "") {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
    }
    if (queryString !== '?') {
        queryString = queryString.slice(0, -1);
    }
    return queryString;
};


export const parseQueryString = (queryString) => {
    if (queryString === ""){
        const current_filters = {
            'datasetName': "",
            'runDatetime': "",
            'modelMetric': "", 
            'modelPath': "",
            'trainingLoss': "",
            'validationLoss': "",
            'notes': "",
            'favorite': "",
            'sort_by': "",
            'sort_order': ""
        }
        return current_filters
    }
    if (queryString.startsWith('?')) {
        queryString = queryString.slice(1);
    }
    const pairs = queryString.split('&');
    const result = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        const decodedKey = decodeURIComponent(key);
        const decodedValue = decodeURIComponent(value);
        result[decodedKey] = decodedValue;
    });
    return result;
};
