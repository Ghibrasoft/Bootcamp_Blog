import { Layout } from "antd"
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import LayoutStyles from "./layout/Layout.module.scss";
import Home from "./pages/home/Home";
import AddBlog from "./pages/add-blog/AddBlog";

const { Header, Content } = Layout;


function App() {

  return (
    <Layout className={LayoutStyles.layout}>
      <Header className={LayoutStyles.layout_header}>
        <NavBar />
      </Header>

      <Layout className={LayoutStyles.layout_container}>
        <Content className={LayoutStyles.layout_container_content}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/addblog"} element={<AddBlog />} />

          </Routes>
        </Content>
      </Layout>

    </Layout>
  )
}

export default App
