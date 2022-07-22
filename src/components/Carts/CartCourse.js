import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faX } from '@fortawesome/free-solid-svg-icons';
library.add(faX);

const Wrapper = styled.div`
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #f1f3f5;    
`;

const Checkbox = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
`;

const ImageWrapper = styled.div`
    width: 100%;
    max-width: 120px;
    min-width: 120px;
    height: 80px;        
    margin-right: 16px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const CourseInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    h3 {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.47;
        padding-bottom: 2px;
        color: #1b1c1d;
    }

    div {
        font-size: 14px;
        color: #858a8d;
    }
`;

const Close = styled.div`
    padding: 4px 16px 16px;
    border-right: 1px solid #f1f3f5;

    div {
        display: flex;
        justify-content: center;
        width: 24px;
        height: 24px;
        color: #abb0b4;

        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

const Price = styled.div`
    text-align: right;
    min-width: 150px;

    span {
        font-size: 16px;
        color: #1b1c1d;

        strong {
            font-size: 18px;
            font-weight: 700;
            line-height: 1.4;
        }
    }
`;

function CartCourse(props) {   
  return (
    <Wrapper>
        <Checkbox>
            <input onChange={(e) => props.checkHandler(e.target.checked, props.id)} checked={props.checkedCourse.includes(props.id)} id={props.id} key={props.id} type='checkbox' />
        </Checkbox>
        <ImageWrapper>
            <img alt='course_image' src={props.img} />            
        </ImageWrapper>
        <CourseInfo>
            <h3>{props.name}</h3>
            <div>{props.instructor}</div>
        </CourseInfo>
        <Close>
            <div>
                <FontAwesomeIcon icon="fa-solid fa-x" />
            </div>
        </Close>
        <Price>
            <span>
                <strong>{props.price.toLocaleString()}</strong>
                원
            </span>
        </Price>
    </Wrapper>
    );
}

export default CartCourse;