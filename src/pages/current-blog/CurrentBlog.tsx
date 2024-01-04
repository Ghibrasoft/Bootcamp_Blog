import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Carousel, CarouselProps, Empty } from "antd";
import { useAppDispatch } from "../../store/store";
import { token } from "../../utils/constants/token";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { currentBlog } from "../../store/selectors/currentBlog";
import BlogCard from "../../components/dynamic-blog-card/BlogCard";
import { getCurrentBlog } from "../../store/reducers/current-blog/currentBlogSlice";
import { getBlogs } from "../../store/reducers/blogs/blogsSlice";
import { blogs } from "../../store/selectors/blogs";


const customNextArrow = <>next</>
const customPrevArrow = <>prev</>
export default function CurrentBlog() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const blogsData = useSelector(blogs);
    const currentBlogData = useSelector(currentBlog);
    const similarBlogs = blogsData.data.filter((blog) =>
        blog.categories.some((category) =>
            currentBlogData.currentBlog.categories.some(
                (currentCategory) => currentCategory.id === category.id
            )
        )
    );

    const settings: CarouselProps = {
        speed: 500,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        draggable: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true,
        prevArrow: customPrevArrow,
        nextArrow: customNextArrow,
    }

    useEffect(() => {
        const fetchCurrentBlog = () => {
            if (!id) return;
            dispatch(getCurrentBlog({ blogId: id, token }))
            dispatch(getBlogs(token));
        }

        fetchCurrentBlog();
    }, []);

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
