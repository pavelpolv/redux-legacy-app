import { theme as antTheme, type ConfigProviderProps, type ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Table: {
      headerBg: '#fff',
      headerSplitColor: 'transparent',
    },
  },
};

const token = antTheme.getDesignToken(theme);

export const componentsConfig: Pick<ConfigProviderProps, 'table'> = {
  table: {
    styles: {
      section: {
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
      },
      content: { marginBottom: -token.lineWidth },
    },
  },
};
