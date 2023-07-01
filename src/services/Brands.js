import Service from "services"


const type = 'brands'
export const getData = (query) => {
    return Service.get(`${type}` ,   {params : {...query}} )
}

export const postData = (data) => {
    return Service.post(`${type}`,data)
}


export const putData = (id,data) => {
    return Service.put(`${type}/${id}`,data)
}

export const patchData = (id) => {
    return Service.patch(`/${type}/${id}`)
}
