import React, { useState } from 'react';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import axios from 'axios';

function ProfileImage({ user, setUser, setProfileImage }) {
    const onUploadImage = async (e) => {
        e.preventDefault();
        // e: input, type=file인 DOM 객체
        console.log(e.target.File.files[0]);
        if (e.target.File.files) {
            // 업로드된 파일이 존재한다면
            const image = e.target.File.files[0];
            const datas = new FormData();
            console.log(datas);
            datas.append('image', image, image.name);
            console.log(datas.get('image'));
            console.log('프로필', user);
            try {
                const result = await axios({
                    method: 'post',
                    url:
                        'http://' +
                        window.location.hostname +
                        ':' +
                        '5001' +
                        '/user/profileImage', // post 통신을 위한 api 주소
                    data: datas,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(result.data);
                const imageLink = result.data.imageLink;
                console.log(imageLink);
                const res = await Api.put(`users/${user.id}`, {
                    ...user,
                    profileImage: imageLink,
                });
                console.log(res);
                setProfileImage(false);
                setUser(res.data);
            } catch (err) {
                alert('프로필 사진 업로드 실패');
            }
        }
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Form onSubmit={onUploadImage}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" name="File" multiple />
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3 text-center">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="me-3"
                            >
                                확인
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setProfileImage(false)}
                            >
                                취소
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProfileImage;
