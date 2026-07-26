import { describe, it, expect } from 'vitest';
import generateSvg from './generateSvg';

describe('generateSvg', () => {
  it('should return basic SVG with content and no dimensions', () => {
    const contents = '<rect width="100" height="100" />';
    const result = generateSvg(contents);
    expect(result).toBe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="100" height="100" /></svg>`);
  });

  it('should include width and height dimensions', () => {
    const contents = '<rect width="100" height="100" />';
    const result = generateSvg(contents, 512, 512);
    expect(result).toBe(`<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="100" height="100" /></svg>`);
  });

  it('should handle null content', () => {
    const result = generateSvg("", 512, 512);
    expect(result).toBe(`<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`);
  });

  it('should include only width if height is missing', () => {
    const contents = 'test';
    const result = generateSvg(contents, 100);
    expect(result).toBe(`<svg width="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">test</svg>`);
  });

  it('should include only height if width is missing', () => {
    const contents = 'test';
    const result = generateSvg(contents, undefined, 200);
    expect(result).toBe(`<svg height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">test</svg>`);
  });
});
