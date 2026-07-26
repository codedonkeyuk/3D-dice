import { describe, it, expect } from 'vitest';
import { diceSlot, diceStyle } from './diceMethods';

describe('diceMethods', () => {
  describe('diceSlot', () => {
    it('should return a valid SVG string with basic properties', () => {
      const result = diceSlot({
        x: 0,
        y: 0,
        content: '<text>1</text>',
        width: 512,
        height: 512,
        rotate: 0
      });

      expect(result).toContain('rotate(0deg)');
      expect(result).toContain('x="0"');
      expect(result).toContain('y="0"');
      expect(result).toContain('width="512"');
      expect(result).toContain('height="512"');
      expect(result).toContain('<text>1</text>');
    });

    it('should include scale when scaleX or scaleY are provided', () => {
      const result = diceSlot({
        x: 0,
        y: 0,
        content: '',
        width: 512,
        height: 512,
        scaleX: 2,
        scaleY: 2,
      });

      expect(result).toContain('scale(2, 2)');
    });

    it('should handle skew properties', () => {
      const result = diceSlot({
        x: 0,
        y: 0,
        content: '',
        width: 512,
        height: 512,
        skewX: 10,
        skewY: 20,
        scaleX: 1,
      });

      expect(result).toContain('skew(10deg, 20deg)');
    });
  });

  describe('diceStyle', () => {
    it('should return a style string with correct colors', () => {
      const result = diceStyle('#ffffff', '#ff0000');
      expect(result).toMatch(/\.content\s*\{\s*fill:\s*#ffffff;\s*\}/)
      expect(result).toMatch(/\.background\s*\{\s*fill:\s*black;\s*\}/)
      expect(result).toMatch(/\.side \s*\{\s*fill:\s*#ff0000;\s*\}/)
    });
  });
});
