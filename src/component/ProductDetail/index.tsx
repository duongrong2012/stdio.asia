'use client'

import React from 'react'
import styles from './styles.module.css';
import { Button, Image, Input, InputNumber, TreeSelect, Upload } from 'antd';
import { formatCurrency, readFile } from '@/util';
import { axiosClient, categories } from '@/constant';
import { PlusOutlined } from '@ant-design/icons';
import { Product } from '@/constant/types/product';
import { ProductImage } from '@/constant/types/image';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

interface Thumbnail {
    thumbUrl: string;
}

type ExtendedProductImage = ProductImage & Thumbnail;
interface State {
    name: string,
    price: number,
    quantity: number,
    categories: string[],
    // image: string |
    imageList: ExtendedProductImage
}
interface Props {
    productDetail?: null | Product,
    buttonName: string,
    title: string
    onSubmit?: (name: string, price: number, quantity: number, categories: string[], image: any[], imageList: any[], description: string) => void
}

export const maxProductImage = 1;

export const maxProductImageList = 3;

function ProductDetail({
    buttonName,
    onSubmit,
    productDetail,
    title
}: Props) {
    const [state, setState] = React.useState({
        name: "",
        price: 0,
        quantity: 0,
        categories: [],
        image: null,
        imageList: [],
        description: "",
    })
    // console.log("image : ", state.image)
    console.log("imageList : ", state.imageList)
    React.useEffect(() => {
        if (productDetail) {
            setState((prevState) => ({
                ...prevState,
                name: productDetail.name,
                price: productDetail.price,
                quantity: productDetail.quantity,
                categories: productDetail.categories.map((item) => item._id),
                image: productDetail.images[0].url,
                imageList: productDetail?.images.slice(1).map((item) => ({
                    ...item,
                    thumbUrl: item.url
                })),
                description: productDetail.description
            }))
        }
    }, [productDetail]);
    // console.log(state.imageList)
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

    const setImageBase64 = React.useCallback(async (fieldName, file, e) => {

        const response = await readFile(file);

        setState((prevState) => ({
            ...prevState,
            [fieldName]: {
                ...e.file,
                base64: response.result,
                fileList: e.fileList
            },
        }))

    }, []);

    const onUploadChange = React.useCallback((e) => {

        setImageBase64('image', e.file, e);
        // setState((prevState) => ({ ...prevState, fileSend: e.fileList }))
    }, [setImageBase64]);

    const onUploadImageListChange = React.useCallback((e: UploadChangeParam<UploadFile<any>>) => {
        setState((prevState) => ({ ...prevState, imageList: e.fileList }));
    }, []);

    const onClickButt = React.useCallback(() => {
        onSubmit(state.name, state.price, state.quantity, state.categories, state.image, state.imageList, state.description)
    }, [onSubmit, state.categories, state.description, state.image, state.imageList, state.name, state.price, state.quantity]);

    const productUIs = React.useMemo(() => {
        return [
            {
                title: "Tên sản phẩm",
                component: <Input
                    placeholder="Tên sản phẩm"
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
                                src={state?.image.base64 ?? state?.image}
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
            {
                name: 'imageList',
                valuePropName: 'fileList',
                title: 'Hình ảnh chi tiết',
                rules: [{ required: true, min: 1, type: 'array', message: 'Vui lòng chọn hình ảnh!' }],
                component: (
                    <Upload
                        accept="image/*"
                        listType="picture-card"
                        className="avatar-uploader"
                        maxCount={maxProductImageList}
                        multiple={state.imageList.length < maxProductImageList - 1}
                        beforeUpload={onBeforeUpload}
                        onChange={onUploadImageListChange}
                        fileList={state.imageList}
                    >
                        {state.imageList.length < maxProductImageList && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                            </div>
                        )}
                    </Upload>
                )
            },
            {
                name: 'description',
                title: 'Mô tả',
                rules: [
                    { required: true, message: 'Vui lòng nhập mô tả cho sản phẩm.' },
                    { max: 10000, message: 'Mô tả quá dài!' },
                ],
                component: <Input.TextArea
                    rows={8}
                    value={state.description}
                    onChange={onChangeInput("description")}
                />
            },
        ]
    }, [onBeforeUpload, onChangeCategories, onChangeInput, onChangeInputNumber, onUploadChange, onUploadImageListChange, renderCategoryItem, state.categories, state.description, state.image, state.imageList, state.name, state.price, state.quantity]);

    return (
        <div className={`${styles.container}`}>
            <div className=''>{title}</div>
            <div className={styles.border} />
            <div className={styles.productContainer}>
                {productUIs.map((item) => (
                    <div key={item.title} className={styles.itemContainer}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        {item.component}
                    </div>
                ))}
                <Button className={styles.customButt} onClick={onClickButt}>{buttonName}</Button>
            </div>
        </div>
    )
}

export default ProductDetail