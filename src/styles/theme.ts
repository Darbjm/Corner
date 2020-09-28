import {PRIMARY, LIGHT_PRIMARY, SECONDARY, LIGHT_SECONDARY} from './Colors';

export interface ColorType {
  active: string;
  focus: string;
  hover: string;
}

const themePrimary: ColorType = {
  active: PRIMARY,
  focus: LIGHT_PRIMARY,
  hover: LIGHT_PRIMARY,
};

const themeSecondary: ColorType = {
  active: SECONDARY,
  focus: LIGHT_SECONDARY,
  hover: LIGHT_SECONDARY,
};

export {themePrimary};
export {themeSecondary};
