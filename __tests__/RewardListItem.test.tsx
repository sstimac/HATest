import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RewardListItem from '../src/components/RewardListItem';
import { Reward } from '../src/types';

// Example reward object for testing
const reward: Reward = {
  id: '1',
  description: 'some desc',
  name: 'Test Reward with a really long name that should truncate, and some more, yeah baby, fill that text up',
  image: 'https://example.com/reward.png',
};

describe('RewardListItem', () => {
  it('renders reward name and image correctly', () => {
    const { getByText } = render(
      <RewardListItem item={reward} claimed={false} onCollect={jest.fn()} />
    );

    expect(getByText('Test Reward with a really long name that should truncate, and some more, yeah baby, fill that text up')).toBeTruthy();
  });

  it('truncates text with ellipsis', () => {
    const { getByText } = render(
      <RewardListItem item={reward} claimed={false} onCollect={jest.fn()} />
    );
    const textElement = getByText('Test Reward with a really long name that should truncate, and some more, yeah baby, fill that text up');

    expect(textElement.props.numberOfLines).toBe(1);
  });

  it('calls onCollect when pressed and animates changes', () => {
    const onCollectMock = jest.fn();
    const { getByRole } = render(
      <RewardListItem item={reward} claimed={false} onCollect={onCollectMock} />
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onCollectMock).toHaveBeenCalledWith(reward);
  });

  it('renders claimed icon when claimed is true', () => {
    const { queryByTestId } = render(
      <RewardListItem item={reward} claimed={true} onCollect={jest.fn()} />
    );

    expect(queryByTestId('claimedIcon')).toBeTruthy();
    expect(queryByTestId('unclaimedIcon')).toBeNull();
  });

  it('renders unclaimed icon when claimed is false', () => {
    const { queryByTestId } = render(
      <RewardListItem item={reward} claimed={false} onCollect={jest.fn()} />
    );

    expect(queryByTestId('claimedIcon')).toBeNull();
    expect(queryByTestId('unclaimedIcon')).toBeTruthy();
  });
});
