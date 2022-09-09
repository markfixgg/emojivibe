import React from 'react';
import './Emoji.css';
import { IEmoji } from "../../types";
import { useDispatch } from "react-redux";

// @ts-ignore
import { addToRecent } from "../../features/options/options.slice.js";

interface IProps {
    emoji: IEmoji;
    size: 24 | 32 | 40;
    onMouseEnter: any;
    onMouseOut: any;
    select: any;
}

const Emoji = ({ emoji, onMouseEnter, select, onMouseOut, size }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();

    const sizes = {
        24: 'small',
        32: 'normal',
        40: 'large'
    }
    if(emoji.category === "modifier") return null;

    const category = emoji.diversity && emoji.diversity.length > 0 ? 'diversity' : emoji?.category;

    const onEmojiClick = (e: any) => {
        e.preventDefault();

        select(emoji);

        dispatch(addToRecent({...emoji, keywordStrings: []}))
    }

    return (
        <div onMouseOver={() => onMouseEnter(emoji)} onMouseOut={() => onMouseOut(emoji)} onClick={onEmojiClick} className={`icon_wrapper hover ${sizes[size]}`}>
            <div className={`icon joypixels-${size}-${category} _${emoji.code_points.base}`} />
        </div>
    );
};

export default Emoji;