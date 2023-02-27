import React from 'react'
import { PageContainer, ProCard } from '@ant-design/pro-components';

type Props = {}

const Tabs = (props: Props) => {
    return (
        <div
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                header={{
                    title: 'ההשקעות שלך ',
                    ghost: true,
                    extra: [
                       
                    ],
                }}
                tabList={[
                    {
                        tab: '1',
                        key: 'base',
                        closable: false,
                        children: `Content of Tab Pane 1`,
                    },
                    {
                        tab: '2',
                        key: 'info',
                        closable: false,
                        children:
                            <ProCard direction="column" ghost gutter={[0, 16]}>
                                <ProCard gutter={16} style={{ height: 200 }}>

                                </ProCard>
                            </ProCard>,
                    },
                ]}
                tabProps={{
                    type: 'editable-card',
                    hideAdd: true,
                    onEdit: (e, action) => console.log(e, action),
                }}

            >
            </PageContainer>
        </div>
    )
}

export default Tabs