'use client'

import React from 'react'
import ProductDetail from '@/component/ProductDetail';
import { axiosClient } from '@/constant';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import images from '@/assets';
import Image from 'next/image';
import styles from './styles.module.css';

interface State {
    isOpenModal: boolean
}

export default function Add() {

    const router = useRouter()

    const [state, setState] = React.useState<State>({
        isOpenModal: false
    })

    const onCloseModal = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpenModal: false }))
    }, []);

    const handleOk = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpenModal: false }))

        router.push('./')
        router.refresh()
    }, [router]);

    const onsubmit = React.useCallback(async (name, price, quantity, categories, image, imageList, description) => {
        if (name && categories.length && image && imageList.length && description) {
            const formData = new FormData();

            const productImages = [...image.fileList, ...imageList]

            formData.append('name', name);

            for (const category of categories) {
                formData.append('categories', category);
            }

            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', description);

            for (const image of productImages) {
                formData.append('productImages', image.originFileObj);
            }

            await axiosClient.post('/quan-tri-vien/san-pham', formData)

            setState((prevState) => ({ ...prevState, isOpenModal: true }))
        }
    }, []);

    return (
        <>
            <ProductDetail buttonName="Thêm sản phẩm" onSubmit={onsubmit} title='Thêm sản phẩm' />
            <Modal
                open={state.isOpenModal}
                onOk={handleOk}
                onCancel={onCloseModal}
                footer={null}
                className={styles.modalContainer}
                closable={false}
            >
                <div className={`flex flex-col gap-2 items-center justify-center`}>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <Image alt="" src={images.checked} height={50} width={50} />
                        <div className='text-lg'>Thêm sản phẩm thành công</div>
                    </div>
                    <Button className='' type='primary' onClick={handleOk}>Ok</Button>
                </div>
            </Modal>
        </>
    )
}
