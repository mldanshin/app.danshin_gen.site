import { genApiGetRequest } from '@/lib/api';

export async function getPerson(personId, token) {
    const response = await genApiGetRequest('person/' + personId, token);

    if (!response || !response.ok) {
        return null;
    }
    
    return await response.json();
}