import { Card, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import { IBlogCard } from "../../types/blogType";
import BlogCardStyles from "./BlogCard.module.scss";
import { ArrowUpOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/helpers/date";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";

const { Meta } = Card;


const BlogCard: React.FC<IBlogCard> = ({ type, width, blogData, blogDataArray = [] }) => {
    const { id } = useParams();
    const { author, categories, description, email, image, publish_date, title } = blogData || {};
    // category colors
    const filteredColors: Record<number, { color: string; bgColor: string }> = {};
    FILTER_LIST.forEach(item => {
        filteredColors[item.id] = {
            color: item.color,
            bgColor: item.bgColor,
        };
    });

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
                            <h1 style={{ fontSize: type === 'small' ? '1rem' : '' }}>{title}</h1>
                            <div className={BlogCardStyles.wrapper_card_content_categoryList}>
                                {categories?.map(({ id, title, text_color, background_color }) => {
                                    const filteredItem = filteredColors[id];
                                    return (
                                        <div
                                            className={BlogCardStyles.wrapper_card_content_categoryList_item}
                                            key={id}
                                            style={{
                                                color: filteredItem ? filteredItem.color : text_color,
                                                background: filteredItem ? filteredItem.bgColor : background_color,
                                            }}
                                        >
                                            {title}
                                        </div>
                                    )
                                })}
                            </div>
                            <p
                                className={BlogCardStyles.wrapper_card_content_desc}
                                data-short-desc={type === 'small' ? true : false}
                            >
                                {description}
                            </p>
                            {id && parseInt(id) !== blogData.id &&
                                <Link
                                    to={`/${blogData.id}`}
                                    className={BlogCardStyles.wrapper_card_content_link}
                                >
                                    სრულად ნახვა
                                    <ArrowUpOutlined rotate={45} />
                                </Link>
                            }
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
                                <div className={BlogCardStyles.wrapper_card_content_categoryList}>
                                    {categories?.map(({ id, title, text_color, background_color }) => {
                                        const filteredItem = filteredColors[id];
                                        return (
                                            <div
                                                className={BlogCardStyles.wrapper_card_content_categoryList_item}
                                                key={id}
                                                style={{
                                                    color: filteredItem ? filteredItem.color : text_color,
                                                    background: filteredItem ? filteredItem.bgColor : background_color,
                                                }}
                                            >
                                                {title}
                                            </div>
                                        )
                                    })}
                                </div>
                                <p
                                    className={BlogCardStyles.wrapper_card_content_desc}
                                    data-short-desc={type === 'small' ? true : false}
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