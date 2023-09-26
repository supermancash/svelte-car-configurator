import {initialData} from "../data/initialConfig.js";
import {MERCEDES_API_KEY} from "$env/static/private";
import {selectableData} from "../data/selectableConfig.js";
import {modelInfo} from "../data/modelInfo.js";

export async function load({cookies}) {
    const uuid = crypto.randomUUID();
    cookies.set('sessionid', uuid);
    const sessionid = cookies.get('sessionid');
        console.log(sessionid)

    return {
        sessionid: sessionid,
        initialData: initialData,
        selectables: selectableData,
        modelData: modelInfo
    };
}

