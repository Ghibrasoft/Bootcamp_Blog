import blogImg from "/blog.svg";
import { useSelector } from "react-redux";
import { Button, Image, Spin } from "antd";
import { useEffect, useState } from "react";
import HomeStyles from "./Home.module.scss";
import { token } from "../../utils/constants/token";
import { RootState, useAppDispatch } from "../../store/store";
import { getBlogs } from "../../store/reducers/blogs/blogsSlice";
import BlogCard from "../../components/dynamic-blog-card/BlogCard";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";
import { blogs, selectFilteredBlogsByCategory, selectFilteredBlogsByDate } from "../../store/selectors/blogs";



export default function Home() {
    const dispatch = useAppDispatch();
    const blogsData = useSelector(blogs);
    const [checkedTitles, setCheckedTitles] = useState<string[]>([]);
    const blogsFilteredByDate = useSelector((state: RootState) =>
        selectFilteredBlogsByDate(state));
    const blogsFilteredByCategory = useSelector((state: RootState) =>
        selectFilteredBlogsByCategory(state, checkedTitles)
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
        const fetchBlogs = () => {
            dispatch(getBlogs(token));
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

            <Spin spinning={blogsData.loading}>
                <div className={HomeStyles.home_section_bottom}>
                    <BlogCard
                        type="small"
                        width={'400px'}
                        blogDataArray={
                            blogsFilteredByCategory.length === 0 ?
                                blogsFilteredByDate
                                :
                                blogsFilteredByCategory
                        }
                    />
                </div>
            </Spin>
        </section>
    )
}
