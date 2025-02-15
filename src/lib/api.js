const genBaseUrl =  process.env.NEXT_PUBLIC_API_URL;
const noticeBaseUrl =  process.env.NEXT_PUBLIC_NOTICE_API_URL;

export async function genApiGetRequest(endpoint, token, options = {}) {
    const url = `${genBaseUrl}/api/${endpoint}`;

    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
            cache: 'no-store',
            credentials: 'include'
        });
        
        if (!response.ok) {
            console.log("Url:" + url + ". Http status: " + response.status + ". ");
        }
        
        return response;
    } catch (error) {
        console.log("Error. Url:" + url);
        console.log(error);
        return null;
    }
}

export async function noticeApiGetRequest(endpoint, token, options = {}) {
    const url = `${noticeBaseUrl}/api/${endpoint}`;
    
    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
            cache: 'no-store',
            credentials: 'include'
        });
        
        if (!response.ok) {
            console.log("Url:" + url + ". Http status: " + response.status + ". ");
        }
        
        return response;
    } catch (error) {
        console.log("Error. Url:" + url);
        console.log(error);
        return null;
    }
}

export async function noticeApiPostRequest(endpoint, token, data, options = {}) {
    const url = `${noticeBaseUrl}/api/${endpoint}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store',
            credentials: 'include',
            ...options
        });
        
        if (!response.ok) {
            console.log("Url:" + url + ". Http status: " + response.status + ". ");
        }
        
        return response;
    } catch (error) {
        console.log("Error. Url:" + url);
        console.log(error);
        return null;
    }
}

export async function noticeApiDeleteRequest(endpoint, token) {
    const url = `${noticeBaseUrl}/api/${endpoint}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            credentials: 'include'
        });
        
        if (!response.ok) {
            console.log("Url:" + url + ". Http status: " + response.status + ". ");
        }
        
        return response;
    } catch (error) {
        console.log("Error. Url:" + url);
        console.log(error);
        return null;
    }
}

