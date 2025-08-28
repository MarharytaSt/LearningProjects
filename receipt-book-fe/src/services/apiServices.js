import { BaseUrl } from "../settings/apiSettings";

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

const functions = {
    getAsync
};

export default functions;