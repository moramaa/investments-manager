import { ModalForm } from '@ant-design/pro-components';
import { ProFormInstance, ProFormText, ProFormMoney, ProFormSwitch, ProFormFieldSet, ProFormDependency, ProForm, ProFormSelect } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react'



const Modalform = () => {
    // להחליף את הפונקציה הזאות לPOST 
    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
    const restFormRef = useRef<ProFormInstance>();
    const formRef = useRef<ProFormInstance>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    return (
        <ModalForm
            title="השקעה חדשה "
            formRef={restFormRef}
            open={modalVisible}
            trigger={
                <Button
                    type="primary"
                    onClick={() => {
                        setModalVisible(true);
                    }}
                >
                    הוסף השקעה
                </Button>
            }
            onOpenChange={setModalVisible}

            submitter={{

                searchConfig: {
                    resetText: 'איפוס',
                    submitText: 'הוסף השקעה',

                },

                resetButtonProps: {
                    onClick: () => {
                        restFormRef.current?.resetFields();
                        //   setModalVisible(false);
                    },
                },
            }}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
                message.success('ההשקעה נוספה בהצלחה');
                return true;
            }}
        >
            <ProForm.Group grid >
                <ProFormText
                    width="sm"
                    name="investmentID"
                    label="שם ההשקעה"
                    placeholder="בחר שם להשקעה שלך "
                />
                <ProFormText
                    width="sm"
                    name="investmentProduced"
                    label="הפיק ההשקעה "
                    placeholder="באיזה מסלול מושקעים הכספים  "
                />
                <ProFormText
                    width="sm"
                    name="insuranceCompany"
                    label="חברת ביטוח "
                    placeholder="שם חברת הביטוח  "
                />
                <ProFormSwitch name="switch" label="קופה פעילה?" />
            </ProForm.Group>
            {/*  */}
            <ProFormSelect
                name="select2"
                label="בחר השקעה"
                showSearch
                width="sm"

                debounceTime={300}
                request={async () => await [
                    { label: '全部', value: 'all' },
                    { label: '未解决', value: 'open' }
                    // fetch('https://jsonplaceholder.typicode.com/todos/1')
                    //     .then(response => response.json())
                    //     .then(json => console.log(json))
                    ]
                    }

                placeholder="בחר הפיק השקעה"
                rules={[{ required: true, message: 'בחר הפיק!' }]}
            />
            {/*  */}
            <ProFormMoney
                label="צבירה התחלתית"
                tooltip="?כמה צברתם עד היום"
                name="amount1"
                initialValue={0}
                min={0}
                customSymbol="₪"
                width="sm"
            />
            <ProFormMoney
                label="הפקדה חודשתי"
                tooltip="?כמה מפקדיםבכל חודש?"
                name="amount2"
                initialValue={0}
                min={0}
                customSymbol="₪"
                width="sm"
            />
            {/*חישוב סהכ   */}
            <ProFormDependency name={['amount1', 'amount2']}>
                {({ amount1, amount2 }) => {
                    return <div>{amount1 + amount2}</div>;
                }}
            </ProFormDependency>
            {/*  */}


        </ModalForm>
    )
}

export default Modalform