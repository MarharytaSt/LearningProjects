const API_URL = 'http://localhost:5000/api/receipt';
const headers = { 'Content-Type': 'application/json' };

export async function postReceipt(receipt) {
    const formattedReceipt = {
        name: receipt.name,
        cookingDuration: Number(receipt.cookingDuration),
        description: {
            shortDescription: receipt.description,
            steps: receipt.steps.map((step, index) => ({
                stepOrder: index,
                stepDescription: step.stepDescription || ''
            }))
        }
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formattedReceipt)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка при сохранении рецепта');
    }

    return await response.json();
}

export async function getReceipts() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке рецептов');
    }

    return await response.json();
}


export async function getReceiptById(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке рецепта')
    }

    return await response.json();

}