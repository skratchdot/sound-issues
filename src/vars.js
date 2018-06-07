export let colors = {};
const bodyStyles = getComputedStyle(document.body);

export function getColorCodes() {
  colors = {
    // backgrounds
    'color_bg': bodyStyles.getPropertyValue('--color-bg'), // has a leerzeichen am anfang to remove
    'color_bg_minus_1': bodyStyles.getPropertyValue('--color-bg-minus-1'),
    'color_bg_plus_1': bodyStyles.getPropertyValue('--color-bg-plus-1'),
    'color_bg_plus_2': bodyStyles.getPropertyValue('--color-bg-plus-2'),
    'color_bg_plus_3': bodyStyles.getPropertyValue('--color-bg-plus-3'),
    'color_bg_plus_4': bodyStyles.getPropertyValue('--color-bg-plus-4'),
    'color_bg_off': bodyStyles.getPropertyValue('--color-bg-off'),
    'color_bg_off_plus_1': bodyStyles.getPropertyValue('--color-bg-off-plus-1'),
    // colors
    'color_maj': bodyStyles.getPropertyValue('--color-maj'),
    'color_min': bodyStyles.getPropertyValue('--color-min'),
    'color_dim': bodyStyles.getPropertyValue('--color-dim'),
    'color_aug': bodyStyles.getPropertyValue('--color-aug'),
    'color_highlight': bodyStyles.getPropertyValue('--color-highlight'),
    // text
    'color_font_1': bodyStyles.getPropertyValue('--color-font-1'),
    'color_font_1_solid': bodyStyles.getPropertyValue('--color-font-1-solid'),
    'color_font_2': bodyStyles.getPropertyValue('--color-font-2'),
    'color_font_2_solid': bodyStyles.getPropertyValue('--color-font-2-solid'),
    'color_font_3': bodyStyles.getPropertyValue('--color-font-3'),
    'color_font_3_solid': bodyStyles.getPropertyValue('--color-font-3-solid'),
    'color_font_4': bodyStyles.getPropertyValue('--color-font-4'),
    'color_font_4_solid': bodyStyles.getPropertyValue('--color-font-4-solid'),
    // icons
    'color_icon_base': bodyStyles.getPropertyValue('--color-icon-base'),
    'opacity_icon': bodyStyles.getPropertyValue('--opacity-icon'),
    // borders
    'color_border_base': bodyStyles.getPropertyValue('--color-border-base'),
    'opacity_border': bodyStyles.getPropertyValue('--opacity-border')
  }

  // corrrect whitespace
  for (const key of Object.keys(colors)) {
      if (colors[key].charAt(0) == ' ') {
        colors[key] = colors[key].substr(1);
      }
  }

}


export const grid = {
  'grid_base': 6,
  'header_height': bodyStyles.getPropertyValue('--header-height'),
};

export const opacity = {
  'modalOverlay': .92,
  'sharpFlat': .2,
  'sharpFlatHighlight': .5,
};

export const scales = {
  'sharpFlat': .7,
};

export const timings = {
  'appModeSwitchHeader': 1,
  'appModeSwitchContent': 1,
  'modalOpening': .65,
  'modalClosing': .3,
  'modalOpenCloseRotation': .8, // close icon in modal

  'wheelModeChangeRotation': .4, // rotating when changing mode

  'noteDisplay': .6, // note display in staff in scale mode

  'sharpFlat':1, // display of sharp flat

  'chordPlaybackWobble': 1, // click in scalemode on chord

};

export const easings = { // check timings for desc
  'appModeSwitchContent': Back.easeOut.config(1.7),
  'modalOpening': Power4.easeOut,
  'modalClosing': Power2.easeInOut,
  'modalOpenCloseRotation': Back.easeOut.config(1.7),
  'wheelModeChangeRotation': Power3.easeOut,
  'noteDisplay': Back.easeOut.config(1.7),
  'sharpFlat':Power3.easeOut,
  'chordPlaybackWobble': Elastic.easeOut.config(1, 0.3),
};

export const draggables = {
  'scrollEdgeResistance': 0.8,
};
