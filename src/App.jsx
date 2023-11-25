import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import ItemDetail from "./components/ItemDetail";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#006EEB",
        },
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/attraction/:id" element={<ItemDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ConfigProvider>
  );
}

export default App;
