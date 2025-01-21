import axios from "axios";
import {useEffect, useState} from "react";
import Select from "react-select";
import supportedLanguages from "../assets/languages.json";

export default function Translator() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [requiredText, setRequiredText] = useState(false);
    const [text, setText] = useState(null);
    const [translatedText, setTranslatedText] = useState('');
    const KEY = 'd15ae18652msh5f8ee455d480813p11d066jsn5813bb2891a0';
    const HOST = 'google-translate113.p.rapidapi.com';
    const translateUrl = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    useEffect(() => {
        getLanguages();
    }, []);

    function getLanguages() {
        const temp = supportedLanguages.map(l => {
            return {value: l.code, label: l.language};
        });
        setLanguages(temp);
        setIsLoading(false);
    }

    function handleChangeToLanguage(language) {
        if (language) {
            setSelectedLanguage(language.value);
        }
    }

    async function translate() {
        if (text === null || text === '') {
            setRequiredText(true);
            return;
        }

        headers.append('x-rapidapi-key', KEY);
        headers.append('x-rapidapi-host', HOST);

        const response = await axios({
            method: "POST",
            url: translateUrl,
            headers,
            data: {
                from: 'auto', to: selectedLanguage, text
            },
        });

        setTranslatedText(response.data.trans);
    }

    function handleTextOnChange(e) {
        setText(e.target.value);
        setRequiredText(false);
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 text-sky-400">Straightlator</h1>
            <div className="w-full max-w-2xl border rounded-md m-auto mt-10 p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Select
                        options={languages}
                        placeholder="Choose a language..."
                        className="w-full sm:w-[17rem]"
                        isLoading={isLoading}
                        isSearchable={true}
                        isClearable={true}
                        name="languages"
                    />
                    <svg
                        className="reversesvg mx-auto sm:mx-0"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
                    </svg>
                    <Select
                        options={languages}
                        placeholder="Choose a language..."
                        className="w-full sm:w-[17rem]"
                        isLoading={isLoading}
                        isSearchable={true}
                        isClearable={true}
                        onChange={handleChangeToLanguage}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-3">
                    <div className="w-full sm:w-[17rem]">
            <textarea
                defaultValue={text}
                onChange={handleTextOnChange}
                placeholder="Enter Text"
                className={
                    "border w-full p-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1 " +
                    (requiredText ? "border-red-500" : "")
                }
                rows={5}
            />
                    </div>
                    <div className="w-full sm:w-[17rem]">
            <textarea
                disabled={true}
                className="border w-full rounded-md p-3 bg-gray-200 text-gray-600"
                rows={5}
                defaultValue={translatedText}
                placeholder="Translation"
            />
                    </div>
                </div>

                <div className="mt-3">
                    <button
                        type="button"
                        onClick={translate}
                        className="bg-sky-400 text-white p-2 rounded-lg w-full"
                    >
                        Translate
                    </button>
                </div>
            </div>
        </>
    );
}