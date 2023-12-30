import { DatePicker, Form, Image, Input } from "antd";
import AddBlogStyles from "./AddBlog.module.scss";
import {
    Button,
    Select,
    Upload,
} from 'antd';
import { addBlog } from "../../store/reducers/add-blog/addBlogSlice";
import { useAppDispatch } from "../../store/store";
import { isMinTwoWords } from "../../utils/helpers/isMinTwoWords";
import { isGeorgian } from "../../utils/helpers/isGeorgian";
import uploadIcon from "/upload.svg";
import arrowLeft from "/arrowLeft.svg";
import { useState } from "react";

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
                if (authorVal?.length < 4 || authorVal && isMinTwoWords(authorVal) || isGeorgian(authorVal)) {
                    setValidationColor(prev => ({ ...prev, author: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, author: 'var(--color-neutral-7)' }))
                }
                break;
            case 'title':
                if (titleVal?.length < 4) {
                    setValidationColor(prev => ({ ...prev, title: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, title: 'var(--color-neutral-7)' }))
                }
                break;
            case 'description':
                if (descVal?.length < 4) {
                    setValidationColor(prev => ({ ...prev, description: 'var(--color-error)' }))
                } else {
                    setValidationColor(prev => ({ ...prev, description: 'var(--color-neutral-7)' }))
                }
                break;
            default:
                break;
        }
    }

    const getBase64 = (file: File) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
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

    const onFinish = async (values: any) => {
        // console.log(values);
        try {
            const imageFile = values.image[0].originFileObj;
            const imageBase64 = await getBase64(imageFile);
            const formData = { ...values, image: imageBase64 };

            dispatch(addBlog(formData));
        } catch (error) {

        }
    };

    return (
        <section className={AddBlogStyles.addblog_section}>
            <div className={AddBlogStyles.addblog_section_arrowLeft}>
                <Image
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
                    // {...formItemLayout}
                    >
                        {/* upload photo */}
                        <Form.Item label="ატვირთეთ ფოტო">
                            <Form.Item
                                name="image"
                                valuePropName="image"
                                getValueFromEvent={normFile}
                            // noStyle
                            // rules={[{}]}
                            >
                                <Upload.Dragger
                                    multiple
                                    name="image"
                                    listType="picture"
                                    accept=".png, .jpeg, .jpg"
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
                                rules={[{ required: true }]}
                                help={
                                    <ul>
                                        <li style={{ color: authorVal?.length > 4 ? 'var(--color-success)' : validationColor.author }}>მინიმუმ 4 სიმბოლო</li>
                                        <li style={{ color: authorVal && isMinTwoWords(authorVal) ? 'var(--color-success)' : validationColor.author }}>მინიმუმ ორი სიტყვა</li>
                                        <li style={{ color: isGeorgian(authorVal) ? 'var(--color-success)' : validationColor.author }}>მხოლოდ ქართული სიმბოლოები</li>
                                    </ul>
                                }
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter author..."
                                    onBlur={() => onBlurHandler('author')}
                                />
                            </Form.Item>

                            <Form.Item
                                className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                name="title"
                                label="სათაური"
                                rules={[{ required: true }]}
                                help={<span style={{ color: titleVal?.length >= 4 ? 'var(--color-success)' : validationColor.title }}>მინიმუმ 4 სიმბოლო</span>}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter title..."
                                    onBlur={() => onBlurHandler('title')}
                                />
                            </Form.Item>
                        </div>

                        {/* description */}
                        <Form.Item
                            name="description"
                            label="აღწერა"
                            rules={[{ required: true }]}
                            help={<span style={{ color: descVal?.length >= 4 ? 'var(--color-success)' : validationColor.description }}>მინიმუმ 4 სიმბოლო</span>}
                        >
                            <Input.TextArea
                                size="large"
                                placeholder="Enter description..."
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
                                // rules={[{ required: true, message: 'Please select date!' }]}
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <DatePicker
                                    className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item_datepicker}
                                    size="large"
                                    placeholder="Pick date..."
                                />
                            </Form.Item>

                            <Form.Item
                                className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                name="categories"
                                label="კატეგორია"
                                // rules={[{ required: true, message: 'Please select categories!', type: 'array' }]}
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <Select
                                    size="large"
                                    mode="multiple"
                                    placeholder="Select categories"
                                >
                                    {SELECT_OPTIONS.map((option, index) => (
                                        <Option
                                            key={index}
                                            value={option}
                                        >
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        {/* email */}
                        <Form.Item
                            name="email"
                            label="ელ-ფოსტა"
                        >
                            <Input
                                size="large"
                                placeholder="Enter email..."
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                disabled={false}
                                htmlType="submit"
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
