import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import notFoundIllustration from "../assets/not_found_illustration.svg";

/// Not found page, used for 404 errors
function NotFound() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div className="flex flex-col justify-center items-center mt-32 w-full">
      <img className="w-4/12" src={notFoundIllustration} />
      <h1 className="text-xl mt-4">404 - Not found</h1>
      <Button type="primary" onClick={goHome} className="mt-4 w-min bg-tmBlue">
        Go home
      </Button>
    </div>
  );
}

export default NotFound;
