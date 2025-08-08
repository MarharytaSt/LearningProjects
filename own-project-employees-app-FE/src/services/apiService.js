import { BaseUrl } from '../settings/apiSettings';

const defaultHeaders = {
    'Content-Type': 'application/json'
};

async function getAsync(path) {
    const requestUrl = `${BaseUrl}${path}`;

    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            console.log(`Failed response: ${response.status}`);

            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Error: ${error}`);

        return null;
    }
}

async function postAsync(path, body) {
    const requestUrl = `${BaseUrl}${path}`;

    try {
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log(`Failed response: ${response.status}`);

            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Error: ${error}`);

        return null;
    }
}

const functions = {
    getAsync,
    postAsync
}

export default functions;