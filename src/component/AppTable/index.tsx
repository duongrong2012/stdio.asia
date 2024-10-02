'use client'

import { formatCurrency } from '@/util';
import { Button, Table } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import Image from 'next/image';
import React from 'react'

interface Props {
    data: object[]
}

dayjs.extend(utc)

function AppTable({
    data
}: Props) {

    const onClickEdit = React.useCallback((item) => () => {
    }, []);

    const columns = React.useMemo(() => {
        return [
            {
                title: 'Id',
                dataIndex: 'id',
                render: (text, item, index) => {
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
                render: (text, item) => <Image alt='' src={item.images[0].url} width={100} height={100} />,
            },
            {
                width: 200,
                title: 'Giá',
                dataIndex: 'price',
                render: (text) => formatCurrency(`${text} VNĐ`)
            },
            {
                width: 175,
                title: 'Ngày tạo',
                dataIndex: 'created_at',
                render: (text) => dayjs.utc(text || undefined).format('HH:mm DD/MM/YYYY')
            },
            {
                width: 200,
                title: 'Chức năng',
                dataIndex: 'id',
                render: (id, item) => (
                    <div>
                        <Button type="primary" onClick={onClickEdit(item)}>Chỉnh sửa</Button>
                        {/* <Button type="primary" danger onClick={onClickRemove(item)}>Xóa</Button> */}
                    </div>
                )
            },
        ]
    }, [])

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
        />
    )
}

export default AppTable