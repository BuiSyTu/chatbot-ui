import { useState, useEffect } from 'react'
import clsx from 'clsx'

import { Divider, Input, notification, Typography } from 'antd'

import { PageTitle } from 'src/_metronic/layout/core'
import TableList from 'src/app/components/TableList'
import { aiApi } from 'src/app/apis'

const { Search } = Input
const { Text } = Typography

const TrainingTest = () => {
    const [isTraining, setIsTraining] = useState(false)
    const [intents, setIntents] = useState([])

    const [inputValue, setInputValue] = useState('')
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                var res = await aiApi.test(inputValue)
                setIntents(res?.intents ?? [])
                setCount(res?.intents.length ?? 0)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        setUpdate(false)

        if (inputValue.trim().length > 0) {
            fetchData()
        }

        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

    useEffect(() => {
        setUpdate(true)
        return () => { }
    }, [offset, size])

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: unknown, record: unknown, index: any) => {
                return (
                    <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {index + 1}
                    </Text>
                )
            },
            width: '5%',
        },
        {
            title: 'Ý định',
            dataIndex: 'intent',
            key: 'intent',
            width: '50%',
        },
        {
            title: 'Độ chính xác',
            dataIndex: 'reliability',
            key: 'reliability',
            width: '45%',
        },
    ]

    const handleTraining = async () => {
        try {
            setIsTraining(true)

            const res = await aiApi.training()

            if (res) {
                notification.success({
                    message: 'Huấn luyện thành công',
                    duration: 1,
                })
            }

            setIsTraining(false)
        } catch (error: any) {
            setIsTraining(false)
            notification.error({
                message: 'Huấn luyện thất bại',
                duration: 1,
            })
        }

    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Huấn luyện - Kiểm tra</PageTitle>
            <div className='card mb-5 mb-xl-12 p-10'>
                <div className='d-flex row justify-content-between align-items-center px-5'>
                    <div className='col-xl-8 d-flex align-items-center'>
                        <Search
                            style={{ width: '100%', height: 35, borderRadius: 10 }}
                            placeholder='Nhập câu mẫu để kiểm tra'
                            onSearch={(e) => {
                                setInputValue(e)
                                setUpdate(true)
                            }}
                        />
                    </div>
                    <div className='col-xl-4 d-flex justify-content-end'>
                        <button
                            className={clsx('btn', isTraining ? 'btn-warning' : 'btn-danger', 'btn-sm m-btn m-btn--icon')}
                            onClick={handleTraining}
                        >
                            {isTraining ? 'Đang huấn luyện' : 'Huấn luyện'}
                        </button>
                    </div>
                </div>

                <Divider style={{ margin: '10px 0' }} />
                <TableList
                    dataTable={intents}
                    columns={columns}
                    isPagination={true}
                    size={size}
                    count={count}
                    setOffset={setOffset}
                    setSize={setSize}
                    loading={loading}
                />
            </div>
        </>
    )
}

export default TrainingTest

