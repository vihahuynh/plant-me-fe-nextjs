import { useSelector } from "react-redux";
import { ProductTable, InfoBox } from "@/components";

const AdminProducts = () => {
  const authen = useSelector((state) => state.authentication);
  if (!authen.user?.isAdmin)
    <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  return <ProductTable />;
};

export default AdminProducts;
