'use client'

import { formatCurrency } from '@/util';
import { Button, Checkbox, Table } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import Image from 'next/image';
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/constant/types/product';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Link from 'next/link';
import { axiosClient } from '@/constant';
import ReusableModal from '../ReusableModal';

interface Props {
    data: Product[]
}

interface State {
    productIds: Product["_id"][]
}

dayjs.extend(utc)

function AppTable({
    data
}: Props) {

    const [state, setState] = React.useState<State>({
        productIds: [],
    })

    const modalRef = useRef<{ open: () => void; close: () => void }>(null);

    const router = useRouter()

    const onClickEdit = React.useCallback((item: Product) => () => {
        router.push(`./${item._id}`)
    }, [router]);

    const onChangeCheckBox = React.useCallback((item: Product) => (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setState((prevState) => ({ ...prevState, productIds: [...prevState.productIds, item._id] }))
        } else {
            setState((prevState) => ({
                ...prevState,
                productIds: prevState.productIds.filter(id => id !== item._id) // Xóa id khỏi mảng
            }))
        }
    }, []);

    const onClickDeleteProducts = React.useCallback(() => {
        modalRef.current?.open()
    }, []);

    const onConfirmDeleteProduct = React.useCallback(async () => {
        await axiosClient.delete('/quan-tri-vien/san-pham', {
            data: { productIds: state.productIds }  // Truyền body vào thông qua `data`
        });

        router.refresh()
    }, [router, state.productIds]);

    const columns = React.useMemo(() => {
        return [
            {
                title: 'Id',
                dataIndex: 'id',
                render: (text: string, item: Product, index: number) => {
                    return index + 1
                }
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
            },
            {
                title: 'Hình ảnh',
                dataIndex: 'image',
                render: (text: string, item: Product) => <Image alt='' src={item.images[0].url} width={100} height={100} />,
            },
            {
                width: 200,
                title: 'Giá',
                dataIndex: 'price',
                render: (text: string) => formatCurrency(`${text} VNĐ`)
            },
            {
                width: 175,
                title: 'Ngày tạo',
                dataIndex: 'created_at',
                render: (text: string) => dayjs.utc(text || undefined).format('HH:mm DD/MM/YYYY')
            },
            {
                width: 200,
                title: 'Chức năng',
                dataIndex: 'id',
                render: (text: string, item: Product) => (
                    <div className='flex flex-row gap-2 items-center'>
                        <Button type="primary" onClick={onClickEdit(item)}>Chỉnh sửa</Button>
                        <Checkbox onChange={onChangeCheckBox(item)} />
                    </div>
                )
            },
        ]
    }, [onChangeCheckBox, onClickEdit])

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <div>Quản lý kho</div>
                <div className="flex gap-1">
                    <Link href="/add">
                        <Button type="primary">Thêm sản phẩm</Button>
                    </Link>
                    <Button type='primary' danger onClick={onClickDeleteProducts}>Xóa sản phẩm</Button>
                </div>
            </div>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />
            <ReusableModal ref={modalRef} onOk={onConfirmDeleteProduct} />
        </>
    )
}

export default AppTable