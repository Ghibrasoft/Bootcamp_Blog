import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Carousel, CarouselProps, Image } from "antd";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { currentBlog } from "../../store/selectors/currentBlog";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { getCurrentBlog } from "../../store/reducers/current-blog/currentBlogSlice";
import { token } from "../../utils/constants/token";
import { formatDate } from "../../utils/helpers/date";

const { Meta } = Card;


const customNextArrow = <>next</>
const customPrevArrow = <>prev</>
export default function CurrentBlog() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const currentBlogData = useSelector(currentBlog);
    const { title, description, image, publish_date, categories, author, email } = currentBlogData.currentBlog;

    const settings: CarouselProps = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        draggable: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        dots: false,
        arrows: true,
        prevArrow: customPrevArrow,
        nextArrow: customNextArrow
    }

    useEffect(() => {
        const fetchCurrentBlog = () => {
            if (!id) return;
            dispatch(getCurrentBlog({ blogId: id, token }))
        }

        fetchCurrentBlog();
    }, []);


    return (
        <section className={CurrentBlogStyles.currentBlog_section}>
            {/* current blog */}
            <div className={CurrentBlogStyles.currentBlog_section_blog}>
                <Card
                    className={CurrentBlogStyles.currentBlog_section_blog_card}
                    key={id}
                    bordered={false}
                    cover={
                        <Image
                            className={CurrentBlogStyles.currentBlog_section_blog_card_image}
                            alt="blog-image"
                            src={image}
                            height={250}
                        />}
                >
                    <Meta
                        className={CurrentBlogStyles.currentBlog_section_blog_card_meta}
                        title={
                            <div className={CurrentBlogStyles.currentBlog_section_blog_card_meta_title}>
                                <p>
                                    {author}
                                </p>
                                <span>
                                    {formatDate(publish_date)} &bull; {email}
                                </span>
                            </div>
                        }
                    />
                    <div className={CurrentBlogStyles.currentBlog_section_blog_card_content}>
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
                        <p className={CurrentBlogStyles.currentBlog_section_blog_card_content_desc}>
                            {description}
                        </p>
                    </div>
                </Card>
            </div>

            {/* similar blogs */}
            <div className={CurrentBlogStyles.currentBlog_section_sliderContent}>
                <h1 className={CurrentBlogStyles.currentBlog_section_sliderContent_title}>მსგავსი სტატიები</h1>

                <Carousel
                    {...settings}
                    className={CurrentBlogStyles.currentBlog_section_sliderContent_carousel}
                >
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                </Carousel>
            </div>
        </section>
    )
}
