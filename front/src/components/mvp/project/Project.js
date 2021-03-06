import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

/** 편집 상태에 따라 편집 화면을 보여줄지 프로젝트 내용을 보여줄지 판단하는 컴포넌트 입니다.
 *
 * @returns ProjectEditForm or ProjectCard
 */
function Project({ project, setProjectList }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          project={project}
          setProjectList={setProjectList}
        />
      ) : (
        <ProjectCard
          setIsEditing={setIsEditing}
          project={project}
          setProjectList={setProjectList}
        />
      )}
    </div>
  );
}

export default Project;
