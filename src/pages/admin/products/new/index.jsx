import { useSelector } from "react-redux";
import { NewProductForm, InfoBox } from "@/components";

const NewProduct = () => {
  const authen = useSelector((state) => state.authentication);
  if (!authen.user?.isAdmin)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;
  return <NewProductForm />;
};

export default NewProduct;
