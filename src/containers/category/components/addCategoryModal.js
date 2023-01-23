import React from 'react';
import { Col, Row } from 'react-bootstrap'
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';


const AddCategoryModal = (props) => {
    const { show, handleClose, modaltitle, setcategoryName, categoryName, parentCategoryId, setparentCategoryId, categoryList, handleCategoryImage, onSubmit } = props;
    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setcategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className='form-control form-control-sm' value={parentCategoryId} onChange={(e) => setparentCategoryId(e.target.value)}>
                        <option>
                            Select Category
                        </option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
        </NewModal>
    );
};

export default AddCategoryModal;