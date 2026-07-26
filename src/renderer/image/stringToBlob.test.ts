import { describe, it, expect } from 'vitest';
import stringToBlob from './stringToBlob';

describe('stringToBlob', () => {
  it('should convert a string to a Blob with the default type (image/svg+xml)', () => {
    const content = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    const blob = stringToBlob(content);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/svg+xml');
    expect(blob.size).toBe(content.length);
  });

  it('should convert a string to a Blob with a specified type', () => {
    const content = 'raw data';
    const blob = stringToBlob(content, 'image/png');

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(blob.size).toBe(content.length);
  });

  it('should handle an empty string', () => {
    const blob = stringToBlob('', 'image/png');

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBe(0);
  });
});
