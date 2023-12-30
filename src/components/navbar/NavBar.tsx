import { Button, Form, Image, Input, Modal, Result, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import NavBarStyles from "./NavBar.module.scss";

import brandLogo from "/brandLogo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/login/loginSlice";
import { RootState, useAppDispatch } from "../../store/store";


const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useSelector((state: RootState) => state.login);
    const [modalForm] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className={NavBarStyles.imageWrapper} onClick={() => navigate("/")}>
                <Image
                    preview={false}
                    src={brandLogo}
                    alt="brand-logo"
                    draggable={false}
                />
            </div>
            {userData.isLogged ?
                <Link to={"/addblog"}>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                    >
                        დაამატე ბლოგი
                    </Button>
                </Link>
                :
                <Button
                    size="large"
                    type="primary"
                    htmlType="button"
                    onClick={() => setOpenModal(true)}
                >
                    შესვლა
                </Button>
            }

            <Modal
                open={openModal}
                title="შესვლა"
                okText="შესვლა"
                okButtonProps={{ style: { display: userData.isLogged ? 'none' : 'inline' } }}
                onCancel={() => { setOpenModal(false); modalForm.resetFields() }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={async () => {
                    try {
                        await modalForm.validateFields();
                        const values = await modalForm.getFieldsValue();
                        dispatch(loginUser(values))
                        modalForm.resetFields();
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                {userData.isLogged ?
                    <Result
                        style={{ padding: 0 }}
                        status="success"
                        title="წარმატებული ავტორიზაცია"
                        extra={
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="button"
                                onClick={() => setOpenModal(false)}
                            >
                                კარგი
                            </Button>
                        }
                    />
                    :
                    <Spin spinning={userData.loading}>
                        <Form
                            form={modalForm}
                            layout="vertical"
                            name="login_form"
                            initialValues={{ modifier: 'public' }}
                        >
                            <Form.Item
                                name="email"
                                label="ელ-ფოსტა"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true },
                                    { type: 'email' },
                                    { whitespace: true }
                                ]}
                                help={userData.error &&
                                    <span style={{ color: 'var(--color-error)' }}>
                                        {userData.error}
                                    </span>
                                }
                            >
                                <Input placeholder="Example@redberry.ge" />
                            </Form.Item>
                        </Form>
                    </Spin>
                }
            </Modal>
        </>
    )
}

export default NavBar