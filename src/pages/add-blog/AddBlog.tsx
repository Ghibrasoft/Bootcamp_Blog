import uploadIcon from "/upload.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddBlogStyles from "./AddBlog.module.scss";
import { useAppDispatch } from "../../store/store";
import { token } from "../../utils/constants/token";
import { IFormDataProps } from "../../types/blogType";
import { isGeorgian } from "../../utils/helpers/isGeorgian";
import { addBlogData } from "../../store/selectors/addBlog";
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { isMinTwoWords } from "../../utils/helpers/isMinTwoWords";
import { categoriesData } from "../../store/selectors/categories";
import { InfoCircleFilled, LeftOutlined } from "@ant-design/icons";
import { addBlog } from "../../store/reducers/add-blog/addBlogSlice";
import { fetchCategories } from "../../store/reducers/categories/categoriesSlice";
import { ConfigProvider, DatePicker, Form, Image, Input, Modal, Result, Tag } from "antd";
import {
    Button,
    Select,
    Upload,
} from 'antd';

// for validate (success) color
const getComponentStyles = (submittable: boolean) => {
    return {
        colorBgContainer: submittable ? '#F8FFF8' : 'var(--color-neutral-1)',
        colorBorder: submittable ? '#14D81C' : 'var(--color-neutral-5)',
    }
}
export default function AddBlog() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const addedBlogData = useSelector(addBlogData);
    const categories = useSelector(categoriesData);
    const [openModal, setOpenModal] = useState(false);


    // select
    const tagRender = (props: CustomTagProps) => {
        const { value, closable, onClose } = props;
        const category = categories.data.find((opt) => opt.id === Number(value));

        if (category) {
            const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
                event.preventDefault();
                event.stopPropagation();
            };

            return (
                <Tag
                    color={category.background_color}
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{
                        gap: 10,
                        display: 'flex',
                        padding: '8px 16px',
                        borderRadius: '30px',
                        color: category.text_color,
                    }}
                >
                    {category.title}
                </Tag>
            );
        }

        return <></>;
    };
    useEffect(() => {
        const fetchCategoriesData = () => {
            dispatch(fetchCategories())
        }
        fetchCategoriesData()
    }, []);

    // image upload 
    const normFile = (e: any) => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // form functionality
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);
    const authorVal = Form.useWatch('author', form);
    const titleVal = Form.useWatch('title', form);
    const descVal = Form.useWatch('description', form);
    const [validationColor, setValidationColor] = useState({
        author: 'var(--color-neutral-7)',
        title: 'var(--color-neutral-7)',
        description: 'var(--color-neutral-7)'
    });
    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);
    const onBlurHandler = (field: string) => {
        switch (field) {
            case 'author':
                if (authorVal?.length <= 4 || authorVal && isMinTwoWords(authorVal) || isGeorgian(authorVal)) {
                    setValidationColor(prev => ({ ...prev, author: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, author: 'var(--color-neutral-7)' }))
                }
                break;
            case 'title':
                if (titleVal?.length <= 4) {
                    setValidationColor(prev => ({ ...prev, title: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, title: 'var(--color-neutral-7)' }))
                }
                break;
            case 'description':
                if (descVal?.length <= 4) {
                    setValidationColor(prev => ({ ...prev, description: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, description: 'var(--color-neutral-7)' }))
                }
                break;
            default:
                break;
        }
    };
    const onFormChange = () => {
        const formValue = form.getFieldsValue();

        // omit publish_date from the form value
        const { publish_date, ...formValuesWithoutDate } = formValue;

        localStorage.setItem("formValue", JSON.stringify(formValuesWithoutDate));
    };

    useEffect(() => {
        const savedFormValues = localStorage.getItem("formValue");
        if (savedFormValues) {
            const parsedValues = JSON.parse(savedFormValues);
            form.setFieldsValue(parsedValues);
        }
    }, [form]);
    const onFinish = async (values: IFormDataProps) => {
        // console.log(values)
        try {

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'image') {
                    formData.append(key, value[0].originFileObj);
                } else if (key === 'categories') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });

            dispatch(addBlog({ formData, token }));
            setOpenModal(true);
            form.resetFields();
            localStorage.removeItem("formValue");
        } catch (error) {
            console.error("Error in onFinish:", error);
        }
    };


    return (
        <section className={AddBlogStyles.addblog_section}>
            <div className={AddBlogStyles.addblog_section_content}>
                <div className={AddBlogStyles.addblog_section_content_title}>
                    <Button
                        className={AddBlogStyles.addblog_section_content_title_btn}
                        size="large"
                        type="default"
                        shape="circle"
                        icon={<LeftOutlined />}
                        onClick={() => history.back()}
                    />
                    <h1>ბლოგის დამატება</h1>
                </div>

                <div className={AddBlogStyles.addblog_section_content_formWrapper}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: getComponentStyles(submittable),
                                Select: getComponentStyles(submittable),
                                DatePicker: getComponentStyles(submittable)
                            }
                        }}>
                        <Form
                            className={AddBlogStyles.addblog_section_content_formWrapper_form}
                            form={form}
                            name="add_blog"
                            layout="vertical"
                            onFinish={onFinish}
                            onValuesChange={onFormChange}
                        >
                            {/* upload photo */}
                            <Form.Item
                                label={<span className={AddBlogStyles.addblog_section_content_formWrapper_form_imgLabel}>ატვირთეთ ფოტო</span>}
                                name="image"
                                valuePropName="image"
                                wrapperCol={{ span: 23 }}
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: true, message: '' }
                                ]}
                            >
                                <Upload.Dragger
                                    name="image"
                                    listType="picture"
                                    accept=".png, .jpeg, .jpg"
                                    beforeUpload={() => {
                                        return false;
                                    }}
                                // multiple
                                >
                                    <Image
                                        preview={false}
                                        src={uploadIcon}
                                        alt="upload-icon"
                                    />
                                    <div>
                                        <span>ჩააგდეთ ფაილი აქ ან</span>
                                        <Button
                                            size="small"
                                            type="link"
                                            htmlType="button"
                                        >
                                            აირჩიეთ ფაილი
                                        </Button>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>

                            {/* group */}
                            <div className={AddBlogStyles.addblog_section_content_formWrapper_form_group}>
                                <Form.Item
                                    className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                    name="author"
                                    label="ავტორი"
                                    wrapperCol={{ span: 22 }}
                                    rules={[{ required: true }]}
                                    help={
                                        <ul>
                                            <li style={{ color: authorVal?.length >= 4 ? 'var(--color-success)' : validationColor.author }}>მინიმუმ 4 სიმბოლო</li>
                                            <li style={{ color: authorVal && isMinTwoWords(authorVal) ? 'var(--color-success)' : validationColor.author }}>მინიმუმ ორი სიტყვა</li>
                                            <li style={{ color: isGeorgian(authorVal) ? 'var(--color-success)' : validationColor.author }}>მხოლოდ ქართული სიმბოლოები</li>
                                        </ul>
                                    }
                                >
                                    <Input
                                        size="large"
                                        placeholder="შეიყვანეთ ავტორი..."
                                        onBlur={() => onBlurHandler('author')}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                    name="title"
                                    label="სათაური"
                                    wrapperCol={{ span: 22 }}
                                    rules={[{ required: true }]}
                                    help={<small style={{ color: titleVal?.length >= 4 ? 'var(--color-success)' : validationColor.title }}>მინიმუმ 4 სიმბოლო</small>}
                                >
                                    <Input
                                        size="large"
                                        placeholder="შეიყვანეთ სათაური..."
                                        onBlur={() => onBlurHandler('title')}
                                    />
                                </Form.Item>
                            </div>

                            {/* description */}
                            <Form.Item
                                name="description"
                                label="აღწერა"
                                wrapperCol={{ span: 23 }}
                                rules={[{ required: true }]}
                                help={<small style={{ color: descVal?.length >= 4 ? 'var(--color-success)' : validationColor.description }}>მინიმუმ 4 სიმბოლო</small>}
                            >
                                <Input.TextArea
                                    rows={3}
                                    size="large"
                                    style={{ resize: 'none' }}
                                    placeholder="შეიყვანეთ აღწერა..."
                                    onBlur={() => onBlurHandler('description')}
                                />
                            </Form.Item>

                            {/* group */}
                            <div className={AddBlogStyles.addblog_section_content_formWrapper_form_group}>
                                <Form.Item
                                    className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                    // hasFeedback
                                    name="publish_date"
                                    label="გამოქვეყნების თარიღი"
                                    rules={[
                                        { required: true, message: '' }
                                    ]}
                                    wrapperCol={{ span: 22 }}
                                >
                                    <DatePicker
                                        className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item_datepicker}
                                        size="large"
                                        placeholder="12/12/2023"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                    name="categories"
                                    label="კატეგორია"
                                    wrapperCol={{ span: 22 }}
                                    rules={[
                                        { required: true, message: '' }
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        size="large"
                                        mode="multiple"
                                        placeholder="აიჩიეთ კატეგორია"
                                        tagRender={tagRender}
                                        options={categories.data.map((opt) => ({
                                            label:
                                                <div style={{
                                                    color: opt.text_color,
                                                    backgroundColor: opt.background_color,
                                                    padding: 'var(--space-sm) var(--space-md)',
                                                    borderRadius: '30px',
                                                    width: 'fit-content',
                                                }}>
                                                    {opt.title}
                                                </div>,
                                            value: String(opt.id)
                                        }))}
                                    />
                                </Form.Item>
                            </div>

                            {/* email */}
                            <Form.Item
                                name="email"
                                label={<span className={AddBlogStyles.addblog_section_content_formWrapper_form_group_emailLabel}>ელ-ფოსტა</span>}
                                validateTrigger="onBlur"
                                wrapperCol={{ span: 11 }}
                                rules={[
                                    { required: true, message: '' },
                                    {
                                        validator: (_, value) => {
                                            if (value && !value.endsWith('@redberry.ge')) {
                                                return Promise.reject(
                                                    <>
                                                        <InfoCircleFilled style={{ marginRight: 8 }} />
                                                        <span style={{ fontSize: 'var(--font-size-sm)' }}>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</span>
                                                    </>);
                                            }
                                            return Promise.resolve();
                                        },
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Example@redberry.ge..."
                                />
                            </Form.Item>

                            <Form.Item
                                className={AddBlogStyles.addblog_section_content_formWrapper_form_itemButton}
                            // wrapperCol={{ span: 11 }}
                            >
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    disabled={!submittable}
                                    loading={addedBlogData.loading}
                                >
                                    გამოქვეყნება
                                </Button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div >
            <Modal
                open={openModal}
                onCancel={() => { setOpenModal(false) }}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Result
                    style={{ padding: 0 }}
                    status="success"
                    title={<h3>ჩანაწერი წარმატებით დაემატა</h3>}
                    extra={
                        <Link to={"/"}>
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="button"
                                onClick={() => setOpenModal(false)}
                            >
                                მთავარ გვერდზე დაბრუნება
                            </Button>
                        </Link>
                    }
                />
            </Modal>
        </section >
    )
}
