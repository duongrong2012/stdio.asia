import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";


interface ReusableModalProps {
    title?: string;
    onOk?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
}

const ReusableModal = forwardRef((props: ReusableModalProps, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        open() {
            setVisible(true);
        },
        close() {
            setVisible(false);
        },
    }));

    return (
        <Modal
            title={
                <>
                    <ExclamationCircleOutlined style={{ color: 'red', marginRight: 8 }} />
                    {props.title || 'Xác nhận xóa sản phẩm'}
                </>
            }
            open={visible}
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
            onCancel={() => {
                setVisible(false);
                if (props.onCancel) props.onCancel();
            }}
            onOk={() => {
                setVisible(false);
                if (props.onOk) props.onOk();
            }}
        >
            {props.children || 'Bạn có chắc chắn muốn xóa sản phẩm?'}
        </Modal>
    );
});

ReusableModal.displayName = 'ReusableModal';

export default ReusableModal;