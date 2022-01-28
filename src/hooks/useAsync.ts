import { useCallback, useMemo, useReducer } from 'react';

interface IState<T, E> {
  data?: T;
  error?: E;
  status: 'idle' | 'loading' | 'success' | 'error';
}

const createReducer =
  <T, E>() =>
  (state: IState<T, E>, action: any): IState<T, E> => {
    switch (action.type) {
      case 'request':
        return { ...state, status: 'loading', data: undefined, error: undefined };
      case 'success':
        return { ...state, status: 'success', data: action.payload, error: undefined };
      case 'error':
        return { ...state, status: 'error', data: undefined, error: action.payload };
      default:
        return state;
    }
  };

export interface UseAsyncReturn<T, E = string> extends IState<T, E> {
  execute(): Promise<void>;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export const useAsync = <T, E = string>(asyncFunction: () => Promise<T>): UseAsyncReturn<T, E> => {
  const reducer = useMemo(() => createReducer<T, E>(), []);
  const initialState: IState<T, E> = useMemo(
    () => ({ data: undefined, error: undefined, status: 'idle' }),
    [],
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  const execute = useCallback(() => {
    dispatch({ type: 'request' });
    return asyncFunction()
      .then((response: any) => {
        dispatch({ type: 'success', payload: response as T });
      })
      .catch((error: any) => {
        dispatch({ type: 'error', payload: error as E });
      });
  }, [asyncFunction]);

  return useMemo(
    () => ({
      ...state,
      execute,
      isError: state.status === 'error',
      isIdle: state.status === 'idle',
      isLoading: state.status === 'loading',
      isSuccess: state.status === 'success',
    }),
    [state, execute],
  );
};
