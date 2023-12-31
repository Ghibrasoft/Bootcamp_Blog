import { Button, Image } from "antd";

import blogImg from "/blog.svg";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";

import HomeStyles from "./Home.module.scss";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogData } from "../../store/reducers/blogs/blogsSlice";
import axios from "axios";


export default function Home() {
    const dispatch = useAppDispatch();
    const blogsData = useSelector((state: RootState) => state.blogs);


    useEffect(() => {
        const getToken = async () => {
            try {
                const res = await axios.get('https://api.blog.redberryinternship.ge/api/token');
                const token = res.data.token;
                dispatch(fetchBlogData(token));
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        getToken();
    }, [dispatch]);

    // console.log(blogsData.data);

    return (
        <section className={HomeStyles.home_section}>
            <div className={HomeStyles.home_section_top}>
                <h1>ბლოგი</h1>
                <Image
                    className={HomeStyles.home_section_top_image}
                    alt="blog-img"
                    src={blogImg}
                    preview={false}
                />
            </div>

            <div className={HomeStyles.home_section_filterList}>
                <ul>
                    {FILTER_LIST.map(({ title, color, bgColor }, index) => (
                        <li key={index}>
                            <Button
                                size="middle"
                                shape="round"
                                type="primary"
                                htmlType="button"
                                style={{ background: bgColor, color: color }}
                            >
                                {title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={HomeStyles.home_section_content}>content</div>
        </section>
    )
}
