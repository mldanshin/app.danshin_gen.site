import { genApiGetRequest } from '@/lib/api';

export async function getPeople(order, search, token) {
        const query = getRequest(order, search);
    const response = await genApiGetRequest('people' + query, token);
    
    if (!response || !response.ok) {
        return null;
    }
    
    return await response.json();
}

export async function getPeopleClient(order, search) {
   try {
        const query = getRequest(order, search);
        const res = await fetch(`/api/people` + query);
        if (res.ok) {
            return res;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

function getRequest(order, search) {
    let str = "";

    if (order || search) {
        str += "?";
    }

    if (order) {
        str += "order=" + order;
    }

    if (order && search) {
        str += "&";
    }

    if (search) {
        str += "search=" + search;
    }

    return str;
}
