// blog
interface ICategories {
  id: number;
  name: string;
  text_color: string;
  background_color: string;
}

export interface IBlogProps {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: ICategories[];
  author: string;
}
export interface IFormDataProps {
  title: string;
  description: string;
  image: any;
  publish_date: string;
  categories: string[];
  author: string;
  email: string;
}
export interface IErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}
