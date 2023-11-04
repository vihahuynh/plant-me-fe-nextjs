import { useSelector } from "react-redux";
import { UpdateProductForm, InfoBox } from "@/components";

const UpdateProduct = () => {
  const authen = useSelector((state) => state.authentication);
  if (!authen.user?.isAdmin)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;
  return <UpdateProductForm />;
};

export default UpdateProduct;
