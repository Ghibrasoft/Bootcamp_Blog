import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { blogs } from "../../store/selectors/blogs";
import { token } from "../../utils/constants/token";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { Button, Carousel, CarouselProps, Empty } from "antd";
import { currentBlog } from "../../store/selectors/currentBlog";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getBlogs } from "../../store/reducers/blogs/blogsSlice";
import { useWindowWidth } from "../../utils/hooks/useWindowWidth";
import BlogCard from "../../components/dynamic-blog-card/BlogCard";
import { getCurrentBlog } from "../../store/reducers/current-blog/currentBlogSlice";



export default function CurrentBlog() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const windowWidth = useWindowWidth();
    const SLIDES_TO_SHOW = windowWidth <= 900 ? 1 : windowWidth <= 1280 ? 2 : 3
    const blogsData = useSelector(blogs);
    const currentBlogData = useSelector(currentBlog);
    const similarBlogs = blogsData.data.filter((blog) =>
        blog.categories.some((category) =>
            currentBlogData.currentBlog.categories.some(
                (currentCategory) => currentCategory.id === category.id
            )
        )
    );

    const CustomPrevArrow: React.FC<any> = (props) => {
        return (
            <Button
                className={CurrentBlogStyles.currentBlog_section_sliderContent_arrow}
                style={{
                    position: 'absolute',
                    top: '-45px',
                    right: '100px',
                }}
                size="large"
                type="primary"
                shape="circle"
                onClick={props.onClick}
                icon={<LeftOutlined />}
                disabled={props.currentSlide === 0}
            />
        );
    };
    const CustomNextArrow: React.FC<any> = (props) => {
        return (
            <Button
                className={CurrentBlogStyles.currentBlog_section_sliderContent_arrow}
                style={{
                    position: 'absolute',
                    top: '-45px',
                    right: '45px',
                }}
                size="large"
                type="primary"
                shape="circle"
                onClick={props.onClick}
                icon={<RightOutlined />}
                disabled={props.currentSlide === props.slideCount - SLIDES_TO_SHOW}
            />
        );
    };
    const settings: CarouselProps = {
        speed: 500,
        dots: false,
        arrows: true,
        autoplay: true,
        infinite: false,
        draggable: true,
        slidesToShow: SLIDES_TO_SHOW,
        slidesToScroll: 1,
        cssEase: "linear",
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    }

    useEffect(() => {
        const fetchCurrentBlog = () => {
            if (!id) return;
            dispatch(getCurrentBlog({ blogId: id, token }))
            dispatch(getBlogs(token));
        }

        fetchCurrentBlog();
    }, [id]);

    return (
        <section className={CurrentBlogStyles.currentBlog_section}>
            {/* current blog */}
            <div className={CurrentBlogStyles.currentBlog_section_blog}>
                <BlogCard
                    type="large"
                    width={'700px'}
                    blogData={currentBlogData.currentBlog}

                />
            </div>

            {/* similar blogs */}
            <div className={CurrentBlogStyles.currentBlog_section_sliderContent}>

                {similarBlogs.length > 1 ?
                    <>
                        <h1 className={CurrentBlogStyles.currentBlog_section_sliderContent_title}>მსგავსი სტატიები</h1>
                        <Carousel
                            {...settings}
                            className={CurrentBlogStyles.currentBlog_section_sliderContent_carousel}
                        >
                            {similarBlogs.map((data) => (
                                <BlogCard
                                    type="small"
                                    key={data.id}
                                    blogData={data}
                                    width={'400px'}
                                />
                            ))}
                        </Carousel>
                    </>
                    :
                    <Empty description={<span>მსგავსი სტატიები არ მოიძებნა</span>} />
                }
            </div>
        </section>
    )
}
