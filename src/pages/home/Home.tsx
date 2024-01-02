import blogImg from "/blog.svg";
import { Button, Image } from "antd";
import HomeStyles from "./Home.module.scss";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";



export default function Home() {
    const dispatch = useAppDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.data);

    console.log(blogs);

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

            <div>
                {blogs.map((item: any) => (
                    <div>{item.title}</div>
                ))}
            </div>
        </section>
    )
}
