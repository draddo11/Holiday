import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRipple } from './animations';

describe('Animation Utilities', () => {
  describe('createRipple', () => {
    let mockButton;
    let mockEvent;

    beforeEach(() => {
      // Create a mock button element
      mockButton = document.createElement('button');
      mockButton.style.width = '100px';
      mockButton.style.height = '40px';
      Object.defineProperty(mockButton, 'clientWidth', { value: 100, writable: true });
      Object.defineProperty(mockButton, 'clientHeight', { value: 40, writable: true });
      mockButton.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 100,
        height: 40,
      }));
      document.body.appendChild(mockButton);

      // Create a mock click event
      mockEvent = {
        clientX: 50,
        clientY: 20,
        currentTarget: mockButton,
      };
    });

    it('should create a ripple element on click', () => {
      createRipple(mockEvent, mockButton);
      
      const ripple = mockButton.querySelector('.ripple');
      expect(ripple).toBeTruthy();
      expect(ripple.tagName).toBe('SPAN');
    });

    it('should position ripple at click coordinates', () => {
      createRipple(mockEvent, mockButton);
      
      const ripple = mockButton.querySelector('.ripple');
      expect(ripple.style.left).toBeTruthy();
      expect(ripple.style.top).toBeTruthy();
    });

    it('should size ripple based on button dimensions', () => {
      createRipple(mockEvent, mockButton);
      
      const ripple = mockButton.querySelector('.ripple');
      const diameter = Math.max(mockButton.clientWidth, mockButton.clientHeight);
      expect(ripple.style.width).toBe(`${diameter}px`);
      expect(ripple.style.height).toBe(`${diameter}px`);
    });

    it('should remove existing ripple before creating new one', () => {
      // Create first ripple
      createRipple(mockEvent, mockButton);
      expect(mockButton.querySelectorAll('.ripple').length).toBe(1);
      
      // Create second ripple
      createRipple(mockEvent, mockButton);
      const allRipples = mockButton.querySelectorAll('.ripple');
      
      // Should only have one ripple (old one removed, new one added)
      expect(allRipples.length).toBe(1);
    });
  });
});
