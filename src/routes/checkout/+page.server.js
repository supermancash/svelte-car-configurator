import {initialData} from "../../data/initialConfig.js";
import {MERCEDES_API_KEY} from "$env/static/private";
import {selectableData} from "../../data/selectableConfig.js";
import {modelInfo} from "../../data/modelInfo.js";

export async function load({cookies, fetch}) {
    console.log(cookies.get('sessionid'))
    const res = await fetch('/api/saveconfiguration?sessionid=' + cookies.get('sessionid'), {method: 'GET'});
    const data = await res.json()
    return {
        configuration: data.message.configuration,
        initialData: initialData,
        selectables: selectableData,
        modelData: modelInfo
    };
}
