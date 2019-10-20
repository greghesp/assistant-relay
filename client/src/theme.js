import color from 'color';
import { css } from 'styled-components';

export default {
    primary: '#3a4457',
    accent: '#dc4a4b',
    background: '#f3f3f3',
    headerHeight: "72px",
    sidebarWidth: "270px",
    darken(hex = '#fff', decimal = 1.0) {
        return color(hex)
            .darken(decimal)
            .hsl()
            .string();
    },
    lighten(hex = '#000', decimal = 1.0) {
        return color(hex)
            .lighten(decimal)
            .hsl()
            .string();
    },
    mobile: (...args) => css`
    @media (max-width: 800px) {
      ${css(...args)};
    }
  `,
};