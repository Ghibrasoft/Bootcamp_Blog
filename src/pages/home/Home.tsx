import blogImg from "/blog.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Image } from "antd";
import HomeStyles from "./Home.module.scss";
import { useAppDispatch } from "../../store/store";
import { token } from "../../utils/constants/token";
import { blogs } from "../../store/selectors/blogs";
import { formatDate } from "../../utils/helpers/date";
import { fetchBlogData } from "../../store/reducers/blogs/blogsSlice";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";
import { ArrowUpOutlined } from "@ant-design/icons";

const { Meta } = Card;


export default function Home() {
    const dispatch = useAppDispatch();
    const blogsData = useSelector(blogs);


    useEffect(() => {
        const fetchBlogs = async () => {
            dispatch(fetchBlogData(token))
        }
        fetchBlogs();
    }, [])

    // console.log(blogsData);
    return (
        <section className={HomeStyles.home_section}>
            <div className={HomeStyles.home_section_top}>
                <h1>ბლოგი</h1>
                <Image
                    className={HomeStyles.home_section_top_image}
                    src={blogImg}
                    alt="blog-img"
                    preview={false}
                    draggable={false}
                />
            </div>

            <div className={HomeStyles.home_section_filterList}>
                <ul className="category-list">
                    {FILTER_LIST.map(({ title, color, bgColor }, index) => (
                        <li key={index}>
                            <Button
                                size="large"
                                shape="round"
                                type="primary"
                                htmlType="button"
                                style={{ background: bgColor, color: color }}
                            >
                                {title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={HomeStyles.home_section_bottom}>
                {blogsData.data.map(({ id, title, description, author, categories, publish_date, image }) => (
                    <Card
                        className={HomeStyles.home_section_bottom_card}
                        key={id}
                        bordered={false}
                        cover={
                            <Image
                                className={HomeStyles.home_section_bottom_card_image}
                                alt="blog-image"
                                src={image}
                                height={250}
                            />}
                    >
                        <Meta
                            className={HomeStyles.home_section_bottom_card_meta}
                            title={
                                <div className={HomeStyles.home_section_bottom_card_meta_title}>
                                    <p >
                                        {author}
                                    </p>
                                    <span>
                                        {formatDate(publish_date)}
                                    </span>
                                </div>
                            }
                        />
                        <div className={HomeStyles.home_section_bottom_card_content}>
                            <h1>{title}</h1>
                            <div>
                                <ul className="category-list">
                                    {categories.map(({ id, title, text_color, background_color }) => (
                                        <li key={id}>
                                            <Button
                                                size="small"
                                                shape="round"
                                                type="primary"
                                                htmlType="button"
                                                style={{ background: background_color, color: text_color }}
                                            >
                                                {title}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className={HomeStyles.home_section_bottom_card_content_desc}>
                                {description}
                            </p>
                            <Link
                                to={`/${id}`}
                                className={HomeStyles.home_section_bottom_card_content_link}
                            >
                                სრულად ნახვა
                                <ArrowUpOutlined rotate={45} />
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
