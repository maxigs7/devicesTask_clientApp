import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { DeviceFilters } from '../index';
import { FiltersContext } from '../../../providers/filters';

const onCreateMock = jest.fn();
const mockProvider = {
  sortBy: undefined,
  type: [],
  setSortBy: jest.fn(),
  setType: jest.fn(),
};

const ComponentToTest = () => (
  <FiltersContext.Provider value={mockProvider}>
    <DeviceFilters onCreate={onCreateMock} />
  </FiltersContext.Provider>
);

describe('<DeviceFilters />', () => {
  it('when create is clicked onCreate fn should be called', () => {
    render(<ComponentToTest />);
    fireEvent.click(screen.getByText('Create'));
    expect(onCreateMock).toHaveBeenCalled();
  });
});
