import React, {useEffect, useState} from 'react';
import './Header.css';

import logo from '../../../../assets/img/icon-34.png'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Header = () => {
    const [popupOpened, setPopupOpened] = useState(false);

    useEffect(() => {
        (async () => {
            const tabs = await chrome.tabs.query({})

            const id = chrome.runtime.id;

            const extensionTabs = tabs.filter(tab => tab.url.includes('chrome-extension://') && tab.url.includes(id) && tab.width > 550 && tab.height > 550)
            if(extensionTabs.length > 0) {
                const { id: currentWindowId } = await chrome.windows.getCurrent()

                if(currentWindowId !== extensionTabs[0].windowId) {
                    chrome.windows.update(extensionTabs[0].windowId, {focused: true}, (window) => {})
                }

                setPopupOpened(true);
            }

        }) ();
    }, [])

    const openInTab = (url) => chrome.tabs.create({ url });
    const openInWindow = (url) => chrome.windows.create({ url, height: 717, width: 628, focused: true, type: 'popup' });

    const location = useLocation();

    const isHomePage = location.pathname === "/home";

    return (
        <div className={"header"}>
            <div onClick={openInTab.bind(null, 'https://emojivibe.com')} className={"logo"} style={{ display: 'flex', alignItems: 'center' }} >
                <img alt={"logo"} className={'ms-3'} src={logo} />
                <span className="ms-2 mx-auto fs-4 fw-bold">EmojiVibe</span>
            </div>

            <div className="buttons">
                {
                    !popupOpened && <button title="Re-Open Panel in New Window" className={'expand'} onClick={openInWindow.bind(null, 'popup.html')}/>
                }

                {/*{isHomePage && <button className={'search'}/>}*/}

                <Link to={'/options'}><button className={'gear'} /></Link>
            </div>
        </div>
    );
};

export default Header;