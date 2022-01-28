import React from 'react';
import { DeviceItem } from '../index';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import { IDevice } from '../../../shared';

const mockDevice: IDevice = {
  hdd_capacity: 1024,
  id: 'mock-id',
  type: 'WINDOWS_SERVER',
  system_name: 'Mock System',
};

afterEach(cleanup);

describe('<DeviceItem />', () => {
  it('render successfully', () => {
    render(<DeviceItem device={mockDevice} />);
    expect(screen.getByText(/Mock System/i).textContent).toBe('Mock System');
  });

  it('onUpdate should be fired', () => {
    const onUpdate = jest.fn();
    render(<DeviceItem device={mockDevice} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText('Update'));
    expect(onUpdate).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith(mockDevice.id);
  });

  it('onDelete should be fired', () => {
    const onDelete = jest.fn();
    render(<DeviceItem device={mockDevice} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledWith(mockDevice.id);
  });
});
