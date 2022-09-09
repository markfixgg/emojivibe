import keywords from './keywords.json';
import emoji from './emoji.json';

export default (language) => {
    return  Object.entries(emoji).reduce((pV, [key, value]) => {
        value.keywordStrings = value.keywords.map(word => keywords[word][language]);

        pV[key] = value;

        return pV;
    }, {});
}