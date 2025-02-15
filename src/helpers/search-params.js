/**
 * Принимает хук useSearchParams next/navigation
 * @param {*} searchParams 
 * @returns 
 */
export default function getQuery(searchParams) {
    const order = searchParams.get('people_order')
    const search = searchParams.get('people_search')

    let str = "";

    if (order || search) {
        str += "?";
    }

    if (order) {
        str += "people_order=" + order;
    }

    if (order && search) {
        str += "&";
    }

    if (search) {
        str += "people_search=" + search;
    }

    return str;
}
