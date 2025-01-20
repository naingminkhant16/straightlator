import PropTypes from "prop-types";

export default function SelectBox({languages}) {

    return (<>
        <select name="" id=""
                className='w-[17rem] rounded-lg bg-grey-100 p-2 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-400 sm:text-sm/6 '>
            {Object.keys(languages).map((key, index) => {
                const language = languages[key];
                return <option key={index} value={language.name}>{language.name}</option>;
            })}
        </select>
    </>)
}

SelectBox.propTypes = {
    languages: PropTypes.object,
}