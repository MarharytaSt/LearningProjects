const API_URL = 'http://localhost:5000/api/receipt';

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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedReceipt)
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка при сохранении рецепта');
    }

    return await response.json();
}