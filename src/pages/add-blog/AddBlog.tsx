import { DatePicker, Form, Input, Space } from "antd";
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
            <div className={AddBlogStyles.addblog_section_content}>
                <div className={AddBlogStyles.addblog_section_content_title}>
                    <h1>Add Blog</h1>
                </div>

                <div className={AddBlogStyles.addblog_section_content_formWrapper}>
                    <Form
                        className={AddBlogStyles.addblog_section_content_formWrapper_form}
                        name="add_blog"
                        layout="vertical"
                        // {...formItemLayout}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Upload photo">
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
                                    <div className="">
                                        <span>Drag and drop file here or</span>
                                        <Button
                                            size="small"
                                            type="link"
                                            htmlType="button"
                                        >
                                            Choose file
                                        </Button>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <Space>
                            <Form.Item
                                name="author"
                                label="Author"
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
                                <Input placeholder="Enter author..." />
                            </Form.Item>

                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        min: 2,
                                        message: 'მინიმუმ 2 სიმბოლო'
                                    }
                                ]}
                            >
                                <Input placeholder="Enter title..." />
                            </Form.Item>
                        </Space>

                        <Form.Item
                            name="description"
                            label="Description"
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
                            <Input.TextArea placeholder="Enter description..." />
                        </Form.Item>

                        <Space>
                            <Form.Item
                                hasFeedback
                                name="publish_date"
                                label="Select date"
                            // rules={[{ required: true, message: 'Please select date!' }]}
                            >
                                <DatePicker placeholder="Pick date..." />
                            </Form.Item>

                            <Form.Item
                                name="categories"
                                label="Categories"
                            // rules={[{ required: true, message: 'Please select categories!', type: 'array' }]}
                            >
                                <Select
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
                        </Space>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{}]}
                        >
                            <Input placeholder="Enter email..." />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    )
}
