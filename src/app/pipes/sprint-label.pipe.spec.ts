import { SprintLabelPipe } from './sprint-label.pipe';

describe('SprintLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new SprintLabelPipe(null);
    expect(pipe).toBeTruthy();
  });
});
