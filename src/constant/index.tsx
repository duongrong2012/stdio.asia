import axios from "axios";

export const host = process.env.NEXT_PUBLIC_API_HOST;

export const axiosClient = axios.create({
    baseURL: `${host}`
});

export const categories = [
    {
        "_id": "65562070c3410b512b5c6560",
        "name": "Máy Tính & Laptop",
        "slug": "may-tinh-and-laptop",
        "parentCategory": null,
        "productCount": 5,
        "image": "http://localhost:3001/images/productImages/65562070c3410b512b5c655f.png",
        "createdAt": "2023-11-16T14:00:16.538Z",
        "updatedAt": "2024-09-30T14:33:26.550Z"
    },
    {
        "_id": "6565efc4acca85f014387c6a",
        "name": "Đồ Điện Tử",
        "slug": "do-dien-tu",
        "parentCategory": null,
        "productCount": 5,
        "image": "http://localhost:3001/images/productImages/6565efc4acca85f014387c69.png",
        "createdAt": "2023-11-28T13:48:52.357Z",
        "updatedAt": "2024-09-30T14:33:26.550Z"
    },
    {
        "_id": "657d1312d4fedf24d3db2200",
        "name": "Thể Thao",
        "slug": "the-thao",
        "parentCategory": null,
        "productCount": 0,
        "image": "http://localhost:3001/images/productImages/657d1312d4fedf24d3db21ff.png",
        "createdAt": "2023-12-16T03:01:38.983Z",
        "updatedAt": "2023-12-16T03:01:38.983Z"
    },
    {
        "_id": "6596cb0b57e3a76f067737b2",
        "name": "Nước Hoa",
        "slug": "nuoc-hoa",
        "parentCategory": null,
        "productCount": 0,
        "image": "http://localhost:3001/images/productImages/6596cb0b57e3a76f067737b1.jpg",
        "createdAt": "2024-01-04T15:13:15.620Z",
        "updatedAt": "2024-01-04T15:13:15.620Z"
    }
]