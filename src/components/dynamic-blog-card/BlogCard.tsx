import { Card, Image } from "antd";
import BlogCardStyles from "./BlogCard.module.scss";
import { formatDate } from "../../utils/helpers/date";
import { IBlogCard } from "../../types/blogType";
import { Link } from "react-router-dom";
import { ArrowUpOutlined } from "@ant-design/icons";

const { Meta } = Card;


const BlogCard: React.FC<IBlogCard> = ({ blogData, blogDataArray = [], width }) => {
    const { author, categories, description, email, image, publish_date, title } = blogData || {};

    return (
        <>
            {blogData ? // if single
                <div className={BlogCardStyles.wrapper}>
                    <Card
                        className={BlogCardStyles.wrapper_card}
                        style={{
                            width: `${width}`
                        }}
                        bordered={false}
                        cover={
                            <Image
                                className={BlogCardStyles.wrapper_card_image}
                                alt="blog-image"
                                src={image}
                                height={250}
                            />}
                    >
                        <Meta
                            className={BlogCardStyles.wrapper_card_meta}
                            title={
                                <div className={BlogCardStyles.wrapper_card_meta_title}>
                                    <p>
                                        {author}
                                    </p>
                                    <span>
                                        {formatDate(publish_date ? publish_date : '')} &bull; {email}
                                    </span>
                                </div>
                            }
                        />
                        <div className={BlogCardStyles.wrapper_card_content}>
                            <h1>{title}</h1>
                            <ul className="category-list">
                                {categories?.map(({ id, title, text_color, background_color }) => (
                                    <li key={id}>
                                        <div style={{ background: background_color, color: text_color }}>
                                            {title}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p className={BlogCardStyles.wrapper_card_content_desc}>
                                {description}
                            </p>
                        </div>
                    </Card>
                </div>
                :
                // if array
                blogDataArray.map(({ id, author, categories, description, image, publish_date, title }) => (
                    <div className={BlogCardStyles.wrapper} key={id}>
                        <Card
                            className={BlogCardStyles.wrapper_card}
                            style={{
                                width: `${width}`
                            }}
                            bordered={false}
                            cover={
                                <Image
                                    className={BlogCardStyles.wrapper_card_image}
                                    alt="blog-image"
                                    src={image}
                                    height={250}
                                />}
                        >
                            <Meta
                                className={BlogCardStyles.wrapper_card_meta}
                                title={
                                    <div className={BlogCardStyles.wrapper_card_meta_title}>
                                        <p>
                                            {author}
                                        </p>
                                        <span>
                                            {formatDate(publish_date)}
                                        </span>
                                    </div>
                                }
                            />
                            <div className={BlogCardStyles.wrapper_card_content}>
                                <h1>{title}</h1>
                                <ul className="category-list">
                                    {categories.map(({ id, title, text_color, background_color }) => (
                                        <li key={id}>
                                            <div style={{ background: background_color, color: text_color }}>
                                                {title}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p
                                    className={BlogCardStyles.wrapper_card_content_desc}
                                    data-short-desc={true}
                                >
                                    {description}
                                </p>
                                <Link
                                    to={`/${id}`}
                                    className={BlogCardStyles.wrapper_card_content_link}
                                >
                                    სრულად ნახვა
                                    <ArrowUpOutlined rotate={45} />
                                </Link>
                            </div>
                        </Card>
                    </div>
                ))
            }
        </>
    )
}

export default BlogCard