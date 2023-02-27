import { ModalForm } from '@ant-design/pro-components';
import { ProFormInstance, ProFormText, ProFormMoney, ProFormSwitch, ProFormDigit, ProFormFieldSet, ProFormDependency, ProForm, ProFormSelect } from '@ant-design/pro-form';
import { Button, message } from 'antd/lib';
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

    const details = () => {
        return (
            <ProForm.Group  >
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
                <ProFormSwitch name="isActive" label="קופה פעילה?" />
            </ProForm.Group>
        )
    }

    // השקעה עם קריאה לAPI

    // <ProFormSelect
    // name="select2"
    // label="בחר השקעה"
    // showSearch
    // width="sm"

    // debounceTime={300}
    // request={async () => await [
    //     { label: 'S&P', value: 'all' },
    //     { label: 'S&', value: 'open' }
    //     // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     //     .then(response => response.json())
    //     //     .then(json => console.log(json))
    //     ]
    //     }

    // placeholder="בחר הפיק השקעה"
    // rules={[{ required: true, message: 'בחר הפיק!' }]}
    // />

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
            {details()}

            {/*  */}
            <ProForm.Group  >
                <ProFormMoney
                    label="צבירה התחלתית"
                    tooltip="?כמה צברתם עד היום"
                    name="initialInvestment"
                    initialValue={0}
                    min={0}
                    customSymbol="₪"
                    width="sm"
                />
                <ProFormMoney
                    label="הפקדה חודשתי"
                    tooltip="?כמה מפקדים בכל חודש?"
                    name="monthlyDeposit"
                    initialValue={0}
                    min={0}
                    customSymbol="₪"
                    width="sm"
                />
            </ProForm.Group>
            <ProForm.Group  >

                <ProFormDigit placeholder="מספרים שנים" width="xs" label="מספר שנים" name="yearsOfInvestment" min={0} fieldProps={{ precision: 0 }}></ProFormDigit>
                <ProFormDigit placeholder="מספרים שנים"  width="xs" label="ריבית שנתית " name="annualInterestRate" min={0} fieldProps={{ precision: 2 }}></ProFormDigit>

            </ProForm.Group>
            <ProForm.Group  >

                <ProFormDigit placeholder="מספרים שנים"  width="xs" label="דמי ניהול מחיסכון/מצבירה" name="annualManagementFees" min={0} max={6} fieldProps={{ precision: 2 }}></ProFormDigit>
                <ProFormDigit placeholder="מספרים שנים" width="xs" label="דמי ניהול מהפקדה" name="monthlyManagementFees" min={0} max={6} fieldProps={{ precision: 2 }}></ProFormDigit>

            </ProForm.Group>

            {/*חישוב סהכ   */}
            <ProFormDependency name={['initialInvestment', 'monthlyDeposit', 'yearsOfInvestment', 'annualInterestRate', 'annualManagementFees', 'monthlyManagementFees']}>
                {({ initialInvestment, monthlyDeposit, yearsOfInvestment, annualInterestRate, annualManagementFees, monthlyManagementFees }) => {
                    const monthlyInterestRate = annualInterestRate / 12 / 100;
                    const monthlyManagementFeeRate = monthlyManagementFees / 100;
                    const annualManagementFeeRate = annualManagementFees / 100;

                    let balance = initialInvestment;
                    let totalManagementFees = 0;

                    for (let i = 0; i < yearsOfInvestment * 12; i++) {
                        // Add monthly deposit
                        balance += monthlyDeposit;

                        // Apply monthly interest rate
                        const monthlyInterest = balance * monthlyInterestRate;
                        balance += monthlyInterest;

                        // Apply monthly management fee on deposit
                        const monthlyDepositManagementFee = monthlyDeposit * monthlyManagementFeeRate;
                        balance -= monthlyDepositManagementFee;

                        // Track total management fees
                        totalManagementFees += monthlyDepositManagementFee;

                        // Apply annual management fee on balance
                        if (i % 12 === 0) {
                            const annualManagementFee = balance * annualManagementFeeRate;
                            balance -= annualManagementFee;

                            // Track total management fees
                            totalManagementFees += annualManagementFee;
                        }
                    }

                    return <div>{balance.toFixed(0)}
                    </div>
                }}
            </ProFormDependency>
            {/*  */}

        </ModalForm>
    )
}

export default Modalform