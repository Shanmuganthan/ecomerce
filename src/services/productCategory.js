import Service from "services"


export const getProductCategory = (query) => {
    return Service.get('/product-category' ,   {params : {...query}} )
}

export const postProductCategory = (data) => {
    return Service.post('product-category',data)
}


export const putProductCategory = (id,data) => {
    return Service.put(`/product-category/${id}`,data)
}

export const patchProductCategory = (id) => {
    return Service.patch(`/product-category/${id}`)
}
