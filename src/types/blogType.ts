// blog categories
export interface ICategories {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

// fetch blog by id
export interface IBlogProps {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: ICategories[];
  author: string;
}

// blog post
export interface IFormDataProps {
  title: string;
  description: string;
  image: any;
  publish_date: string;
  categories: string[];
  author: string;
  email: string;
}

// error response
export interface IErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}
