import React, {useEffect, useMemo} from 'react';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import './Popup.css';

import Options from "./views/Options/Options";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";

import { store } from "./store";
import locales from "../../assets/locales";
import emoji from "../../assets/data/emoji";


const Popup = () => {
    useEffect(() => {
        const state = store.getState();

        if(state.options.language !== locales.getLanguage()) {
            locales.setLanguage(state.options.language);
        }
    }, [])

    const { options } = useSelector(state => state);

    const emojis = useMemo(() => emoji(options.language), [options.language])

    return (
        <Router initialEntries={['/home']}>
          <Header />

            <Routes>
                <Route path={"/options"} element={<Options />}/>
                <Route path={"/home"} element={<Home emojis={emojis} />}/>
            </Routes>
        </Router>
    );
};

export default Popup;
