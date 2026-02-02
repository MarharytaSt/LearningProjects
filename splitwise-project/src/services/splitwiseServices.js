import { BaseUrl } from '../settings/apiSettings';
const headers = { 'Content-Type': 'application/json' };

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
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error(`POST failed: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`POST error: ${error}`);
        return null;
    }
}

async function putAsync(path, body) {
    const requestUrl = `${BaseUrl}${path}`;

    try {
        const response = await fetch(requestUrl, {
            method: "PUT",
            headres: headers,
            body: JSON.stringify(body)
        });

        if(!response.ok) {
            console.error(`PUT failed: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`PUT error: ${error}`);
        return null;
    }
}

async function deleteAsync(path) {
    const requestUrl = `${BaseUrl}${path}`;

    try {
        const response = await fetch(requestUrl, {method: "DELETE"});

        if(!response.ok) {
            console.error(`DELETE failed: ${response.status}`);
            return null;
        }

        return true;
    } catch (error) {
        console.error(`DELETE error: ${error}`);
        return null;
    }
}

const functions = {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
};

export default functions;