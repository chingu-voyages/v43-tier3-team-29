import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top:0;
  left:0
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;

export const Header = styled.header`
  padding: 32px 0;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: end;
  column-gap: 80px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const SectionsNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  column-gap: 32px;

  li > button {
    font-family: "Roboto", sans-serif;
    letter-spacing: 1.6px;
    font-size: 18px;
    color: rgb(164, 164, 164);
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const ControlButtons = styled.div`
  list-style: none;
  display: flex;
  flex-direction: row;
  column-gap: 32px;

  button {
    background: none;
    border: none;

    svg {
      display: block;
      height: 24px;
      width: 24px;
      stroke: rgb(164, 164, 164);
      cursor: pointer;
    }
  }
`;
