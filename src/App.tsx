import { Layout } from "antd"
// import { useEffect } from "react";
import Home from "./pages/home/Home";
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
import AddBlog from "./pages/add-blog/AddBlog";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import LayoutStyles from "./layout/Layout.module.scss";
import CurrentBlog from "./pages/current-blog/CurrentBlog";

const { Header, Content } = Layout;


function App() {
  // const navigate = useNavigate();
  // const userData = useSelector((state: RootState) => state.login);

  // useEffect(() => {
  //   if (!userData.isLogged) {
  //     navigate("/");
  //   }
  // }, [userData.isLogged]);

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

            <Route path={"/:id"} element={<CurrentBlog />} />
          </Routes>
        </Content>
      </Layout>

    </Layout>
  )
}

export default App
