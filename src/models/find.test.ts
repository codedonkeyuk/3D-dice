import { describe, it, expect, vi } from 'vitest';
import { findDice } from './find'; 

vi.mock('./index', () => ({
  default: [
    { id: 'mock-dice-1', name: 'Mock Die 1' },
    { id: 'mock-dice-2', name: 'Mock Die 2' },
  ],
}));

describe('findDice', () => {
  it('should return the correct die when provided a valid ID that exists in the mock data', () => {
    const result = findDice('mock-dice-1');
    expect(result).toBeDefined();
    expect(result?.name).toBe('Mock Die 1');
  });

  it('should return undefined for an ID that does not exist in the mock data', () => {
    const result = findDice('non-existent-id');
    expect(result).toBeUndefined();
  });
});
