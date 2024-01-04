import blogImg from "/blog.svg";
import { useEffect, useState } from "react";
import { Button, Image } from "antd";
import { useSelector } from "react-redux";
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
    const filteredBlogs = blogsData.data.filter((blog) =>
        blog.categories.some((category) =>
            checkedTitles.some(
                (categoryTitle) => categoryTitle === category.title
            )
        )
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
                <ul className="category-list">
                    {FILTER_LIST.map(({ title, color, bgColor }, index) => (
                        <li key={index}>
                            <Button
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
                        </li>
                    ))}
                </ul>
            </div>

            <div className={HomeStyles.home_section_bottom}>
                <BlogCard
                    type="small"
                    width={'400px'}
                    blogDataArray={filteredBlogs.length === 0 ? blogsData.data : filteredBlogs}
                />
            </div>
        </section>
    )
}
