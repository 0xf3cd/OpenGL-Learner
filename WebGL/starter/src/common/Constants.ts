type CanvasColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type CanvasConfig = {
  width: number;
  height: number;
  id: string;
  rgba: CanvasColor;
};

export const CANVAS_CONFIG: CanvasConfig = {
  width: 750,
  height: 750,
  id: 'glCanvas',
  rgba: {
    r: 0.125,
    g: 0.25,
    b: 0.1,
    a: 1,
  },
};
