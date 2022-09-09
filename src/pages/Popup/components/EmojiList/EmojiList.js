import React from 'react';
import './EmojiList.css';

const EmojiList = ({ header, icon, children }) => {
    return (
        <div className={"ps-3 pe-1 mt-2"}>
            <div className={"d-flex m-1 ml-2"}>
                <i className={`icon-${icon} mt-1`} style={{ color: 'rgb(133, 131, 131)' }}></i>

                <span id={"category_title"} style={{ marginLeft: '5px', color: '#858383', fontSize: '16px' }}>{header}</span>
            </div>

            <div className={"d-flex flex-wrap"}>
                {children}
            </div>
        </div>
    );
};

export default EmojiList;