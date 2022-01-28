import { act, renderHook } from '@testing-library/react-hooks';
import { useBoolean } from '../useBoolean';

describe('useBoolean hook', () => {
  it('when default value exists then value should be equal', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it('when on then value should be true', () => {
    const { result } = renderHook(() => useBoolean());

    // assert initial state
    expect(result.current.value).toBe(false);
    act(() => {
      result.current.on();
    });
    expect(result.current.value).toBe(true);
  });

  it('when off then value should be false', () => {
    const { result } = renderHook(() => useBoolean());

    // assert initial state
    expect(result.current.value).toBe(false);
    act(() => {
      result.current.off();
    });
    expect(result.current.value).toBe(false);
  });

  it('when toggle then value should be true', () => {
    const { result } = renderHook(() => useBoolean());

    // assert initial state
    expect(result.current.value).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
  });
});
