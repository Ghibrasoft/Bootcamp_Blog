import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { blogs } from "../../store/selectors/blogs";
import { token } from "../../utils/constants/token";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { Button, Carousel, CarouselProps, Empty, Spin } from "antd";
import { currentBlog, selectSimilarBlogs } from "../../store/selectors/currentBlog";
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
    const similarBlogs = useSelector((state: RootState) => selectSimilarBlogs(state))

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
    const renderSimilarBlogsCarousel = () => {
        if (similarBlogs.length > 1) {
            return (
                <>
                    <h1 className={CurrentBlogStyles.currentBlog_section_sliderContent_title}>
                        მსგავსი სტატიები
                    </h1>
                    <Carousel
                        {...settings}
                        className={CurrentBlogStyles.currentBlog_section_sliderContent_carousel}
                    >
                        {similarBlogs
                            .filter((blog) => id && parseInt(id) !== blog.id)
                            .map((data) => (
                                <BlogCard
                                    type="small"
                                    key={data.id}
                                    blogData={data}
                                    width={'400px'}
                                />
                            ))}
                    </Carousel>
                </>
            );
        } else {
            return <Empty description={<span>მსგავსი სტატიები არ მოიძებნა</span>} />;
        }
    };

    useEffect(() => {
        const fetchCurrentBlog = () => {
            if (!id) return;
            dispatch(getCurrentBlog({ blogId: id, token }))
            dispatch(getBlogs(token));
        }

        fetchCurrentBlog();
    }, [id]);

    // console.log('Current Blog re-render');
    return (
        <section className={CurrentBlogStyles.currentBlog_section}>
            <Spin spinning={currentBlogData.loading}>
                {/* current blog */}
                <div className={CurrentBlogStyles.currentBlog_section_blog}>
                    <BlogCard
                        type="large"
                        width={'700px'}
                        blogData={currentBlogData.currentBlog}

                    />
                </div>
            </Spin>

            {/* similar blogs */}
            <Spin spinning={blogsData.loading}>
                <div className={CurrentBlogStyles.currentBlog_section_sliderContent}>
                    {renderSimilarBlogsCarousel()}
                </div>
            </Spin>
        </section>
    )
}
