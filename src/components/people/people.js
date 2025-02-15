"use client";

import dictFilter from "@/dictionaries/ru/people/filter.json";
import dictOrder from "@/dictionaries/ru/people/order.json";
import Image from "next/image";
import Loading from '@/components/loading';
import OrderTypes from "@/components/people/order-types.json";
import PersonList from "./person-list";
import PeopleVisibilityContext from '@/components/people/visibility-context';
import ThemeContext from '@/components/theme/theme-context';
import { useContext, useCallback } from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function People() {
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("name");
    const [people, setPeople] = useState([]);

    const searchParams = useSearchParams();
    const orderQuery = searchParams.get("people_order");
    const searchQuery = searchParams.get("people_search");
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (orderQuery) setOrder(orderQuery);
        if (searchQuery) setSearch(searchQuery);
    }, [orderQuery, searchQuery]);

    const { peopleVisibility, changeVisibility } = useContext(PeopleVisibilityContext);
    const { theme } = useContext(ThemeContext);

    const fetchPeople = useCallback(async (searchArg, orderArg) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/people${getRequest(searchArg, orderArg)}`);
            if (res.ok) {
                const json = await res.json();
                setPeople(json);
            } else {
                setPeople([]);
            }
        } catch (error) {
            console.error("Error loading data:", error);
            setPeople([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPeople(search, order);
    }, [search, order, fetchPeople]);

    function getRequest(searchArg, orderArg) {
        const params = new URLSearchParams();
        if (orderArg) params.append("people_order", orderArg);
        if (searchArg) params.append("people_search", searchArg);
        return params.toString() ? `?${params.toString()}` : '';
    }

    const handleSearchChange = (event) => {
        const searchArg = event.target.value;
        setSearch(searchArg);
        fetchPeople(searchArg, order);
        router.replace(pathName + getRequest(searchArg, order));
    };

    const handleOrderChange = (event) => {
        const orderArg = event.target.value;
        setOrder(orderArg);
        fetchPeople(search, orderArg);
        router.replace(pathName + getRequest(search, orderArg));
    };

    return (
        <aside className="aside" style={peopleVisibility.stylePeople}>
            <button type="button" onClick={changeVisibility}>
                <Image src={theme.iconPeopleClose} alt="close button" width={30} height={30} />
            </button>
            <form className="filter-order-form" onSubmit={(event) => event.preventDefault()}>
                <input
                    id="people_search"
                    type="search"
                    placeholder={dictFilter.search.placeholder}
                    onChange={handleSearchChange}
                    value={search}
                />
                <div className="order-container">
                    <div>{dictOrder.title}</div>
                    <ul className="order-list">
                        {OrderTypes.map(item => (
                            <li key={`people_order_${item.alias}`}>
                                <input
                                    type="radio"
                                    id={`people_order_${item.alias}`}
                                    value={item.alias}
                                    checked={item.alias === order}
                                    onChange={handleOrderChange}
                                />
                                <label htmlFor={`people_order_${item.alias}`}>
                                    {dictOrder.types[item.alias].label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
            {isLoading ? <Loading /> : <PersonList people={people} />}
        </aside>
    );
}
