'use client'

import React, { useRef } from 'react'
import ProductDetail from '@/component/ProductDetail';
import { axiosClient } from '@/constant';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import images from '@/assets';
import Image from 'next/image';
import { Product } from '@/constant/types/product';
import { createFile } from '@/util';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../redux/actionTypes'
import { ProductContext, productContext2 } from '@/component/Providers';

interface State {
    isOpenModal: boolean
    productDetail: null | Product
}

export default function UpdateProduct({ params }: { params: { id: string } }) {
    const { productState, setProductState } = React.useContext(ProductContext)!;

    const { productState2, dispatch: productDispatch } = React.useContext(productContext2)

    // console.log('productContext ', productState);

    const router = useRouter()

    const [state, setState] = React.useState<State>({
        isOpenModal: false,
        productDetail: null
    })

    const dispatch = useDispatch();

    const products = useSelector((state) => state.product.products)
    console.log("productState2", productState2)
    React.useEffect(() => {
        const getProductDetail = async () => {
            const { data } = await axiosClient.get(`/san-pham/${params.id}`);

            dispatch({
                type: ActionTypes.GET_PRODUCTS_SUCCESS,
                payload: data.results
            });

            productDispatch({
                type: ActionTypes.GET_PRODUCTS_SUCCESS,
                payload: data.results
            });

            setProductState({ products: data.results });

            setState((prevState) => ({ ...prevState, productDetail: data.results }))
        }

        getProductDetail()
    }, [dispatch, params.id, productDispatch, setProductState]);

    const onCloseModal = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpenModal: false }))
    }, []);

    const handleOk = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpenModal: false }))

        router.push('/')
        router.refresh()
    }, [router]);

    const onsubmit = React.useCallback(async (name, price, quantity, categories, image, imageList, description) => {
        if (name && categories.length && image && imageList.length && description) {
            const formData = new FormData();

            let productImages = []

            const imageNotChanged = []

            if (image.fileList) {
                productImages = [...image.fileList, ...imageList]
            } else {
                imageNotChanged.push({ url: image })

                productImages = [...imageNotChanged, ...imageList]
            }

            const promises = productImages.map((item) => {
                if (item.url) {
                    return createFile(item.url)
                }

                return Promise.resolve(item.originFileObj)
            })

            const images = await Promise.all(promises)

            formData.append('name', name);

            for (const category of categories) {
                formData.append('categories', category);
            }

            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', description);

            for (const image of images) {
                formData.append('productImages', image);
            }

            await axiosClient.patch(`/quan-tri-vien/san-pham/${params.id}`, formData);

            setState((prevState) => ({ ...prevState, isOpenModal: true }))
        }

    }, [params.id]);

    return (
        <>
            <ProductDetail buttonName="Cập nhật sản phẩm" onSubmit={onsubmit} productDetail={state.productDetail} title='Cập nhật sản phẩm' />
            <Modal
                open={state.isOpenModal}
                onOk={handleOk}
                onCancel={onCloseModal}
                footer={null}
                closable={false}
            >
                <div className={`flex flex-col gap-2 items-center justify-center`}>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <Image alt="" src={images.checked} height={50} width={50} />
                        <div className='text-lg'>Cập nhật thành công</div>
                    </div>
                    <Button type='primary' onClick={handleOk}>Ok</Button>
                </div>
            </Modal>
        </>
    )
}
