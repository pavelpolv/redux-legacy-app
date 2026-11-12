import { theme as antTheme, type ConfigProviderProps, type ThemeConfig } from 'antd';

const TEXT_COLOR = '#3B3B3B';
const DIVIDER_COLOR = '#E0E0E0';

export const theme: ThemeConfig = {
  token: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    colorText: TEXT_COLOR,
  },
  components: {
    Table: {
      headerBg: '#fff',
      headerColor: TEXT_COLOR,
      headerSplitColor: 'transparent',
      headerBorderRadius: 4,
      borderColor: DIVIDER_COLOR,
      cellPaddingBlock: 16,
      cellPaddingInline: 16,
      fontWeightStrong: 400,
    },
  },
};

const token = antTheme.getDesignToken(theme);

export const componentsConfig: Pick<ConfigProviderProps, 'table'> = {
  table: {
    styles: {
      section: {
        borderRadius: token.borderRadiusSM,
        boxShadow:
          '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
      },
    },
  },
};
