import blogImg from "/blog.svg";
import { Button, Image } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HomeStyles from "./Home.module.scss";
import { useAppDispatch } from "../../store/store";
import { token } from "../../utils/constants/token";
import { blogs } from "../../store/selectors/blogs";
import { getBlogs } from "../../store/reducers/blogs/blogsSlice";
import BlogCard from "../../components/dynamic-blog-card/BlogCard";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";



export default function Home() {
    const dispatch = useAppDispatch();
    const blogsData = useSelector(blogs);
    const [checkedTitles, setCheckedTitles] = useState<string[]>([]);
    const currentDate = new Date();
    const filteredBlogs = blogsData.data.filter((blog) =>
        blog.categories.some((category) =>
            checkedTitles.some(
                (categoryTitle) => categoryTitle === category.title
            )
        ) &&
        new Date(blog.publish_date) <= currentDate
    );

    const handleFilterClick = (title: string) => {
        setCheckedTitles(prevTitles => {
            if (prevTitles.includes(title)) {
                return prevTitles.filter(existingTitle => existingTitle !== title)
            } else {
                return [...prevTitles, title];
            }
        })
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            dispatch(getBlogs(token))
        }
        fetchBlogs();
    }, []);

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
                {FILTER_LIST.map(({ title, color, bgColor }, index) => (
                    <Button
                        key={index}
                        size="large"
                        shape="round"
                        type="primary"
                        htmlType="button"
                        style={{
                            color: color,
                            background: bgColor,
                            border: checkedTitles.includes(title) ? '1px solid var(--color-neutral-13)' : ''
                        }}
                        onClick={() => handleFilterClick(title)}
                    >
                        {title}
                    </Button>
                ))}
            </div>

            <div className={HomeStyles.home_section_bottom}>
                <BlogCard
                    type="small"
                    width={'400px'}
                    blogDataArray={
                        filteredBlogs.length === 0 ?
                            blogsData.data.filter((blog) => new Date(blog.publish_date) <= currentDate)
                            :
                            filteredBlogs
                    }
                />
            </div>
        </section>
    )
}
