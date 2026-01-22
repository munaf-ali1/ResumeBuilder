import { useSelector } from "react-redux";

const ResumePreview = () => {
  const resume = useSelector((state) => state.resume);

  return <h2>{resume.personalInfo.name}</h2>;
};

export default ResumePreview;
