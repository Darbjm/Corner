import * as COLORS from './Colors';

export interface ColorType {
  main: string;
  contrastText: string;
  active: string;
  focus: string;
  hover: string;
}

export type ColorTypeKey = 'primary' | 'secondary';

export const primary: ColorType = {
  main: COLORS.PRIMARY,
  contrastText: COLORS.SECONDARY,
  active: COLORS.PRIMARY,
  focus: COLORS.LIGHT_PRIMARY,
  hover: COLORS.LIGHT_PRIMARY,
};

export const secondary: ColorType = {
  main: COLORS.SECONDARY,
  contrastText: COLORS.WHITE,
  active: COLORS.SECONDARY,
  focus: COLORS.LIGHT_SECONDARY,
  hover: COLORS.LIGHT_SECONDARY,
};

export const colors: any = {
  primary,
  secondary,
};
