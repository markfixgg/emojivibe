import React, {createRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

import './Home.css';

import Emoji from "../../components/Emoji";
import EmojiList from "../../components/EmojiList";

import _ from 'lodash';

import { changeTone } from "../../features/emoji/emoji.slice";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Home = ( { emojis } ) => {
    const { options, emoji: emojiSlice } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [copyButtonTitle, setCopyButtonTitle] = useState("COPY");
    const [hoveredEmoji, setHoveredEmoji] = useState({});
    const [clipboard, setClipboard] = useState([]);
    const [search, setSearch] = useState("");

    const debouncedChangeHandler = useCallback(
        _.debounce(() => setCopyButtonTitle("COPY"), 1000)
    , []);

    const updateClipboard = async () => {
        let string = clipboard.reduce((string, emoji) => string + String.fromCodePoint(parseInt(emoji.code_points.base, 16)), "")

        await navigator.clipboard.writeText(string)

        setCopyButtonTitle("COPIED")

        debouncedChangeHandler();
    }

    useEffect(() => {
        if(options.autoCopy && clipboard.length > 0) {
            updateClipboard().then().catch();
        }
    }, [clipboard]);

    const emojiList = useMemo(() => {
        if(!search) return Object.values(emojis)

        return Object.values(emojis).filter(emoji => emoji.keywordStrings.join('').toLowerCase().includes(search.toLowerCase()))
    }, [search]);

    const emojiCategories = useMemo(() => Object.values(emojiList).reduce((object, emoji) => {
        if(["modifier", "regional"].includes(emoji.category)) return object;

        if(emoji.shortname.includes('tone') && !emoji.shortname.includes(emojiSlice.tone)) return object;

        if(emojiSlice.tone > 0) {
            const excluded = ['1f450', '1f64c', '1f91d', '1f44d', '1f44a', '270a', '1f91b', '1f91c', '270c',  '1f918', '1f44c', '1f448', '1f449', '270b', '1f91a', '1f590', '1f596', '1f596', '1f44b', '1f919', '1f64f', '1f64b', '1f64b-2640', '1f64b-2642'];

            if(excluded.includes(emoji.code_points.base)) return object;

            if(emoji.code_points.diversity_parent) {
                object = Object.entries(object).reduce((pV, [key, value]) => {
                    pV[key] = value.filter(predicate => predicate.code_points.base !== emoji.code_points.diversity_parent);

                    return pV;
                }, {})
            }
        }

        if(Array.isArray(object[emoji.category])) object[emoji.category].push(emoji);
        else object[emoji.category] = [emoji];

        return object;
    }, {
        people: []
    }), [emojiSlice.tone, emojiList])

    const categoryRef = useRef(Object.keys(emojiCategories).map(() => createRef()));

    const addToClipboard = (emoji) => {
        setClipboard(prev => [...prev, emoji]);
    }

    const clearClipboard = () => setClipboard([]);

    return (
        <div>
            <div style={{ height: '46px', background: '#e6e6e6', top: '50px', zIndex: 1, position: "sticky", fontSize: '24px' }} className={'d-flex justify-content-around align-items-center ps-4 pe-4'}>
                {Object.keys(emojiCategories).map((category, index) => <i key={index} style={{ cursor: 'pointer' }} className={`icon-${category}`} onClick={() => console.log(categoryRef.current[index].current.scrollIntoView())}/>)}
            </div>

            <SimpleBar className={'emoji_list_container'} autoHide={false} style={{ position: 'sticky', top: '96px' }}>
                <div className={"mt-4 mb-3 mr-1 d-flex align-items-center"}>
                    <div className={"ms-3 me-3"}>
                        <input onChange={(e) => setSearch(e.target.value)} placeholder={"SEARCH"} className={"search_input"}/>
                    </div>

                    <div>
                        {
                            [0, 1, 2, 3, 4, 5].map((item) => <button key={item} onClick={() => dispatch(changeTone(item))} className={`btn-tone btn-tone-${item} ${emojiSlice.tone === item && 'active'}`} />)
                        }
                    </div>
                </div>

                {!search && options.recent?.length > 0 && (
                    <EmojiList icon={'recent'} header={"Recents"}>
                        {
                            options.recent.map((emoji, index) => <Emoji select={addToClipboard} onMouseEnter={(emoji) => setHoveredEmoji(emoji)} onMouseOut={() => setHoveredEmoji({})} key={index} emoji={emoji} size={options.iconSize}/>)
                        }
                    </EmojiList>
                )}

                {
                    Object.entries(emojiCategories).map(([category, emojis], index) => {
                        if(!emojis.length) return null;

                        return (
                            <div key={index} ref={categoryRef.current[index]}>
                                <EmojiList icon={category} header={capitalizeFirstLetter(category)}>
                                    {
                                        emojis.map((emoji, index) => <Emoji select={addToClipboard} onMouseEnter={(emoji) => setHoveredEmoji(emoji)} onMouseOut={() => setHoveredEmoji({})} key={index} emoji={emoji} size={options.iconSize} />)
                                    }
                                </EmojiList>
                            </div>
                        )
                    })
                }

            </SimpleBar>

            <div style={{ height: '76px', background: '#e6e6e6', bottom: 0, position: "sticky" }} className={"d-flex align-items-center"}>
                <div className={"ms-2"}>
                    <div className="preview-text">{hoveredEmoji.shortname} { hoveredEmoji?.code_points?.base && `(${hoveredEmoji?.code_points?.base})` }</div>

                    <div className={"output_clipboard"} style={{ display: 'flex', alignItems: 'center', position: "relative", float: 'left', marginRight: '15px', overflow: 'clip' }}>

                        <div className={"clipboard_preview"}>
                            {
                                clipboard.map((emoji, index) => {
                                    const category = emoji.diversity && emoji.diversity.length > 0 ? 'diversity' : emoji.category;

                                    return (
                                        <div key={index} className={`icon_wrapper small`} style={{ cursor: 'default' }}>
                                            <div className={`icon joypixels-24-${category} _${emoji.code_points.base}`} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <span onClick={clearClipboard} style={{ position: 'absolute', right: '10px' }}/>
                    </div>

                    <button onClick={() => {
                        updateClipboard().then(() => clearClipboard())
                    }} className={`options__btn active`} style={{ borderRadius: '3px', width: '89px' }}>{copyButtonTitle}</button>
                </div>
            </div>
        </div>
    );
};

export default Home;