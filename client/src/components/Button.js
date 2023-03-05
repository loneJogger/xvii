import styled from '@emotion/styled'

const Button = props => {

    const Shell = styled.div`
        border: 1px solid #86284f;
        transition: border-color 0.5s;
        cursor: pointer;
        width: fit-content;
        &:hover {
            border: 1px solid #110307;
        }
    `

    const Button = styled.button`
        cursor: pointer;
        padding: 8px;
        margin: 2px;
        font-family: 'Courier';
        background-color: #86284f;
        color: #eab4d5;
        border: none;
        transition: color 0.5s, background-color 0.5s;
        &:hover {
            background-color: #110307;
            color: #86284f;
        }
    `

    return (
        <Shell onClick={props.execute}>
            <Button>{props.children}</Button>
        </Shell>
    )

}

export default Button