import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Carousel, CarouselProps } from "antd";
import { useAppDispatch } from "../../store/store";
import { token } from "../../utils/constants/token";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { currentBlog } from "../../store/selectors/currentBlog";
import BlogCard from "../../components/dynamic-blog-card/BlogCard";
import { getCurrentBlog } from "../../store/reducers/current-blog/currentBlogSlice";


const customNextArrow = <>next</>
const customPrevArrow = <>prev</>
export default function CurrentBlog() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const currentBlogData = useSelector(currentBlog);

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
                <BlogCard
                    blogData={currentBlogData.currentBlog}
                    width={'700px'}
                />
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
