"use client";

import config from "@/config/people.json";
import { getPeopleClient } from '@/services/people';
import locale from "@/locales/ru/people/people.json";
import localeFilter from "@/locales/ru/people/filter.json";
import localeOrder from "@/locales/ru/people/order.json";
import Image from "next/image";
import Loading from '@/components/Loading';
import PersonList from "./PersonList";
import PeopleVisibilityContext from '@/contexts/VisibilityContext';
import ThemeContext from '@/contexts/ThemeContext';
import { useContext, useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function People() {
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState(config.sort_by.default);
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const orderQuery = searchParams.get("people_order");
    const searchQuery = searchParams.get("people_search");
    const pathName = usePathname();
    const router = useRouter();
    
    const searchTimeoutRef = useRef(null);

    const { peopleVisibility, changeVisibility } = useContext(PeopleVisibilityContext);
    const { theme } = useContext(ThemeContext);

    const getRequest = useCallback((searchArg, orderArg) => {
        const params = new URLSearchParams();
        if (orderArg) params.append("people_order", orderArg);
        if (searchArg && searchArg.trim()) params.append("people_search", searchArg.trim());
        return params.toString() ? `?${params.toString()}` : '';
    }, []);

    const fetchPeople = useCallback(async (searchArg, orderArg) => {
        setLoading(true);
        setError(null);
        
        try {
            const res = await getPeopleClient(orderArg, searchArg);
            
            if (res.ok) {
                const json = await res.json();
                setPeople(json);
            } else {
                const errorText = await res.text();
                setError(`Error load: ${res.status} ${errorText}`);
                setPeople([]);
            }
        } catch (error) {
            setError('Error network');
            setPeople([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initialSearch = searchQuery || "";
        const initialOrder = orderQuery || config.sort_by.default;
        
        setSearch(initialSearch);
        setOrder(initialOrder);

        fetchPeople(initialSearch, initialOrder);
    }, []);

    const updateUrl = useCallback((searchArg, orderArg) => {
        const queryString = getRequest(searchArg, orderArg);
        const newPath = pathName + queryString;
        
        if (pathName + getRequest(search, order) !== newPath) {
            router.push(newPath);
        }
    }, [pathName, router, search, order, getRequest]);

    const handleSearchChange = (event) => {
        const searchArg = event.target.value;
        setSearch(searchArg);
        
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
            fetchPeople(searchArg, order);
            updateUrl(searchArg, order);
        }, 300);
    };

    const handleOrderChange = (event) => {
        const orderArg = event.target.value;
        setOrder(orderArg);

        fetchPeople(search, orderArg);
        updateUrl(search, orderArg);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const handleClearSearch = () => {
        setSearch("");
        fetchPeople("", order);
        updateUrl("", order);
    };

    return (
        <aside className="aside" style={peopleVisibility.stylePeople}>
            <button 
                type="button" 
                onClick={changeVisibility} 
                data-testid="people-visibility-toggle-aside"
                aria-label="close toggle aside"
            >
                <Image 
                    src={theme.iconPeopleClose} 
                    alt="close button" 
                    width={30} 
                    height={30}
                    priority={true}
                />
            </button>
            
            <form className="filter-order-form" onSubmit={(event) => event.preventDefault()}>
                <div className="search-container">
                    <input
                        id="people_search"
                        type="search"
                        placeholder={localeFilter.search.placeholder}
                        onChange={handleSearchChange}
                        value={search}
                        aria-label="people search"
                    />
                    {search && (
                        <button 
                            type="button" 
                            className="clear-search-btn"
                            onClick={handleClearSearch}
                            aria-label="clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <div className="order-container">
                    <div className="order-title">{localeOrder.title}</div>
                    <ul className="order-list" role="radiogroup">
                        {config.sort_by.collection.map((item) => (
                            <li key={`people_order_${item.alias}`}>
                                <input
                                    type="radio"
                                    id={`people_order_${item.alias}`}
                                    value={item.alias}
                                    checked={item.alias === order}
                                    onChange={handleOrderChange}
                                    name="people_order"
                                    aria-label={localeOrder.types[item.alias]?.label || item.alias}
                                />
                                <label htmlFor={`people_order_${item.alias}`}>
                                    {localeOrder.types[item.alias]?.label || item.alias}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
            
            {error ? (
                <div className="error-message" role="alert">
                    <span>⚠️ {error}</span>
                    <button onClick={() => fetchPeople(search, order)}>
                        { locale.list.repeat }
                    </button>
                </div>
            ) : isLoading ? (
                <Loading />
            ) : (
                <PersonList people={people} />
            )}
        </aside>
    );
}