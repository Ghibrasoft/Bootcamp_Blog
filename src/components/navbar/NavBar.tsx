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
                        Add Blog
                    </Button>
                </Link>
                :
                <Button
                    size="large"
                    type="primary"
                    htmlType="button"
                    onClick={() => setOpenModal(true)}
                >
                    Log in
                </Button>
            }

            <Modal
                open={openModal}
                title="Log in"
                okText="Log in"
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
                        status="success"
                        title="Authorization success"
                        extra={
                            <Button
                                size="large"
                                type="primary"
                                htmlType="button"
                                onClick={() => setOpenModal(false)}
                            >
                                Ok
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
                                label="Email"
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