import { Form, Input, notification } from 'antd'
import { useEffect, useState } from 'react'

import CRUDModal from 'src/app/components/CRUDModal'
import { Entity } from 'src/app/models'
import { entityApi } from 'src/app/apis'

const { TextArea } = Input

type Props = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    modalId: string,
    setModalId: React.Dispatch<React.SetStateAction<string>>,
    typeModal: string,
    setTypeModal: React.Dispatch<React.SetStateAction<string>>,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
}

const FormModal: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
    modalId,
    setModalId,
    typeModal,
    setTypeModal,
    setUpdate
}) => {
    const [form] = Form.useForm()
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                var res = await entityApi.getById(modalId)
                if (res) {
                    form.setFieldsValue(res)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        setDisable(typeModal === 'view' ? true : false)
        if (modalId !== '') {
            fetchData()
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId])

    const handleCancel = () => {
        form.resetFields()
        setTypeModal('')
        setModalId('')
        setModalVisible(false)
    }

    const handleOk = async () => {
        try {
            await form.validateFields()
            const formData = form.getFieldsValue(true)
            typeModal === 'edit' ? putData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    const postData = async (data: Entity) => {
        try {
            setButtonLoading(true)
            var res = await entityApi.add(data)
            if (res) {
                notification.success({
                    message: 'Th??m m???i th??nh c??ng!',
                    duration: 1,
                })
            } else {
                notification.error({
                    message: `L???i ${res}`,
                    description: `${res}`,
                })
            }
            setButtonLoading(false)
        } catch (error) {
            setButtonLoading(false)
        }
        setUpdate(true)
        handleCancel()
    }

    const putData = async (data: Entity) => {
        try {
            setButtonLoading(true)
            var res = await entityApi.update(modalId, data)
            if (res) {
                notification.success({
                    message: 'C???p nh???p th??nh c??ng!',
                    duration: 1,
                })
            } else {
                notification.error({
                    message: 'Th???t b???i!',
                    description: 'X???y ra l???i trong qu?? tr??nh th???c hi???n!',
                })
            }
            setButtonLoading(false)
        } catch (error) {
            setButtonLoading(false)
        }
        setUpdate(true)
        handleCancel()
    }

    return (
        <CRUDModal
            modalVisible={modalVisible}
            buttonLoading={buttonLoading}
            handleOk={handleOk}
            handleCancel={handleCancel}
            isLoading={isLoading}
            title='Lo???i th???c th???'
            typeModal={typeModal}
        >
            <Form {...layout} form={form}>
                <Form.Item
                    label='T??n'
                    name='entity'
                    rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}
                >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                </Form.Item>
                <Form.Item label='M?? t???' name='description'>
                    <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
                </Form.Item>
            </Form>
        </CRUDModal>
    )
}

export default FormModal
