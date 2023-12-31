import { Button, Image } from "antd";

import blogImg from "/blog.svg";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";

import HomeStyles from "./Home.module.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";


export default function Home() {
    const blogsData = useSelector((state: RootState) => state.blogs);



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
