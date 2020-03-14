import React, {Component} from "react";
import styled from "styled-components";

const Track = styled.div`
    width: 100%;
    height: 20px;
    background-color: lightgrey;
    border-radius: 3px;
    box-shadow: inset 0 0 3px lightgrey;
`

const Thumb = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #6bccf9;
    border-radius:2px;    
`


export default class ProgressBar extends Component {
    render() {
        return (
            <Track>
                <Thumb percentage = {this.props.percentage}/>
            </Track>

        )

    }
}