import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

import './Options.css';
import {
    changeAutoCopy,
    changeAutoInsert,
    changeIconSize, changeLanguage,
    changeNumberOfRecent
} from "../../features/options/options.slice";
import locales from "../../../../assets/locales";

const Option = ({ title, subtitle, active, buttons, onClick }) => {
    return (
        <div className={"option"}>
            <h6>{title}</h6>

            <small style={{ fontSize: '14px' }}>{subtitle}</small>

            {
                buttons.map((button, index) => {
                    return <button className={`options__btn ${button.value === active && 'active'}`} onClick={() => onClick(button.value)} key={index}>{button.name}</button>
                })
            }

        </div>
    )
}

const Options = () => {
    const [ navigate, setNavigate ] = useState(false);

    const { options } = useSelector((state) => state);
    const dispatch = useDispatch();


    const changeIconSizeHandler = (value) => {
        dispatch(changeIconSize(value));

        setNavigate(true);
    }

    return (
        <SimpleBar autoHide={false} id="options" className={"pb-2"} style={{ overflow: "auto" }}>
            <div className="mt-3 ms-4 pb-4">
                { navigate && <Navigate to={'/home'} /> }

                <Link style={{ fontWeight: 'bold', fontSize: '14px' }} id="go_back" to={'/home'}>{'< GO BACK'}</Link>

                <div className="ms-2">
                    <Option
                        title={locales.options.languageTitle}
                        subtitle={locales.options.languageSubtitle}
                        onClick={(value) => dispatch(changeLanguage(value))}
                        active={options.language}
                        buttons={[
                            { name: "EN", value: 'en' },
                            { name: "DE", value: 'de' },
                            { name: "ES", value: 'es' },
                            { name: "FR", value: 'fr' },
                            { name: "PT", value: 'pt' },
                            { name: "UK", value: 'uk' },
                            { name: 'RU', value: 'ru' }
                        ]}
                    />

                    <Option
                        title={locales.options.autoCopyTitle}
                        subtitle={locales.options.autoCopySubtitle}
                        onClick={(value) => dispatch(changeAutoCopy(value))}
                        active={options.autoCopy}
                        buttons={[ { name: "ON", value: true }, { name: "OFF", value: false } ]}
                    />

                    {/*<Option*/}
                    {/*    title={locales.options.autoInsertTitle}*/}
                    {/*    subtitle={locales.options.autoInsertSubtitle}*/}
                    {/*    onClick={(value) => dispatch(changeAutoInsert(value))}*/}
                    {/*    active={options.autoInsert}*/}
                    {/*    buttons={[ { name: "ON", value: true }, { name: "OFF", value: false } ]}*/}
                    {/*/>*/}

                    <Option
                        title={locales.options.panelIconSizeTitle}
                        subtitle={locales.options.panelIconSizeSubtitle}
                        onClick={changeIconSizeHandler}
                        active={options.iconSize}
                        buttons={[ { name: locales.options.buttons.small, value: 24 }, { name: locales.options.buttons.normal, value: 32 } ]} // , { name: locales.options.buttons.large, value: 40 }
                    />

                    <Option
                        title={locales.options.recentsTitle}
                        subtitle={locales.options.recentsSubtitle}
                        onClick={(value) => dispatch(changeNumberOfRecent(value))}
                        active={options.numberOfRecent}
                        buttons={[ { name: "NONE", value: 0 }, { name: 10, value: 10 }, { name: 20, value: 20 }, { name: 30, value: 30 }, { name: 40, value: 40 }, { name: 50, value: 50 } ]}
                    />

                </div>
            </div>
        </SimpleBar>
    );
};

export default Options;