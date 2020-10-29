import { useParams } from "react-router-dom";
import { IndustryGraphPage } from "./IndustryGraphPage";

export const IndustryTabs = () => {
  let { industry } = useParams();
  return (
    <div>
      <IndustryGraphPage industry={industry}  />
    </div>
  );
};
