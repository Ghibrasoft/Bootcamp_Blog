import { useParams } from "react-router-dom";
import CurrentBlogStyles from "./CurrentBlog.module.scss";
import { Carousel, CarouselProps } from "antd";

const customNextArrow = <>next</>
const customPrevArrow = <>prev</>
export default function CurrentBlog() {
    const { id } = useParams();

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
    return (
        <section className={CurrentBlogStyles.currentBlog_section}>
            <div className={CurrentBlogStyles.currentBlog_section_blog}>
                CurrentBlog {id}
            </div>

            <div className={CurrentBlogStyles.currentBlog_section_slider}>
                Carousel
                <Carousel
                    {...settings}
                    className={CurrentBlogStyles.currentBlog_section_slider_carousel}
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
