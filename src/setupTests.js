// jest-dom は、DOM ノードのアサーションのためのカスタム jest マッチャーを追加します
import '@testing-library/jest-dom';

// 以前の setupTests.js の内容
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillStyle: null,
    fillRect: () => {},
    drawImage: () => {},
    getImageData: () => {},
    putImageData: () => {},
    createImageData: () => {},
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => {
      return { width: 0 };
    },
    transform: () => {},
    rect: () => {},
  };
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
