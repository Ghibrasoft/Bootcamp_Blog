import { DatePicker, Form, Image, Input, Tag } from "antd";
import AddBlogStyles from "./AddBlog.module.scss";
import {
    Button,
    Select,
    Upload,
} from 'antd';
import { addBlog } from "../../store/reducers/add-blog/addBlogSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { isMinTwoWords } from "../../utils/helpers/isMinTwoWords";
import { isGeorgian } from "../../utils/helpers/isGeorgian";
import uploadIcon from "/upload.svg";
import arrowLeft from "/arrowLeft.svg";
import { useEffect, useRef, useState } from "react";
import { InfoCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { getToken } from "../../utils/helpers/getToken";
import { fetchCategories } from "../../store/reducers/categories/categoriesSlice";
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';


const { Option } = Select;



const SELECT_OPTIONS = [
    'მარკეტი',
    'აპლიკაცია',
    'ხელოვნური ინტელექტი',
    'UI/UX',
    'კვლევა',
    'Figma'
]
export default function AddBlog() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const addBlogData = useSelector((state: RootState) => state.addBlog)
    const categories = useSelector((state: RootState) => state.categories.data);

    // select
    const tagRender = (props: CustomTagProps) => {
        const { label, value, closable, onClose } = props;
        const category = categories.find((cat) => cat.id === Number(value));

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
                    style={{ marginRight: 3, color: category.text_color }}
                >
                    {category.title}
                </Tag>
            );
        }

        return null;
    };
    useEffect(() => {
        const fetchCategoriesData = () => {
            dispatch(fetchCategories(''))
        }
        fetchCategoriesData()
    }, []);

    // image
    const getBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const binaryString = Array.from(new Uint8Array(arrayBuffer))
                    .map((byte) => String.fromCharCode(byte))
                    .join('');

                resolve(binaryString);
            };

            reader.onerror = (error) => reject(error);
        });
    };
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
    const [validationColor, setValidationColor] = useState({
        author: 'var(--color-neutral-7)',
        title: 'var(--color-neutral-7)',
        description: 'var(--color-neutral-7)'
    })
    const authorVal = Form.useWatch('author', form);
    const titleVal = Form.useWatch('title', form);
    const descVal = Form.useWatch('description', form);
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
    }
    const onFinish = async (values: any) => {
        // console.log(values);
        try {
            const token = await getToken();

            const imageFile = values.image[0].originFileObj;
            const imageBase64 = await getBase64(imageFile);
            const blogData = { ...values, image: imageBase64 };

            console.log(blogData);
            // dispatch(addBlog(formData));
            if (token) {
                dispatch(addBlog({ blogData, token }));
            } else {
                console.error("Token isn't available!")
            }
        } catch (error) {
            console.error("Error in onFinish:", error);
        }
    };

    return (
        <section className={AddBlogStyles.addblog_section}>
            <div
                className={AddBlogStyles.addblog_section_arrowLeft}
                onClick={() => history.back()}
            >
                <Image
                    className={AddBlogStyles.addblog_section_arrowLeft_image}
                    alt="arrow-left"
                    src={arrowLeft}
                    preview={false}
                />
            </div>
            <div className={AddBlogStyles.addblog_section_content}>
                <div className={AddBlogStyles.addblog_section_content_title}>
                    <h1>ბლოგის დამატება</h1>
                </div>

                <div className={AddBlogStyles.addblog_section_content_formWrapper}>
                    <Form
                        form={form}
                        className={AddBlogStyles.addblog_section_content_formWrapper_form}
                        name="add_blog"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {/* upload photo */}
                        <Form.Item label="ატვირთეთ ფოტო">
                            <Form.Item
                                name="image"
                                valuePropName="image"
                                wrapperCol={{ span: 23 }}
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: true, message: '' }
                                ]}
                            >
                                <Upload.Dragger
                                    multiple
                                    name="image"
                                    listType="picture"
                                    // accept=".png, .jpeg, .jpg"
                                    accept="image/*"
                                    beforeUpload={(file) => {
                                        // console.log(file);
                                        return false;
                                    }}
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
                                    size="large"
                                    mode="multiple"
                                    placeholder="აიჩიეთ კატეგორია"
                                    tagRender={tagRender}
                                    options={categories.map((cat) => ({ label: cat.title, value: String(cat.id) }))}
                                >
                                    {/* {categories.map(({ id, title, text_color, background_color }) => (
                                        <Option
                                            key={id}
                                            value={title}
                                        >
                                            {title}
                                        </Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </div>

                        {/* email */}
                        <Form.Item
                            name="email"
                            label="ელ-ფოსტა"
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
                                                    <span style={{ fontSize: '12px' }}>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</span>
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
                        >
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                disabled={!submittable}
                                loading={addBlogData.loading}
                            >
                                გამოქვეყნება
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    )
}
