import {MERCEDES_API_KEY} from "$env/static/private";


let data = [];

export async function POST(event) {
    const body = await event.request.json();
    console.log(body)
    const index = data.findIndex(el => el.id ===body.sessionid);
    let obj = index > -1 ? data[index] :  {};
    obj.id = body.sessionid;
    obj.configuration = {eqAdd: body.equipmentAdded, eqRem: body.equipmentRemoved}
    if(index===-1)data.push(obj);

    return new Response(JSON.stringify({message: data}), {status: 200})
}

export async function GET({url}) {
    console.log(data)
    return new Response(JSON.stringify(
        {
            message: data[
                data.findIndex(el => el.id === url.searchParams.get('sessionid'))
                ]
        }
    ), {status: 200})
}
