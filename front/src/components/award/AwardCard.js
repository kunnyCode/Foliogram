import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { DeleteButton, EditButton } from "../common/Button";
import { AwardContext, EditTableContext } from "../common/context/Context";

/** Award list component
 *
 * @param {boolean} setIsEditing - Change state whether editing or not
 * @returns AwardList and edit button or null
 */
function AwardCard({ setIsEditing }) {
  const isEditable = useContext(EditTableContext);
  //Each award
  const award = useContext(AwardContext);
  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{award.title}</span>
        <br />
        <span style={{ color: "gray" }}>{award.description}</span>
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton />
          </Col>
        </>
      )}
    </Row>
  );
}

export default AwardCard;
