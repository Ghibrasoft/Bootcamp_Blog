import { Button, Image } from "antd";

import blogImg from "/blog.svg";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";

import HomeStyles from "./Home.module.scss";


export default function Home() {
    return (
        <section className={HomeStyles.home_section}>
            <div className={HomeStyles.home_section_top}>
                <h1>Blog</h1>
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
