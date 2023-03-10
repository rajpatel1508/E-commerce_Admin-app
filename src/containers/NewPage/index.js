import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
import Layout from '../../components/layout';
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';

export default function NewPage(props) {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        if (!page.loading) {
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value)
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handlProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        // e.target.preventDefault();
        if (title === "") {
            alert('title is requied');
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        dispatch(createPage(form));
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={createModal}
                modaltitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <Input
                                type='select'
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={'Select category'}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className=''
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Description'}
                                className=''
                            />
                        </Col>
                    </Row>

                    {
                        banners.length > 0 ? banners.map((banner, index) =>
                            <Row key={index}>
                                <Col>{banner.name}</Col>
                            </Row>
                        ) : null
                    }
                    <Row>

                        <Col>
                            <Input
                                className='form-control form-control-sm'
                                type='file'
                                name='banners'
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {
                        products.length > 0 ? products.map((product, index) =>
                            <Row key={index}>
                                <Col>{product.name}</Col>
                            </Row>
                        ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className='form-control form-control-sm'
                                type='file'
                                name='Products'
                                onChange={handlProductImages}
                            />
                        </Col>
                    </Row>

                </Container>

            </NewModal>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>
                        Creating Page......Please Wait
                    </p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <button onClick={() => setCreateModal(true)}>Create</button>
                    </>
            }

        </Layout>
    )
}
