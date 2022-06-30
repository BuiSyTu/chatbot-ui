import { useEffect, useState } from 'react'

import { Form, Input, notification, Select } from 'antd'

import CRUDModal from 'src/app/components/CRUDModal'
import { Keyword } from 'src/app/models'
import { keywordApi, entityApi } from 'src/app/apis'

const { Option } = Select

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

    const [entities, setEntities] = useState([])

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    useEffect(() => {
        const fetchIntents = async () => {
            const res = await entityApi.getAll()
            if (res) {
                setEntities(res)
            }
        }

        fetchIntents()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                var res = await keywordApi.getById(modalId)
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

    const postData = async (data: Keyword) => {
        try {
            setButtonLoading(true)
            var res = await keywordApi.add(data)
            if (res) {
                notification.success({
                    message: 'Thêm mới thành công!',
                    duration: 1,
                })
            } else {
                notification.error({
                    message: `Lỗi ${res}`,
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

    const putData = async (data: Keyword) => {
        try {
            setButtonLoading(true)
            var res = await keywordApi.update(modalId, data)
            if (res) {
                notification.success({
                    message: 'Cập nhập thành công!',
                    duration: 1,
                })
            } else {
                notification.error({
                    message: 'Thất bại!',
                    description: 'Xảy ra lỗi trong quá trình thực hiện!',
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
            title='Từ khóa'
            typeModal={typeModal}
        >
            <Form {...layout} form={form}>
                <Form.Item
                    label='Nội dung'
                    name='keyword'
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                </Form.Item>
                <Form.Item label='Loại thực thể' name='entity_id'>
                    <Select>
                        {entities.map((item: any) => (
                            <Option key={item.id} value={item.id}>{item.entity}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </CRUDModal>
    )
}

export default FormModal
