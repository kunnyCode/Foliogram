import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DeleteButton, EditButton } from "../../common/Button";
import { OwnerContext } from "../../common/context/Context";
import CertificateEditForm from "./CertificateEditForm";

/**
 * This component is show editing screen or certificate info depending on the isEditing state
 * @param {Object} props
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @returns {component} Certificate information or EditForm
 */
function Certificate({ certificate, setCertificateList }) {
  const { isEditable } = useContext(OwnerContext);
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, description, when_date } = certificate;

  /**
   * @description isEditing {type: boolean} if true show CertificateEditForm
   * @description isEditable {type: boolean} if isEditable true and isEditing false show EditButton
   */
  return (
    <Row className="align-items-center">
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setCertificateList={setCertificateList}
          setIsEdit={setIsEditing}
        />
      ) : (
        <Col>
          <span>{title}</span>
          <br />
          <span style={{ color: "gray" }}>{description}</span>
          <br />
          <span style={{ color: "gray" }}>{when_date}</span>
        </Col>
      )}
      {isEditable && !isEditing && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton
              endpoint={"certificates"}
              id={id}
              setState={setCertificateList}
              index={certificate.index}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default Certificate;
