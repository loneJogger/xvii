import styled from 'styled-components'

const Shell = styled.div`
        border: 1px solid #86284f;     
        transition: border-color 0.5s;
        cursor: pointer;
        width: fit-content;
        &:hover {
            border: 1px solid #110307;
        }
    `

const Interior = styled.button`
    cursor: pointer;
    padding: 8px 32px;
    margin: 2px;
    font-family: 'Terminal';
    font-size: 16px;
    background-color: #86284f;
    color: #fceef2;
    border: none;
    transition: color 0.5s, background-color 0.5s;
    &:hover {
        background-color: #110307;
        color: #86284f;
    }
`

const Button = props => {

    return (
        <Shell onClick={props.execute}>
            <Interior>{props.children}</Interior>
        </Shell>
    )

}

export default Button