import { DatePicker, Form, Image, Input, Space } from "antd";
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
    const dispatch = useAppDispatch();


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
                                rules={[
                                    {
                                        required: true,
                                        message: 'შეავსეთ ველი',
                                    },
                                    {
                                        min: 4,
                                        message: 'მინიმუმ 4 სიმბოლო',

                                    },
                                    {
                                        validator: (_, value) => {
                                            if (value) {
                                                // if (value.length < 4) {
                                                //     return Promise.reject('მინიმუმ 4 სიმბოლო');
                                                // }
                                                if (!isMinTwoWords(value)) {
                                                    return Promise.reject('მინიმუმ ორი სიტყვა');
                                                }
                                                if (!isGeorgian(value)) {
                                                    return Promise.reject('მხოლოდ ქართული სიმბოლოები');
                                                }
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject('');
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter author..."
                                />
                            </Form.Item>

                            <Form.Item
                                className={AddBlogStyles.addblog_section_content_formWrapper_form_group_item}
                                name="title"
                                label="სათაური"
                                rules={[
                                    {
                                        required: true,
                                        min: 2,
                                        message: 'მინიმუმ 2 სიმბოლო'
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter title..."
                                />
                            </Form.Item>
                        </div>

                        {/* description */}
                        <Form.Item
                            name="description"
                            label="აღწერა"
                            rules={[
                                {
                                    required: true,
                                    message: ''
                                },
                                {
                                    min: 2,
                                    message: 'მინიმუმ 2 სიმბოლო'
                                }
                            ]}
                        >
                            <Input.TextArea
                                size="large"
                                placeholder="Enter description..."
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
                            rules={[{}]}
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
