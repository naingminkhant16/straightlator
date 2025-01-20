// import SelectBox from "../components/SelectBox.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Select from "react-select";

export default function Translator() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const KEY = 'd15ae18652msh5f8ee455d480813p11d066jsn5813bb2891a0';
    const HOST = 'microsoft-translator-text-api3.p.rapidapi.com';
    const languagesUrl = 'https://microsoft-translator-text-api3.p.rapidapi.com/languages';

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('x-rapidapi-key', KEY);
    headers.append('x-rapidapi-host', HOST);

    useEffect(() => {
        getLanguages();
    }, []);

    async function getLanguages() {
        const response = await axios({
            method: "GET",
            url: languagesUrl,
            headers
        });
        console.log(response.data);
        const temp = [];
        Object.keys(response.data.translation).map((key) => {
            const language = response.data.translation[key];
            temp.push({value: language.name, label: language.name});
        })
        setLanguages(temp);
        setIsLoading(false);
    }

    function handleChangeFromLanguage(language) {
        console.log(language);
    }

    function handleChangeToLanguage(language) {
        console.log(language);
    }


    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 text-sky-400">Straightlator</h1>
            <div className="w-[40rem] border m-auto mt-12 p-5">
                <div className="flex items-center justify-between">
                    {
                        <Select options={languages}
                                placeholder="Choose a language..."
                                className={'w-[17rem]'}
                                isLoading={isLoading}
                                isSearchable={true}
                                isClearable={true}
                                name="languages"
                                onChange={handleChangeFromLanguage}
                        />}
                    <svg className='reversesvg'
                         width="24"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z">
                        </path>
                    </svg>
                    {
                        <Select options={languages}
                                placeholder="Choose a language..."
                                className={'w-[17rem]'}
                                isLoading={isLoading}
                                isSearchable={true}
                                isClearable={true}
                                onChange={handleChangeToLanguage}
                        />
                    }
                </div>
            </div>
        </>
    );
}