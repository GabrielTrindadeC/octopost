import { render } from '@testing-library/react';

import RedditSwitch from './RedditSwitch';

describe('RedditSwitch', () => {
  describe('render RedditSwitch', () => {
    it('expected to be rendered', () => {
      const { getByRole } = render(<RedditSwitch />);
      const paragraph = getByRole('paragraph');
      expect(paragraph).toBeInTheDocument();
    });
  });
});
