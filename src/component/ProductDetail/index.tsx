'use client'

import React from 'react'
import styles from './styles.module.css';
import { Input, InputNumber, TreeSelect, Upload } from 'antd';
import { formatCurrency, readFile } from '@/util';
import { categories } from '@/constant';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface State {
    name: string,
    price: number,
    quantity: number,
    categories: string[],
}

export const maxProductImage = 1;

export const maxProductImageList = 3;

function ProductDetail() {
    const [state, setState] = React.useState({
        name: "",
        price: 0,
        quantity: 0,
        categories: [],
        image: null,
        imageList: [],
    })

    const onChangeInput = React.useCallback((fieldName) => (e) => {
        setState((prevState) => ({ ...prevState, [fieldName]: e.target.value }))
    }, []);

    const onChangeInputNumber = React.useCallback((fieldName) => (value) => {
        setState((prevState) => ({ ...prevState, [fieldName]: value }))
    }, []);

    const renderCategoryItem = React.useCallback((item) => {
        let childrens = [];

        return (
            <TreeSelect.TreeNode
                key={item._id}
                value={item._id}
                title={item.name}
            >
                {childrens}
            </TreeSelect.TreeNode>
        );
    }, []);

    const onChangeCategories = React.useCallback((value: string[]) => {
        setState((prevState) => ({ ...prevState, categories: value }))
    }, []);

    const onBeforeUpload = React.useCallback(() => false, []);

    const setImageBase64 = React.useCallback(async (fieldName, file) => {
        try {
            const response = await readFile(file);

            setState((prevState) => ({
                ...prevState,
                [fieldName]: {
                    ...file,
                    base64: response.result,
                },
            }))
        } catch (error) {

        }
    }, []);

    const onUploadChange = React.useCallback((e) => {
        setImageBase64('image', e.file);

        return e.fileList;
    }, [setImageBase64]);

    const productUIs = React.useMemo(() => {
        return [
            {
                title: "Tên sản phẩm",
                component: <Input
                    placeholder="Basic usage"
                    className={styles.componentWidth}
                    value={state.name}
                    onChange={onChangeInput("name")}
                />
            },
            {
                title: "Giá sản phẩm",
                component: <InputNumber
                    parser={(value) => value.replace(/\D/g, '').trim()}
                    formatter={(value) => formatCurrency(`${value} VNĐ`)}
                    className={styles.componentWidth}
                    value={state.price}
                    onChange={onChangeInputNumber("price")}
                />
            },
            {
                title: "Số lượng",
                component: <InputNumber
                    parser={(value) => value.replace(/\D/g, '').trim()}
                    className={styles.componentWidth}
                    value={state.quantity}
                    onChange={onChangeInputNumber("quantity")}
                />
            },
            {
                title: "Danh mục",
                component: <TreeSelect
                    treeDefaultExpandAll
                    placeholder="Chọn danh mục"
                    treeCheckable
                    className={styles.componentWidth}
                    value={state.categories}
                    onChange={onChangeCategories}
                >
                    {categories.map(renderCategoryItem)}
                </TreeSelect>
            },
            {
                name: 'image',
                valuePropName: 'fileList',
                title: 'Hình ảnh đại diện',
                getValueFromEvent: onUploadChange,
                rules: [{ required: true, min: 1, type: 'array', message: 'Vui lòng chọn hình ảnh!' }],
                component: (
                    <Upload
                        accept="image/*"
                        listType="picture"
                        showUploadList={false}
                        maxCount={maxProductImage}
                        className={`avatar-uploader ${styles.uploadButton}`}
                        beforeUpload={onBeforeUpload}
                        onChange={onUploadChange}
                    >
                        {state.image
                            ? <Image
                                src={state.image.base64}
                                alt="avatar"
                                className={styles.uploadImage}
                            />
                            : (
                                <div className={styles.uploadButtonPlaceholder}>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                                </div>
                            )}
                    </Upload>
                )
            },
        ]
    }, [onBeforeUpload, onChangeCategories, onChangeInput, onChangeInputNumber, onUploadChange, renderCategoryItem, state.categories, state.image, state.name, state.price, state.quantity]);

    return (
        <div className={styles.container}>
            <div className=''>Thêm sản phẩm</div>
            <div className={styles.border} />
            <div className={styles.productContainer}>
                {productUIs.map((item) => (
                    <div key={item.title} className={styles.itemContainer}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        {item.component}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetail