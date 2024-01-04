import { Card } from "antd";
import BlogCardStyles from "./BlogCard.module.scss";

const { Meta } = Card;


interface IBlogCardProps {

}
const BlogCard: React.FC<IBlogCardProps> = ({ }) => {
    return (
        <div className={BlogCardStyles.wrapper}>
            <Card>
                <Meta

                />
            </Card>
        </div>
    )
}

export default BlogCard