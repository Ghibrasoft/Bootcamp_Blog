import { useState } from "react";
import brandLogo from "/brandLogo.svg";
import { useSelector } from "react-redux";
import NavBarStyles from "./NavBar.module.scss";
import { useAppDispatch } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { loggedUser } from "../../store/selectors/login";
import { Button, Form, Image, Input, Modal, Result } from "antd";
import { loginUser } from "../../store/reducers/login/loginSlice";



const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [modalForm] = Form.useForm();
    const userData = useSelector(loggedUser);
    const [openModal, setOpenModal] = useState(false);
    const addBlogLocation: boolean = window.location.pathname !== '/addblog';

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: addBlogLocation ? 'space-between' : 'center' }}>
            <div
                className={NavBarStyles.imageWrapper}
                onClick={() => navigate("/")}
            >
                <Image
                    preview={false}
                    src={brandLogo}
                    alt="brand-logo"
                    draggable={false}
                />
            </div>

            {addBlogLocation ?
                userData.isLogged ?
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
                :
                null
            }

            <Modal
                open={openModal}
                title="შესვლა"
                okText="შესვლა"
                confirmLoading={userData.loading}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => { setOpenModal(false); modalForm.resetFields() }}
                okButtonProps={{ style: { display: userData.isLogged ? 'none' : 'inline' } }}
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
                                { required: true, message: '' },
                                { type: 'email' },
                                { whitespace: true }
                            ]}
                            help={userData.error &&
                                <span style={{ color: 'var(--color-error)' }}>
                                    {userData.error.message}
                                </span>
                            }
                        >
                            <Input placeholder="Example@redberry.ge" />
                        </Form.Item>
                    </Form>
                }
            </Modal>
        </div>
    )
}

export default NavBar