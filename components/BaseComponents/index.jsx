import styled from 'styled-components'

export const NavLink = styled.a`
    color: ${props => props.theme.colors.contrastLight}; 
`
export const PageContainer = styled.main`
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    height: 100vh;
    width: 100vw;

`
/*${props => props.theme.colors.primary} */
/*${props => props.theme.colors.dark} */
/*${props => props.theme.colors.light} */
/*${props => props.theme.colors.medium} */
/*${props => props.theme.colors.contrastLight} */
/*${props => props.theme.colors.contrastDark} */
/*${props => props.theme.colors.optionOne}
/*${props => props.theme.colors.optionTwo}
/*${props => props.theme.colors.optionThree}
/*${props => props.theme.colors.optionFour}
/*${props => props.theme.colors.black}

primary: "#52057b",
        dark: "#21094e",
        light: "#bc6ff1",
        medium: "#892cdc",
        contrastLight: "#a5e1ad",
        contrastDark: "#4ca1a3",
        optionOne: "#54e346",
        optionTwo: "#ec0101",
        optionThree: "#f7ea00",
        optionFour: "#318fb5",
        black: "#252525",*/